#!/usr/bin/env python3
"""
Test the sophisticated territory maturity model
"""

class TerritoryMaturityModel:
    def __init__(self):
        # Territory maturity curve
        self.maturity_curve = {
            1: 25, 3: 75, 6: 150, 12: 300, 18: 500, 24: 750, 36: 1200, 48: 1800, 60: 2000
        }
        
        # Territory addition schedule - consistent throughout years
        self.territory_schedule = [
            # Year 1: Start with 2, add 2 more (4 total)
            (0, 'start', 2), (6, 'add', 1), (11, 'add', 1),
            # Year 2: Add 4 territories (8 total)
            (14, 'add', 1), (17, 'add', 1), (20, 'add', 1), (23, 'add', 1),
            # Year 3: Add 6 territories (14 total)
            (26, 'add', 1), (28, 'add', 1), (30, 'add', 1), (32, 'add', 1), (34, 'add', 1), (35, 'add', 1),
            # Year 4: Add 8 territories (22 total)
            (37, 'add', 1), (39, 'add', 1), (41, 'add', 1), (42, 'add', 1), 
            (44, 'add', 1), (45, 'add', 1), (46, 'add', 1), (47, 'add', 1),
            # Year 5: Add 10+ territories (32+ total)
            (49, 'add', 2), (51, 'add', 2), (53, 'add', 2), (55, 'add', 2), (57, 'add', 2)
        ]
    
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
                        territories.append({
                            'id': territory_id,
                            'start_month': 0,
                            'age': current_month
                        })
                        territory_id += 1
                elif action == 'add':
                    for i in range(count):
                        territories.append({
                            'id': territory_id,
                            'start_month': event_month,
                            'age': current_month - event_month
                        })
                        territory_id += 1
        return territories
    
    def calculate_territory_acres(self, age):
        if age < 0:
            return 0
        
        # Find the right maturity level
        for months, acres in sorted(self.maturity_curve.items()):
            if age <= months:
                return acres
        return 2000  # Mature capacity
    
    def calculate_new_acres_for_territory(self, age):
        if age < 0:
            return 0
        if age <= 3:
            return 25
        elif age <= 6:
            return 20
        elif age <= 12:
            return 15
        elif age <= 24:
            return 12
        elif age <= 36:
            return 8
        else:
            return 5
    
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
        
        # Seasonal multiplier
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
        additional_revenue = territory_count * 12000  # Calibrated additional services
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
        overhead = 8000 + (territory_count - 2) * 800
        
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
    
    def generate_projection(self, months=60):
        projection = []
        
        for month in range(months):
            data = self.calculate_net_cash_flow(month)
            
            projection.append({
                'month': month,
                'territories': self.get_territory_count(month),
                'acres': int(data['revenue']['total_acres']),
                'employees': data['costs']['employees'],
                'total_revenue': int(data['revenue']['total']),
                'recurring_revenue': int(data['revenue']['recurring']),
                'additional_revenue': int(data['revenue']['additional']),
                'total_costs': int(data['costs']['total']),
                'net_cash_flow': int(data['net_cash_flow']),
                'new_acres': int(data['revenue']['new_acres'])
            })
        
        return projection

def test_territory_model():
    model = TerritoryMaturityModel()
    
    print("=== TERRITORY MATURITY MODEL TEST ===\n")
    
    # Test current state
    current = model.calculate_net_cash_flow(0)
    print("CURRENT STATE VALIDATION (Month 0):")
    print(f"  Territories: {model.get_territory_count(0)}")
    print(f"  Acres: {current['revenue']['total_acres']:,.0f}")
    print(f"  Total Revenue: ${current['revenue']['total']:,.0f}")
    print(f"  Recurring Revenue: ${current['revenue']['recurring']:,.0f}")
    print(f"  Net Cash Flow: ${current['net_cash_flow']:,.0f}")
    print(f"  Target: $-3,500")
    print(f"  Variance: ${current['net_cash_flow'] - (-3500):,.0f}")
    print()
    
    # Test territory additions throughout the year
    print("TERRITORY ADDITION SCHEDULE:")
    for month in [0, 6, 11, 14, 17, 20, 23, 26, 30, 35, 42, 47, 55]:
        territories = model.get_territory_count(month)
        print(f"  Month {month:2d}: {territories:2d} territories")
    print()
    
    # Generate 60-month projection
    projection = model.generate_projection(60)
    
    print("MATURITY MODEL PROJECTIONS:")
    key_months = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 59]
    for month in key_months:
        p = projection[month]
        print(f"Month {month:2d}: {p['territories']:2d} territories, {p['acres']:,} acres, ${p['net_cash_flow']:,}/month")
    
    print()
    print("REVENUE GROWTH ANALYSIS:")
    for month in [0, 12, 24, 36, 48]:
        p = projection[month]
        print(f"Month {month:2d}:")
        print(f"  Total Revenue: ${p['total_revenue']:,}")
        print(f"  Recurring: ${p['recurring_revenue']:,}")
        print(f"  Additional Services: ${p['additional_revenue']:,}")
        print(f"  Employees: {p['employees']}")
        print()
    
    # Test territory maturity
    print("TERRITORY MATURITY EXAMPLES:")
    print("Territory ages and their acre capacity:")
    for age in [0, 3, 6, 12, 24, 36, 48]:
        acres = model.calculate_territory_acres(age)
        new_acres = model.calculate_new_acres_for_territory(age)
        print(f"  Age {age:2d} months: {acres:,} total acres, +{new_acres}/month")
    
    print()
    print("KEY FEATURES:")
    print("✅ Consistent territory additions throughout the year")
    print("✅ Each territory has realistic maturity curve")
    print("✅ Revenue adjusts based on territory age and count")
    print("✅ Reaches 30+ territories by month 55")
    print("✅ Integrated calculations for all metrics")
    print("✅ Accounts for territory startup → maturity progression")
    
    return projection

if __name__ == "__main__":
    projection = test_territory_model() 