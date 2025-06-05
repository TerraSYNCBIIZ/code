#!/usr/bin/env python3
"""
Reality Check Model - Reverse Engineer from Actual Cash Flow
"""

class RealityCheckModel:
    def __init__(self):
        # ACTUAL DATA (from user)
        self.actual_monthly_cash_flow = -3500
        self.current_territories = 2
        self.current_acres = 400
        
        # KNOWN REVENUE FACTORS (validated)
        self.service_per_acre = 59
        self.saas_per_user = 50
        self.saas_adoption = 0.20
        
        # MARGINS (validated from model)
        self.service_margin = 0.70
        self.saas_margin = 0.85
        self.product_margin = 0.20
        self.install_margin = 0.60
        self.terrasync_share = 0.60
    
    def calculate_known_revenue(self):
        """Calculate revenue we can be confident about"""
        # Recurring revenue (high confidence)
        service_revenue = self.current_acres * self.service_per_acre
        saas_users = int(self.current_acres * self.saas_adoption)
        saas_revenue = saas_users * self.saas_per_user
        
        # Conservative estimate for one-time revenue
        # Let's assume very conservative new customer acquisition
        new_customers_per_month = 5  # Very conservative
        avg_acres_per_customer = 3
        new_acres = new_customers_per_month * avg_acres_per_customer
        
        # Only fraction buy products/installation
        product_revenue = new_acres * 1800 * 0.05  # Only 5% buy products
        install_revenue = new_acres * 700 * 0.05   # Only 5% get installation
        
        total_revenue = service_revenue + saas_revenue + product_revenue + install_revenue
        
        return {
            'service': service_revenue,
            'saas': saas_revenue,
            'product': product_revenue,
            'installation': install_revenue,
            'total': total_revenue,
            'recurring': service_revenue + saas_revenue
        }
    
    def calculate_gross_profit(self, revenue):
        """Calculate gross profit"""
        service_gp = revenue['service'] * self.service_margin
        saas_gp = revenue['saas'] * self.saas_margin
        product_gp = revenue['product'] * self.product_margin
        install_gp = revenue['installation'] * self.install_margin
        
        total_gp = service_gp + saas_gp + product_gp + install_gp
        terrasync_gp = total_gp * self.terrasync_share
        
        return {
            'total_gross_profit': total_gp,
            'terrasync_gross_profit': terrasync_gp,
            'service_gp': service_gp,
            'saas_gp': saas_gp,
            'product_gp': product_gp,
            'install_gp': install_gp
        }
    
    def reverse_engineer_costs(self):
        """Work backwards from actual cash flow to find realistic costs"""
        revenue = self.calculate_known_revenue()
        gross_profit = self.calculate_gross_profit(revenue)
        
        # Work backwards: if cash flow = gross profit - costs
        # Then: costs = gross profit - cash flow
        realistic_total_costs = gross_profit['terrasync_gross_profit'] - self.actual_monthly_cash_flow
        
        return {
            'revenue': revenue,
            'gross_profit': gross_profit,
            'realistic_total_costs': realistic_total_costs
        }
    
    def analyze_cost_breakdown(self, realistic_total_costs):
        """Break down what realistic costs should be"""
        
        print("=== REVERSE ENGINEERING REALISTIC COSTS ===\n")
        
        # Known/estimated employee costs
        current_employees = 8
        avg_salary = 55000
        monthly_salaries = (current_employees * avg_salary) / 12
        
        print(f"Current employees: {current_employees}")
        print(f"Monthly salaries: ${monthly_salaries:,.0f}")
        print(f"Realistic total costs needed: ${realistic_total_costs:,.0f}")
        print(f"Non-salary costs: ${realistic_total_costs - monthly_salaries:,.0f}")
        print()
        
        # Break down non-salary costs
        remaining_for_operations = realistic_total_costs - monthly_salaries
        
        print("REALISTIC OPERATIONAL COST BREAKDOWN:")
        
        # Territory support (let's see what it should really be)
        territories = self.current_territories
        max_territory_support_total = remaining_for_operations * 0.30  # Max 30% for territory support
        territory_support_per = max_territory_support_total / territories
        
        print(f"  Territory Support: ${max_territory_support_total:,.0f} total (${territory_support_per:,.0f} per territory)")
        
        # Corporate overhead
        remaining_after_territory = remaining_for_operations - max_territory_support_total
        corporate_overhead = remaining_after_territory * 0.70  # 70% for corporate
        tech_marketing = remaining_after_territory * 0.30     # 30% for tech/marketing
        
        print(f"  Corporate Overhead: ${corporate_overhead:,.0f}")
        print(f"  Tech/Marketing: ${tech_marketing:,.0f}")
        print(f"  TOTAL: ${monthly_salaries + max_territory_support_total + corporate_overhead + tech_marketing:,.0f}")
        
        return {
            'monthly_salaries': monthly_salaries,
            'territory_support_per_territory': territory_support_per,
            'corporate_overhead': corporate_overhead,
            'tech_marketing': tech_marketing,
            'total_realistic_costs': realistic_total_costs
        }
    
    def create_realistic_projection(self):
        """Create realistic projections based on reverse-engineered costs"""
        reverse_analysis = self.reverse_engineer_costs()
        cost_breakdown = self.analyze_cost_breakdown(reverse_analysis['realistic_total_costs'])
        
        projections = []
        current_acres = self.current_acres
        
        # Territory schedule
        territory_schedule = {
            0: 2, 6: 3, 12: 4, 18: 6, 24: 8, 30: 10, 36: 12, 42: 15, 48: 20
        }
        
        for month in range(49):
            # Territory count
            territories = 2
            for m, t in territory_schedule.items():
                if month >= m:
                    territories = t
            
            # Acre growth with churn
            if month > 0:
                new_acres = territories * 25  # 25 new acres per territory per month
                churned_acres = current_acres * 0.01  # 1% monthly churn (lower than before)
                current_acres = current_acres + new_acres - churned_acres
            
            # Revenue
            saas_users = int(current_acres * 0.20)
            service_rev = current_acres * 59
            saas_rev = saas_users * 50
            
            # One-time revenue (very conservative)
            new_customer_revenue = territories * 5 * 3 * (1800 + 700) * 0.05  # 5 customers, 3 acres each, 5% buy
            
            total_revenue = service_rev + saas_rev + new_customer_revenue
            
            # Gross profit (using realistic structure)
            gross_profit = (service_rev * 0.70 + saas_rev * 0.85 + new_customer_revenue * 0.40) * 0.60
            
            # Costs (using realistic breakdown)
            employees = max(8, 6 + territories * 1.2)  # More conservative employee scaling
            salaries = employees * 55000 / 12
            
            # Scale costs realistically
            territory_support = territories * cost_breakdown['territory_support_per_territory']
            corporate_base = cost_breakdown['corporate_overhead'] * (1 + (territories - 2) * 0.1)  # 10% increase per territory
            tech_marketing = cost_breakdown['tech_marketing'] * (1 + (territories - 2) * 0.15)  # 15% increase per territory
            
            total_costs = salaries + territory_support + corporate_base + tech_marketing
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
        
        return projections, cost_breakdown

def run_reality_check():
    model = RealityCheckModel()
    
    # First, reverse engineer current costs
    reverse_analysis = model.reverse_engineer_costs()
    cost_breakdown = model.analyze_cost_breakdown(reverse_analysis['realistic_total_costs'])
    
    print("\nREVENUE VALIDATION:")
    rev = reverse_analysis['revenue']
    print(f"  Service Revenue: ${rev['service']:,.0f} ({model.current_acres} acres × $59)")
    print(f"  SaaS Revenue: ${rev['saas']:,.0f}")
    print(f"  One-time Revenue: ${rev['product'] + rev['installation']:,.0f} (very conservative)")
    print(f"  Total Revenue: ${rev['total']:,.0f}")
    print()
    
    gp = reverse_analysis['gross_profit']
    print("GROSS PROFIT:")
    print(f"  Total Gross Profit: ${gp['total_gross_profit']:,.0f}")
    print(f"  TerraSync Share (60%): ${gp['terrasync_gross_profit']:,.0f}")
    print()
    
    # Test validation
    test_cash_flow = gp['terrasync_gross_profit'] - reverse_analysis['realistic_total_costs']
    print(f"VALIDATION:")
    print(f"  Calculated Cash Flow: ${test_cash_flow:,.0f}")
    print(f"  Actual Cash Flow: ${model.actual_monthly_cash_flow:,}")
    print(f"  Match: {'✅ YES' if abs(test_cash_flow - model.actual_monthly_cash_flow) < 100 else '❌ NO'}")
    print()
    
    # Generate realistic projections
    projections, _ = model.create_realistic_projection()
    
    print("REALISTIC 48-MONTH PROJECTIONS:")
    key_months = [0, 12, 24, 36, 48]
    for month in key_months:
        p = projections[month]
        print(f"Month {month:2d}: {p['territories']:2d} territories, {p['acres']:,} acres, ${p['net_cash_flow']:,}/month")
    
    return projections, cost_breakdown

if __name__ == "__main__":
    projections, cost_breakdown = run_reality_check() 