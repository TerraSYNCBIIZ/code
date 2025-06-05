#!/usr/bin/env python3
"""
Test the corrected TerraSync financial model
"""

class CorrectedModel:
    def __init__(self):
        # Current state
        self.current_territories = 2
        self.current_acres = 400
        self.actual_cash_flow = -3500
        
        # Corrected assumptions
        self.service_revenue_per_acre = 59
        self.saas_revenue_per_user = 50
        self.saas_adoption_rate = 0.20
        self.product_penetration = 0.10  # Only 10% of new acres buy products
        self.installation_penetration = 0.10
        
        # Corrected costs
        self.employees = 8
        self.avg_salary = 55000
        self.territory_support_cost = 3000  # $3k per territory (not $6.5k)
        self.base_corporate = 15000  # Reduced overhead
        self.tech_ops = 10000  # Combined tech + ops
        
    def calculate_current_revenue(self):
        # Recurring revenue
        service_rev = self.current_acres * self.service_revenue_per_acre
        saas_users = int(self.current_acres * self.saas_adoption_rate)
        saas_rev = saas_users * self.saas_revenue_per_user
        
        # One-time revenue (much more realistic)
        new_acres_monthly = 20  # Realistic new customer acquisition
        product_rev = new_acres_monthly * 1800 * self.product_penetration  # Only 10% buy
        install_rev = new_acres_monthly * 700 * self.installation_penetration
        
        total_revenue = service_rev + saas_rev + product_rev + install_rev
        
        return {
            'service': service_rev,
            'saas': saas_rev,
            'product': product_rev,
            'installation': install_rev,
            'total': total_revenue,
            'recurring': service_rev + saas_rev
        }
    
    def calculate_current_costs(self):
        monthly_salaries = (self.employees * self.avg_salary) / 12
        territory_costs = self.current_territories * self.territory_support_cost
        
        total_costs = (monthly_salaries + 
                      self.base_corporate + 
                      self.tech_ops + 
                      territory_costs)
        
        return {
            'salaries': monthly_salaries,
            'corporate': self.base_corporate,
            'tech_ops': self.tech_ops,
            'territory_support': territory_costs,
            'total': total_costs
        }
    
    def calculate_cash_flow(self):
        revenue = self.calculate_current_revenue()
        costs = self.calculate_current_costs()
        
        # Apply margins and TerraSync share
        service_gp = revenue['service'] * 0.70
        saas_gp = revenue['saas'] * 0.85
        product_gp = revenue['product'] * 0.20
        install_gp = revenue['installation'] * 0.60
        
        total_gp = service_gp + saas_gp + product_gp + install_gp
        terrasync_gp = total_gp * 0.60  # 60% share
        
        net_cash_flow = terrasync_gp - costs['total']
        
        return {
            'revenue': revenue,
            'costs': costs,
            'gross_profit': total_gp,
            'terrasync_share': terrasync_gp,
            'net_cash_flow': net_cash_flow,
            'variance_from_actual': net_cash_flow - self.actual_cash_flow
        }
    
    def generate_projections(self):
        """Generate 48-month corrected projections"""
        projections = []
        current_acres = self.current_acres
        
        territory_schedule = {
            0: 2, 6: 3, 12: 4, 18: 6, 24: 8, 30: 10, 36: 12, 42: 15, 48: 18
        }
        
        for month in range(49):  # 0 to 48
            # Get territory count
            territories = 2
            for m, t in territory_schedule.items():
                if month >= m:
                    territories = t
            
            # Calculate acres with growth and churn
            if month > 0:
                new_acres = territories * 20  # 20 new acres per territory per month
                churned_acres = current_acres * 0.015  # 1.5% monthly churn
                current_acres = current_acres + new_acres - churned_acres
            
            # Revenue
            saas_users = int(current_acres * 0.20)
            service_rev = current_acres * 59
            saas_rev = saas_users * 50
            
            # Seasonal one-time revenue (conservative)
            seasonal_mult = self.get_seasonal_multiplier(month)
            new_acres_month = territories * 20
            product_rev = new_acres_month * 1800 * 0.10 * seasonal_mult
            install_rev = new_acres_month * 700 * 0.10 * seasonal_mult
            
            total_revenue = service_rev + saas_rev + product_rev + install_rev
            
            # Gross profit
            gross_profit = (service_rev * 0.70 + saas_rev * 0.85 + 
                           product_rev * 0.20 + install_rev * 0.60) * 0.60
            
            # Costs
            employees = max(8, 6 + territories * 1.5)  # More conservative scaling
            salaries = employees * 55000 / 12
            corporate_costs = 15000 + max(0, (territories - 2) * 1500)  # Gradual scaling
            territory_costs = territories * 3000
            tech_ops = 10000 + territories * 500
            
            total_costs = salaries + corporate_costs + territory_costs + tech_ops
            net_cash_flow = gross_profit - total_costs
            
            projections.append({
                'month': month,
                'territories': territories,
                'acres': int(current_acres),
                'employees': int(employees),
                'total_revenue': int(total_revenue),
                'recurring_revenue': int(service_rev + saas_rev),
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

def test_model():
    model = CorrectedModel()
    
    print("=== CORRECTED TERRASYNC MODEL TEST ===\n")
    
    # Test current state
    analysis = model.calculate_cash_flow()
    
    print("CURRENT STATE VALIDATION:")
    print(f"Calculated Cash Flow: ${analysis['net_cash_flow']:,.0f}")
    print(f"Actual Cash Flow: ${model.actual_cash_flow:,}")
    print(f"Variance: ${analysis['variance_from_actual']:,.0f}")
    print()
    
    print("REVENUE BREAKDOWN:")
    rev = analysis['revenue']
    print(f"  Service: ${rev['service']:,.0f}")
    print(f"  SaaS: ${rev['saas']:,.0f}")
    print(f"  Product: ${rev['product']:,.0f} (realistic 10% penetration)")
    print(f"  Installation: ${rev['installation']:,.0f}")
    print(f"  Total: ${rev['total']:,.0f}")
    print()
    
    print("COST BREAKDOWN:")
    costs = analysis['costs']
    print(f"  Salaries: ${costs['salaries']:,.0f}")
    print(f"  Corporate: ${costs['corporate']:,.0f}")
    print(f"  Tech/Ops: ${costs['tech_ops']:,.0f}")
    print(f"  Territory Support: ${costs['territory_support']:,.0f}")
    print(f"  Total: ${costs['total']:,.0f}")
    print()
    
    # Test projections
    projections = model.generate_projections()
    
    print("CORRECTED 48-MONTH PROJECTIONS:")
    key_months = [0, 12, 24, 36, 48]
    for month in key_months:
        p = projections[month]
        print(f"Month {month:2d}: {p['territories']:2d} territories, {p['acres']:,} acres, ${p['net_cash_flow']:,}/month")
    
    print()
    print("KEY CORRECTIONS MADE:")
    print("1. ✅ Reduced territory support from $6.5k to $3k per territory")
    print("2. ✅ Reduced corporate overhead by ~50%")
    print("3. ✅ Made product/installation revenue realistic (10% penetration)")
    print("4. ✅ Added customer churn (1.5% monthly)")
    print("5. ✅ Conservative employee scaling")
    
    # Check if current state is accurate
    if abs(analysis['variance_from_actual']) < 2000:
        print("\n✅ MODEL IS NOW ACCURATE - Variance under $2k")
    else:
        print(f"\n❌ Still needs adjustment - Variance: ${analysis['variance_from_actual']:,.0f}")
    
    return projections

if __name__ == "__main__":
    projections = test_model() 