#!/usr/bin/env python3
"""
Final calibration to match exact cash flow of -$3,500
"""

# KNOWN FACTS
actual_cash_flow = -3500
territories = 2
acres = 400

# SCENARIO TESTING
def test_scenario(employees, avg_salary, overhead, territory_cost_per, additional_rev_per_territory):
    """Test a specific cost/revenue scenario"""
    
    # Core recurring revenue (high confidence)
    service_rev = acres * 59  # $23,600
    saas_rev = int(acres * 0.20) * 50  # $4,000
    
    # Additional revenue (unknown amount)
    additional_rev = territories * additional_rev_per_territory
    
    # Conservative one-time revenue
    new_acres = 20  # Very conservative
    product_rev = new_acres * 1800 * 0.10  # $3,600
    install_rev = new_acres * 700 * 0.10   # $1,400
    
    total_revenue = service_rev + saas_rev + additional_rev + product_rev + install_rev
    
    # Gross profit (60% TerraSync share)
    gross_profit = (service_rev * 0.70 + saas_rev * 0.85 + 
                   additional_rev * 0.60 + product_rev * 0.20 + 
                   install_rev * 0.60) * 0.60
    
    # Costs
    salaries = (employees * avg_salary) / 12
    territory_costs = territories * territory_cost_per
    total_costs = salaries + overhead + territory_costs
    
    # Cash flow
    net_cash_flow = gross_profit - total_costs
    variance = net_cash_flow - actual_cash_flow
    
    return {
        'employees': employees,
        'avg_salary': avg_salary,
        'total_revenue': total_revenue,
        'gross_profit': gross_profit,
        'total_costs': total_costs,
        'net_cash_flow': net_cash_flow,
        'variance': variance,
        'accurate': abs(variance) < 500
    }

print("=== FINAL CALIBRATION ANALYSIS ===\n")

# Test different scenarios
scenarios = [
    # employees, avg_salary, overhead, territory_cost, additional_rev_per_territory
    (4, 45000, 10000, 1500, 8000),   # Lean team, higher additional revenue
    (5, 50000, 8000, 1000, 7000),    # Medium team, good additional revenue
    (6, 40000, 12000, 2000, 6000),   # Larger team, lower salaries
    (3, 60000, 15000, 2500, 10000),  # Small high-paid team, high additional revenue
]

best_scenario = None
best_variance = float('inf')

for i, (emp, sal, overhead, terr_cost, add_rev) in enumerate(scenarios, 1):
    result = test_scenario(emp, sal, overhead, terr_cost, add_rev)
    
    print(f"SCENARIO {i}:")
    print(f"  {emp} employees @ ${sal:,}/year")
    print(f"  ${overhead:,} overhead + ${terr_cost:,}/territory")
    print(f"  ${add_rev:,} additional revenue/territory")
    print(f"  Total Revenue: ${result['total_revenue']:,.0f}")
    print(f"  Total Costs: ${result['total_costs']:,.0f}")
    print(f"  Net Cash Flow: ${result['net_cash_flow']:,.0f}")
    print(f"  Variance: ${result['variance']:,.0f}")
    print(f"  Accurate: {'✅ YES' if result['accurate'] else '❌ NO'}")
    print()
    
    if abs(result['variance']) < abs(best_variance):
        best_variance = result['variance']
        best_scenario = (i, result, emp, sal, overhead, terr_cost, add_rev)

if best_scenario:
    i, result, emp, sal, overhead, terr_cost, add_rev = best_scenario
    print(f"BEST SCENARIO #{i} - Variance: ${best_variance:,.0f}")
    print()
    print("RECOMMENDED MODEL PARAMETERS:")
    print(f"  Employees: {emp}")
    print(f"  Average Salary: ${sal:,}")
    print(f"  Monthly Overhead: ${overhead:,}")
    print(f"  Territory Support: ${terr_cost:,}/territory")
    print(f"  Additional Revenue: ${add_rev:,}/territory")
    
    # Generate 48-month projection with best scenario
    print("\nPROJECTED GROWTH (48 MONTHS):")
    
    current_acres = 400
    territory_schedule = {0: 2, 6: 3, 12: 4, 18: 6, 24: 8, 30: 10, 36: 12, 42: 15, 48: 18}
    
    for month in [12, 24, 36, 48]:
        # Territory count
        territories_proj = 2
        for m, t in territory_schedule.items():
            if month >= m:
                territories_proj = t
        
        # Acre growth
        for m in range(month):
            current_terr = 2
            for tm, tt in territory_schedule.items():
                if m >= tm:
                    current_terr = tt
            new_acres_m = current_terr * 25
            churned_acres_m = current_acres * 0.005
            current_acres = current_acres + new_acres_m - churned_acres_m
        
        # Revenue projection
        service_rev_proj = current_acres * 59
        saas_rev_proj = int(current_acres * 0.20) * 50
        additional_rev_proj = territories_proj * add_rev
        total_rev_proj = service_rev_proj + saas_rev_proj + additional_rev_proj + (territories_proj * 1000)  # minimal one-time
        
        # Costs projection
        employees_proj = max(emp, emp + (territories_proj - 2) * 0.8)
        salaries_proj = (employees_proj * sal) / 12
        costs_proj = salaries_proj + overhead + (territories_proj * terr_cost) + ((territories_proj - 2) * 500)
        
        # Gross profit projection (simplified)
        gp_proj = total_rev_proj * 0.30  # Approximate 30% net margin
        
        cash_flow_proj = gp_proj - costs_proj
        
        print(f"  Month {month:2d}: {territories_proj:2d} territories, {current_acres:,.0f} acres, ${cash_flow_proj:,.0f}/month")
        
        # Reset for next calculation
        current_acres = 400

print("\nKEY INSIGHTS:")
print("1. Your actual operations are likely more efficient than the original model assumed")
print("2. There may be significant additional revenue streams not captured")
print("3. Cost structure is probably leaner than modeled")
print("4. Consider validating actual employee count and average compensation") 