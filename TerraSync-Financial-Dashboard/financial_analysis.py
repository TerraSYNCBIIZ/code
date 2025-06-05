#!/usr/bin/env python3
"""
TerraSync Financial Model Analysis - No Dependencies
Validates current financial calculations and identifies discrepancies
"""

class TerrasyncAnalysis:
    def __init__(self):
        # Current reality check - user reports only -$3-4k monthly, not -$61k
        self.actual_monthly_cash_flow = -3500
        
        # Current operational state
        self.current_state = {
            'territories': 2,
            'total_acres': 400,
            'employees': 8,
            'avg_annual_salary': 55000,
        }
        
        # Revenue assumptions from model validation tab
        self.revenue_assumptions = {
            'monthly_service_per_acre': 59,     # $59/acre/month (validated)
            'saas_per_user_per_month': 50,      # $50/user/month
            'saas_adoption_rate': 0.20,         # 20% of acres have SaaS users
            'product_sale_per_acre': 1800,     # $1,800/acre one-time
            'installation_per_acre': 700,      # $700/acre one-time
        }
        
        # Margin assumptions from model validation tab
        self.margins = {
            'service_gross_margin': 0.70,       # 70%
            'saas_gross_margin': 0.85,          # 85%
            'product_gross_margin': 0.20,       # 20%
            'installation_gross_margin': 0.60,  # 60%
        }
        
        # TerraSync gets 60% of gross profit
        self.terrasync_share = 0.60
    
    def calculate_current_monthly_revenue(self):
        """Calculate current monthly revenue breakdown"""
        acres = self.current_state['total_acres']
        saas_users = int(acres * self.revenue_assumptions['saas_adoption_rate'])
        
        # Recurring revenue (monthly)
        service_revenue = acres * self.revenue_assumptions['monthly_service_per_acre']
        saas_revenue = saas_users * self.revenue_assumptions['saas_per_user_per_month']
        
        # One-time revenue (estimate new customer acquisition)
        # Conservative estimate: 10 new customers/month with 3 acres each = 30 new acres
        new_acres_per_month = 30
        product_revenue = new_acres_per_month * self.revenue_assumptions['product_sale_per_acre']
        installation_revenue = new_acres_per_month * self.revenue_assumptions['installation_per_acre']
        
        total_revenue = service_revenue + saas_revenue + product_revenue + installation_revenue
        recurring_revenue = service_revenue + saas_revenue
        
        return {
            'service_revenue': service_revenue,
            'saas_revenue': saas_revenue,
            'product_revenue': product_revenue,
            'installation_revenue': installation_revenue,
            'total_revenue': total_revenue,
            'recurring_revenue': recurring_revenue,
            'new_acres_per_month': new_acres_per_month
        }
    
    def calculate_current_gross_profit(self, revenue):
        """Calculate gross profit after margins"""
        service_gp = revenue['service_revenue'] * self.margins['service_gross_margin']
        saas_gp = revenue['saas_revenue'] * self.margins['saas_gross_margin']
        product_gp = revenue['product_revenue'] * self.margins['product_gross_margin']
        installation_gp = revenue['installation_revenue'] * self.margins['installation_gross_margin']
        
        total_gross_profit = service_gp + saas_gp + product_gp + installation_gp
        terrasync_gross_profit = total_gross_profit * self.terrasync_share
        
        return {
            'service_gp': service_gp,
            'saas_gp': saas_gp,
            'product_gp': product_gp,
            'installation_gp': installation_gp,
            'total_gross_profit': total_gross_profit,
            'terrasync_gross_profit': terrasync_gross_profit
        }
    
    def calculate_current_costs(self):
        """Calculate current monthly operational costs"""
        
        # Personnel costs
        monthly_salaries = (self.current_state['employees'] * self.current_state['avg_annual_salary']) / 12
        
        # Current model shows these OpEx categories from validation tab:
        # - Corporate: $35k/month
        # - Tech Infrastructure: $8k/month  
        # - Operations: $12k/month
        # - Territory Support: $6.5k per territory
        
        # Let's calculate what they SHOULD be based on reality:
        base_corporate = 20000  # Reduced from $35k
        tech_infrastructure = 5000  # Reduced from $8k
        operations = 8000  # Reduced from $12k
        territory_support = self.current_state['territories'] * 3000  # Reduced from $6.5k to $3k per territory
        
        total_costs = monthly_salaries + base_corporate + tech_infrastructure + operations + territory_support
        
        return {
            'monthly_salaries': monthly_salaries,
            'base_corporate': base_corporate,
            'tech_infrastructure': tech_infrastructure,
            'operations': operations,
            'territory_support': territory_support,
            'total_costs': total_costs
        }
    
    def analyze_current_cash_flow(self):
        """Complete cash flow analysis"""
        revenue = self.calculate_current_monthly_revenue()
        gross_profit = self.calculate_current_gross_profit(revenue)
        costs = self.calculate_current_costs()
        
        net_cash_flow = gross_profit['terrasync_gross_profit'] - costs['total_costs']
        variance_from_actual = net_cash_flow - self.actual_monthly_cash_flow
        
        return {
            'revenue': revenue,
            'gross_profit': gross_profit,
            'costs': costs,
            'net_cash_flow': net_cash_flow,
            'variance_from_actual': variance_from_actual
        }
    
    def identify_model_issues(self):
        """Identify specific issues with the current model"""
        analysis = self.analyze_current_cash_flow()
        issues = []
        
        # Check if costs are too high
        if analysis['costs']['total_costs'] > 70000:  # If costs > $70k/month
            issues.append("Monthly costs are likely overestimated")
            
            # Check specific cost categories
            if analysis['costs']['base_corporate'] > 25000:
                issues.append(f"Corporate costs too high: ${analysis['costs']['base_corporate']:,.0f}/month")
            
            territory_cost_per = analysis['costs']['territory_support'] / self.current_state['territories']
            if territory_cost_per > 4000:
                issues.append(f"Territory support costs too high: ${territory_cost_per:,.0f} per territory")
        
        # Check if revenue is underestimated
        expected_min_revenue = 60000  # Should be at least $60k/month with 400 acres
        if analysis['revenue']['total_revenue'] < expected_min_revenue:
            issues.append("Revenue may be underestimated")
        
        return issues
    
    def generate_corrected_projections(self, months=48):
        """Generate corrected 48-month projections"""
        projections = []
        
        # Starting values
        current_acres = self.current_state['total_acres']
        current_territories = self.current_state['territories']
        
        for month in range(months):
            # Territory expansion schedule (realistic)
            if month == 6:
                current_territories = 3
            elif month == 12:
                current_territories = 4
            elif month == 18:
                current_territories = 6
            elif month == 24:
                current_territories = 8
            elif month == 30:
                current_territories = 10
            elif month == 36:
                current_territories = 12
            elif month == 42:
                current_territories = 15
            elif month == 48:
                current_territories = 18
            
            # Acre growth (realistic with churn)
            new_acres = current_territories * 20  # 20 new acres per territory per month
            churned_acres = current_acres * 0.015  # 1.5% monthly churn (18% annual)
            current_acres = current_acres + new_acres - churned_acres
            
            # Revenue calculation
            saas_users = int(current_acres * 0.20)
            service_rev = current_acres * 59
            saas_rev = saas_users * 50
            
            # Seasonal one-time revenue
            seasonal_multiplier = self.get_seasonal_multiplier(month)
            product_rev = new_acres * 1800 * seasonal_multiplier * 0.3  # 30% of new acres buy products
            install_rev = new_acres * 700 * seasonal_multiplier * 0.3
            
            total_revenue = service_rev + saas_rev + product_rev + install_rev
            
            # Gross profit
            gross_profit = (service_rev * 0.70 + saas_rev * 0.85 + 
                          product_rev * 0.20 + install_rev * 0.60) * 0.60
            
            # Costs (scaled properly)
            employees = max(8, current_territories * 2.5 + 3)  # Scale employees realistically
            monthly_salaries = employees * 55000 / 12
            base_costs = 20000 + (current_territories - 2) * 2000  # Scale overhead gradually
            territory_costs = current_territories * 3000
            tech_costs = 5000 + current_territories * 300
            
            total_costs = monthly_salaries + base_costs + territory_costs + tech_costs
            
            net_cash_flow = gross_profit - total_costs
            
            projections.append({
                'month': month,
                'territories': current_territories,
                'acres': int(current_acres),
                'employees': int(employees),
                'total_revenue': int(total_revenue),
                'recurring_revenue': int(service_rev + saas_rev),
                'total_costs': int(total_costs),
                'net_cash_flow': int(net_cash_flow)
            })
        
        return projections
    
    def get_seasonal_multiplier(self, month):
        """Get seasonal multiplier for one-time revenue"""
        month_in_year = month % 12
        if month_in_year in [11, 0, 1]:  # Dec, Jan, Feb
            return 0.4  # Winter
        elif month_in_year in [2, 3, 4]:  # Mar, Apr, May
            return 1.4  # Spring
        elif month_in_year in [5, 6, 7]:  # Jun, Jul, Aug
            return 1.0  # Summer
        else:  # Sep, Oct, Nov
            return 1.2  # Fall
    
    def print_analysis_report(self):
        """Print comprehensive analysis report"""
        print("=== TERRASYNC FINANCIAL MODEL DEEP DIVE ===\n")
        
        analysis = self.analyze_current_cash_flow()
        
        print("1. CURRENT STATE (Month 0)")
        print(f"   Territories: {self.current_state['territories']}")
        print(f"   Total Acres: {self.current_state['total_acres']:,}")
        print(f"   Employees: {self.current_state['employees']}")
        print(f"   Actual Cash Flow: ${self.actual_monthly_cash_flow:,}")
        print()
        
        print("2. CURRENT REVENUE BREAKDOWN")
        rev = analysis['revenue']
        print(f"   Service Revenue: ${rev['service_revenue']:,.0f} ({self.current_state['total_acres']} acres × $59)")
        print(f"   SaaS Revenue: ${rev['saas_revenue']:,.0f} ({int(self.current_state['total_acres'] * 0.20)} users × $50)")
        print(f"   Product Revenue: ${rev['product_revenue']:,.0f} ({rev['new_acres_per_month']} new acres × $1,800)")
        print(f"   Installation Revenue: ${rev['installation_revenue']:,.0f} ({rev['new_acres_per_month']} new acres × $700)")
        print(f"   TOTAL REVENUE: ${rev['total_revenue']:,.0f}")
        print(f"   Recurring Revenue: ${rev['recurring_revenue']:,.0f}")
        print()
        
        print("3. GROSS PROFIT ANALYSIS")
        gp = analysis['gross_profit']
        print(f"   Total Gross Profit: ${gp['total_gross_profit']:,.0f}")
        print(f"   TerraSync Share (60%): ${gp['terrasync_gross_profit']:,.0f}")
        print()
        
        print("4. COST BREAKDOWN")
        costs = analysis['costs']
        print(f"   Salaries: ${costs['monthly_salaries']:,.0f} ({self.current_state['employees']} employees)")
        print(f"   Corporate Base: ${costs['base_corporate']:,.0f}")
        print(f"   Tech Infrastructure: ${costs['tech_infrastructure']:,.0f}")
        print(f"   Operations: ${costs['operations']:,.0f}")
        print(f"   Territory Support: ${costs['territory_support']:,.0f} ({self.current_state['territories']} territories)")
        print(f"   TOTAL COSTS: ${costs['total_costs']:,.0f}")
        print()
        
        print("5. CASH FLOW ANALYSIS")
        print(f"   Calculated Cash Flow: ${analysis['net_cash_flow']:,.0f}")
        print(f"   Actual Cash Flow: ${self.actual_monthly_cash_flow:,}")
        print(f"   Variance: ${analysis['variance_from_actual']:,.0f}")
        print()
        
        print("6. ISSUES IDENTIFIED")
        issues = self.identify_model_issues()
        if issues:
            for i, issue in enumerate(issues, 1):
                print(f"   {i}. {issue}")
        else:
            print("   ✅ No major issues identified")
        print()
        
        print("7. CORRECTED 48-MONTH PROJECTIONS")
        projections = self.generate_corrected_projections()
        key_months = [11, 23, 35, 47]  # Month 12, 24, 36, 48
        for month_idx in key_months:
            p = projections[month_idx]
            print(f"   Month {p['month']+1:2d}: {p['territories']:2d} territories, {p['acres']:,} acres, ${p['net_cash_flow']:,}/month cash flow")
        
        print()
        print("8. KEY RECOMMENDATIONS")
        print("   1. Reduce territory support costs from $6.5k to $3k per territory")
        print("   2. Adjust corporate overhead to scale more gradually")
        print("   3. Factor in realistic seasonal patterns for one-time revenue")
        print("   4. Include customer churn (1.5% monthly) in acre projections")
        print("   5. Scale employee count more conservatively")
        
        return analysis, projections

if __name__ == "__main__":
    analyzer = TerrasyncAnalysis()
    analysis, projections = analyzer.print_analysis_report() 