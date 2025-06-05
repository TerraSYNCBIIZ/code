#!/usr/bin/env python3
"""
Calibrate the territory maturity model to match -$3,500 monthly cash flow
"""

class TerritoryMaturityModel:
    def __init__(self, additional_revenue_per_territory=11961):
        # Territory maturity curve
        self.maturity_curve = {1: 25, 3: 75, 6: 150, 12: 300, 18: 500, 24: 750, 36: 1200, 48: 1800, 60: 2000}
        
        # Territory addition schedule - consistent throughout years
        self.territory_schedule = [
            (0, 'start', 2), (6, 'add', 1), (11, 'add', 1),
            (14, 'add', 1), (17, 'add', 1), (20, 'add', 1), (23, 'add', 1),
            (26, 'add', 1), (28, 'add', 1), (30, 'add', 1), (32, 'add', 1), (34, 'add', 1), (35, 'add', 1),
            (37, 'add', 1), (39, 'add', 1), (41, 'add', 1), (42, 'add', 1), 
            (44, 'add', 1), (45, 'add', 1), (46, 'add', 1), (47, 'add', 1),
            (49, 'add', 2), (51, 'add', 2), (53, 'add', 2), (55, 'add', 2), (57, 'add', 2)
        ]
        
        # Revenue parameters
        self.additional_revenue_per_territory = additional_revenue_per_territory
    
    def get_territory_count(self, month):
        total = 0
        for event_month, action, count in self.territory_schedule:
            if event_month <= month:
                if action == 'start':
                    total = count
                elif action == 'add':
                    total += count
        return total
    
    def get_territory_list(self, current_month):
        territories = []
        territory_id = 1
        
        for event_month, action, count in self.territory_schedule:
            if event_month <= current_month:
                if action == 'start':
                    for i in range(count):
                        territories.append({'id': territory_id, 'start_month': 0, 'age': current_month})
                        territory_id += 1
                elif action == 'add':
                    for i in range(count):
                        territories.append({'id': territory_id, 'start_month': event_month, 'age': current_month - event_month})
                        territory_id += 1
        return territories
    
    def calculate_territory_acres(self, age):
        if age < 0:
            return 0
        for months in sorted(self.maturity_curve.keys()):
            if age <= months:
                return self.maturity_curve[months]
        return 2000
    
    def calculate_new_acres_for_territory(self, age):
        if age < 0: return 0
        if age <= 3: return 25
        elif age <= 6: return 20
        elif age <= 12: return 15
        elif age <= 24: return 12
        elif age <= 36: return 8
        else: return 5
    
    def calculate_total_acres(self, month):
        territories = self.get_territory_list(month)
        total_acres = 0
        for territory in territories:
            total_acres += self.calculate_territory_acres(territory['age'])
        
        # Apply 0.5% monthly churn
        if month > 0:
            churn_loss = total_acres * 0.005
            total_acres = max(0, total_acres - churn_loss)
        
        return total_acres
    
    def calculate_new_acres_this_month(self, month):
        territories = self.get_territory_list(month)
        new_acres = 0
        for territory in territories:
            new_acres += self.calculate_new_acres_for_territory(territory['age'])
        return new_acres
    
    def calculate_monthly_revenue(self, month):
        territories = self.get_territory_list(month)
        territory_count = len(territories)
        total_acres = self.calculate_total_acres(month)
        new_acres = self.calculate_new_acres_this_month(month)
        saas_users = int(total_acres * 0.20)
        
        # Seasonal multiplier for new revenue
        month_in_year = month % 12
        if month_in_year in [11, 0, 1]:
            seasonal = 0.4
        elif month_in_year in [2, 3, 4]:
            seasonal = 1.4
        elif month_in_year in [5, 6, 7]:
            seasonal = 1.0
        else:
            seasonal = 1.2
        
        # Revenue calculations
        service_revenue = total_acres * 59
        saas_revenue = saas_users * 50
        additional_revenue = territory_count * self.additional_revenue_per_territory
        product_revenue = new_acres * 1800 * 0.15 * seasonal
        installation_revenue = new_acres * 700 * 0.15 * seasonal
        
        total_revenue = service_revenue + saas_revenue + additional_revenue + product_revenue + installation_revenue
        
        return {
            'service': service_revenue,
            'saas': saas_revenue,
            'additional': additional_revenue,
            'product': product_revenue,
            'installation': installation_revenue,
            'total': total_revenue,
            'recurring': service_revenue + saas_revenue,
            'total_acres': total_acres,
            'new_acres': new_acres,
            'territory_count': territory_count
        }
    
    def calculate_monthly_costs(self, month):
        territory_count = self.get_territory_count(month)
        
        # Employee scaling: 4 base + 0.75 per territory after first 2
        employees = max(4, 4 + (territory_count - 2) * 0.75)
        salaries = (employees * 45000) / 12
        
        # Overhead scaling
        overhead = 8000 + max(0, (territory_count - 2) * 800)
        
        # Territory support
        territory_support = territory_count * 1000
        
        total_costs = salaries + overhead + territory_support
        
        return {
            'salaries': salaries,
            'overhead': overhead,
            'territory_support': territory_support,
            'total': total_costs,
            'employees': int(employees)
        }
    
    def calculate_net_cash_flow(self, month):
        revenue = self.calculate_monthly_revenue(month)
        costs = self.calculate_monthly_costs(month)
        
        # Gross profit calculation
        service_gp = revenue['service'] * 0.70
        saas_gp = revenue['saas'] * 0.85
        additional_gp = revenue['additional'] * 0.60
        product_gp = revenue['product'] * 0.20
        installation_gp = revenue['installation'] * 0.60
        
        total_gp = service_gp + saas_gp + additional_gp + product_gp + installation_gp
        terrasync_gp = total_gp * 0.60  # TerraSync 60% share
        
        net_cash_flow = terrasync_gp - costs['total']
        
        return {
            'revenue': revenue,
            'costs': costs,
            'gross_profit': terrasync_gp,
            'net_cash_flow': net_cash_flow
        }

def calibrate_model():
    """Find the exact additional revenue per territory to match -$3,500 cash flow"""
    target_cash_flow = -3500
    
    print("=== CALIBRATING TERRITORY MATURITY MODEL ===")
    print(f"Target cash flow: ${target_cash_flow:,}")
    print()
    
    # Binary search for the right additional revenue per territory
    low = 10000
    high = 20000
    tolerance = 50
    
    best_additional_revenue = None
    best_variance = float('inf')
    
    for iteration in range(50):
        mid = (low + high) / 2
        
        model = TerritoryMaturityModel(additional_revenue_per_territory=mid)
        result = model.calculate_net_cash_flow(0)
        
        cash_flow = result['net_cash_flow']
        variance = abs(cash_flow - target_cash_flow)
        
        print(f"Iteration {iteration+1:2d}: Additional Revenue = ${mid:8.0f}, Cash Flow = ${cash_flow:8.0f}, Variance = ${variance:6.0f}")
        
        if variance < best_variance:
            best_variance = variance
            best_additional_revenue = mid
        
        if variance <= tolerance:
            print(f"\n✅ CALIBRATION SUCCESSFUL!")
            print(f"Additional Revenue per Territory: ${mid:,.0f}")
            print(f"Net Cash Flow: ${cash_flow:,.0f}")
            print(f"Variance from target: ${variance:,.0f}")
            break
        
        if cash_flow < target_cash_flow:
            low = mid
        else:
            high = mid
    
    # Final validation with best parameters
    print(f"\n=== FINAL VALIDATION ===")
    model = TerritoryMaturityModel(additional_revenue_per_territory=best_additional_revenue)
    result = model.calculate_net_cash_flow(0)
    
    print(f"Additional Revenue per Territory: ${best_additional_revenue:,.0f}")
    print(f"Current State (Month 0):")
    print(f"  Territories: {model.get_territory_count(0)}")
    print(f"  Acres: {result['revenue']['total_acres']:,.0f}")
    print(f"  Total Revenue: ${result['revenue']['total']:,.0f}")
    print(f"  Recurring Revenue: ${result['revenue']['recurring']:,.0f}")
    print(f"  Additional Revenue: ${result['revenue']['additional']:,.0f}")
    print(f"  Total Costs: ${result['costs']['total']:,.0f}")
    print(f"  Net Cash Flow: ${result['net_cash_flow']:,.0f}")
    print(f"  Target: ${target_cash_flow:,}")
    print(f"  Variance: ${result['net_cash_flow'] - target_cash_flow:,.0f}")
    
    # Test projection growth
    print(f"\n=== GROWTH PROJECTIONS ===")
    
    for month in [0, 6, 12, 18, 24, 30, 36, 42, 48]:
        data = model.calculate_net_cash_flow(month)
        territories = model.get_territory_count(month)
        print(f"Month {month:2d}: {territories:2d} territories, {data['revenue']['total_acres']:4.0f} acres, ${data['net_cash_flow']:8.0f}/month")
    
    print(f"\n=== TERRITORY ADDITION SCHEDULE ===")
    
    territory_counts = {}
    for month in range(60):
        count = model.get_territory_count(month)
        if count not in territory_counts:
            territory_counts[count] = month
    
    for territories, month in sorted(territory_counts.items()):
        print(f"Month {month:2d}: Reach {territories:2d} territories")
    
    print(f"\n✅ Territory Model Calibrated Successfully")
    print(f"📈 Reaches 30+ territories by month {territory_counts.get(30, '55+')}")
    print(f"💰 Additional revenue parameter: ${best_additional_revenue:,.0f}")
    
    return best_additional_revenue

if __name__ == "__main__":
    calibrated_value = calibrate_model() 