#!/usr/bin/env python3
"""
Validate the corrected TerraSync financial model
"""

class CorrectedModelValidator:
    def __init__(self):
        self.actual_cash_flow = -3500
        self.current_territories = 2
        self.current_acres = 400
        
    def test_corrected_current_state(self):
        """Test the corrected model against current actual state"""
        
        # Current revenue (corrected)
        service_rev = 400 * 59  # $23,600
        saas_users = int(400 * 0.20)  # 80 users
        saas_rev = saas_users * 50  # $4,000
        
        # New acres per month (corrected: 30 per territory)
        new_acres = 2 * 30  # 60 new acres
        
        # Product/installation revenue (corrected: 15% penetration)
        product_rev = new_acres * 1800 * 0.15  # $16,200
        install_rev = new_acres * 700 * 0.15   # $6,300
        
        # Additional revenue (new: $3k per territory)
        additional_rev = 2 * 3000  # $6,000
        
        total_revenue = service_rev + saas_rev + product_rev + install_rev + additional_rev
        
        # Gross profit (corrected)
        service_gp = service_rev * 0.70      # $16,520
        saas_gp = saas_rev * 0.85           # $3,400
        product_gp = product_rev * 0.20      # $3,240
        install_gp = install_rev * 0.60      # $3,780
        additional_gp = additional_rev * 0.60 # $3,600
        
        total_gp = service_gp + saas_gp + product_gp + install_gp + additional_gp
        terrasync_gp = total_gp * 0.60  # TerraSync 60% share
        
        # Costs (corrected)
        base_corporate = 8000
        tech_infrastructure = 3000
        operations = 4000
        territory_support = 2 * 2000  # $4,000 (2 territories × $2k)
        
        # Assuming 6 employees at $50k average (more realistic)
        monthly_salaries = (6 * 50000) / 12  # $25,000
        
        total_costs = base_corporate + tech_infrastructure + operations + territory_support + monthly_salaries
        
        # Net cash flow
        net_cash_flow = terrasync_gp - total_costs
        variance = net_cash_flow - self.actual_cash_flow
        
        return {
            'revenue': {
                'service': service_rev,
                'saas': saas_rev,
                'product': product_rev,
                'installation': install_rev,
                'additional': additional_rev,
                'total': total_revenue
            },
            'gross_profit': {
                'total': total_gp,
                'terrasync_share': terrasync_gp
            },
            'costs': {
                'salaries': monthly_salaries,
                'corporate': base_corporate,
                'tech': tech_infrastructure,
                'operations': operations,
                'territory_support': territory_support,
                'total': total_costs
            },
            'net_cash_flow': net_cash_flow,
            'variance': variance,
            'accurate': abs(variance) < 2000
        }
    
    def generate_corrected_projections(self):
        """Generate 48-month projections with corrected model"""
        projections = []
        current_acres = 400
        
        # Territory schedule
        territory_schedule = {
            0: 2, 6: 3, 12: 4, 18: 6, 24: 8, 30: 10, 36: 12, 42: 15, 48: 18
        }
        
        for month in range(49):
            # Territory count
            territories = 2
            for m, t in territory_schedule.items():
                if month >= m:
                    territories = t
            
            # Acre growth (with minimal churn)
            if month > 0:
                new_acres = territories * 30  # 30 new acres per territory
                churned_acres = current_acres * 0.005  # 0.5% monthly churn
                current_acres = current_acres + new_acres - churned_acres
            
            # Revenue calculation
            saas_users = int(current_acres * 0.20)
            service_rev = current_acres * 59
            saas_rev = saas_users * 50
            
            # Seasonal multiplier
            seasonal_mult = self.get_seasonal_multiplier(month)
            new_acres_month = territories * 30
            product_rev = new_acres_month * 1800 * 0.15 * seasonal_mult
            install_rev = new_acres_month * 700 * 0.15 * seasonal_mult
            
            # Additional revenue
            additional_rev = territories * 3000
            
            total_revenue = service_rev + saas_rev + product_rev + install_rev + additional_rev
            
            # Gross profit
            total_gp = (service_rev * 0.70 + saas_rev * 0.85 + 
                       product_rev * 0.20 + install_rev * 0.60 + 
                       additional_rev * 0.60) * 0.60
            
            # Costs (realistic scaling)
            employees = max(6, 4 + territories * 1.0)  # 1 employee per territory + 4 corporate
            salaries = employees * 50000 / 12
            
            # OpEx scaling
            if territories <= 3:
                corporate_base = 8000 + (territories - 2) * 1000
                tech_ops = 7000 + (territories - 2) * 500
            elif territories <= 8:
                corporate_base = 12000 + (territories - 4) * 800
                tech_ops = 11000 + (territories - 4) * 600
            else:
                corporate_base = 18000 + (territories - 9) * 500
                tech_ops = 18000 + (territories - 9) * 400
            
            territory_support = territories * 2000
            total_costs = salaries + corporate_base + tech_ops + territory_support
            
            net_cash_flow = total_gp - total_costs
            
            projections.append({
                'month': month,
                'territories': territories,
                'acres': int(current_acres),
                'employees': int(employees),
                'total_revenue': int(total_revenue),
                'recurring_revenue': int(service_rev + saas_rev),
                'additional_revenue': int(additional_rev),
                'total_costs': int(total_costs),
                'net_cash_flow': int(net_cash_flow)
            })
        
        return projections
    
    def get_seasonal_multiplier(self, month):
        month_in_year = month % 12
        if month_in_year in [11, 0, 1]:  # Dec, Jan, Feb
            return 0.4
        elif month_in_year in [2, 3, 4]:  # Mar, Apr, May
            return 1.4
        elif month_in_year in [5, 6, 7]:  # Jun, Jul, Aug
            return 1.0
        else:
            return 1.2
    
    def print_validation_report(self):
        """Print comprehensive validation report"""
        print("=== CORRECTED MODEL VALIDATION ===\n")
        
        # Test current state
        current_test = self.test_corrected_current_state()
        
        print("CURRENT STATE VALIDATION:")
        rev = current_test['revenue']
        costs = current_test['costs']
        
        print(f"  Service Revenue: ${rev['service']:,} (400 acres × $59)")
        print(f"  SaaS Revenue: ${rev['saas']:,} (80 users × $50)")
        print(f"  Product Revenue: ${rev['product']:,} (15% penetration)")
        print(f"  Installation Revenue: ${rev['installation']:,} (15% penetration)")
        print(f"  Additional Revenue: ${rev['additional']:,} (NEW: $3k per territory)")
        print(f"  TOTAL REVENUE: ${rev['total']:,}")
        print()
        
        print(f"  TerraSync Gross Profit: ${current_test['gross_profit']['terrasync_share']:,}")
        print()
        
        print(f"  Salaries: ${costs['salaries']:,} (6 employees)")
        print(f"  Corporate: ${costs['corporate']:,} (reduced)")
        print(f"  Tech/Ops: ${costs['tech'] + costs['operations']:,} (realistic)")
        print(f"  Territory Support: ${costs['territory_support']:,} ($2k per territory)")
        print(f"  TOTAL COSTS: ${costs['total']:,}")
        print()
        
        print(f"  Calculated Cash Flow: ${current_test['net_cash_flow']:,}")
        print(f"  Actual Cash Flow: ${self.actual_cash_flow:,}")
        print(f"  Variance: ${current_test['variance']:,}")
        print(f"  Accurate: {'✅ YES' if current_test['accurate'] else '❌ NO'}")
        print()
        
        # Generate projections
        projections = self.generate_corrected_projections()
        
        print("CORRECTED 48-MONTH PROJECTIONS:")
        key_months = [0, 12, 24, 36, 48]
        for month in key_months:
            p = projections[month]
            print(f"Month {month:2d}: {p['territories']:2d} territories, {p['acres']:,} acres, ${p['net_cash_flow']:,}/month")
        
        print()
        print("KEY MODEL CORRECTIONS:")
        print("1. ✅ Reduced territory support costs from $6.5k to $2k per territory")
        print("2. ✅ Reduced corporate overhead by 70%+ to realistic levels")
        print("3. ✅ Added missing revenue stream: $3k per territory for additional services")
        print("4. ✅ Realistic product/installation penetration (15% vs 100%)")
        print("5. ✅ Conservative employee scaling (1 per territory vs 2.5)")
        print("6. ✅ Minimal churn rate (0.5% monthly vs 2%)")
        print("7. ✅ Higher new acre acquisition (30 vs 20 per territory)")
        
        return projections

if __name__ == "__main__":
    validator = CorrectedModelValidator()
    projections = validator.print_validation_report() 