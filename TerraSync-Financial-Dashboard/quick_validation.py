actual_cash_flow = -3500

# Test corrected current state
service_rev = 400 * 59  # 23,600
saas_rev = 80 * 50     # 4,000
product_rev = 60 * 1800 * 0.15  # 16,200
install_rev = 60 * 700 * 0.15   # 6,300
additional_rev = 2 * 3000       # 6,000
total_revenue = service_rev + saas_rev + product_rev + install_rev + additional_rev

# Gross profit
total_gp = (service_rev * 0.70 + saas_rev * 0.85 + product_rev * 0.20 + install_rev * 0.60 + additional_rev * 0.60) * 0.60

# Costs
salaries = (6 * 50000) / 12  # 25,000
total_costs = 8000 + 3000 + 4000 + 4000 + salaries  # 44,000

net_cash_flow = total_gp - total_costs

print('=== CORRECTED MODEL VALIDATION ===')
print(f'Total Revenue: ${total_revenue:,.0f}')
print(f'  Service: ${service_rev:,.0f}')
print(f'  SaaS: ${saas_rev:,.0f}')
print(f'  Product: ${product_rev:,.0f}')
print(f'  Installation: ${install_rev:,.0f}')
print(f'  Additional: ${additional_rev:,.0f}')
print()
print(f'TerraSync Gross Profit: ${total_gp:,.0f}')
print(f'Total Costs: ${total_costs:,.0f}')
print(f'  Salaries: ${salaries:,.0f}')
print(f'  Other: ${total_costs - salaries:,.0f}')
print()
print(f'Net Cash Flow: ${net_cash_flow:,.0f}')
print(f'Actual Cash Flow: ${actual_cash_flow:,}')
print(f'Variance: ${net_cash_flow - actual_cash_flow:,.0f}')
print(f'Accurate: {"YES ✅" if abs(net_cash_flow - actual_cash_flow) < 2000 else "NO ❌"}')
print()
print('KEY CORRECTIONS MADE:')
print('1. Added $6k additional revenue per territory')
print('2. Reduced territory support from $6.5k to $2k')
print('3. Reduced corporate overhead by 70%')
print('4. More realistic staffing (6 employees vs 8)')
print('5. Realistic product/installation penetration (15%)') 