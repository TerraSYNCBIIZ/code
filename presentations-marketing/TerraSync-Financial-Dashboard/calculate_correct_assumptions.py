#!/usr/bin/env python3
"""
Calculate Correct TerraSync Model Assumptions
Working backwards from actual current state: -$3,500 cash flow, 400 acres, 2 territories
"""

def calculate_correct_assumptions():
    print("=== TERRASYNC MODEL CALIBRATION ===\n")
    
    # KNOWN ACTUAL CURRENT STATE
    actual_cash_flow = -3500
    actual_acres = 400
    actual_territories = 2
    
    print("ACTUAL CURRENT STATE:")
    print(f"  Cash Flow: ${actual_cash_flow:,}")
    print(f"  Acres: {actual_acres:,}")
    print(f"  Territories: {actual_territories}")
    print()
    
    # REALISTIC COST STRUCTURE (validated)
    print("REALISTIC COST STRUCTURE:")
    base_employees = 4
    avg_salary = 45000
    monthly_salaries = (base_employees * avg_salary) / 12
    base_overhead = 8000
    territory_support_per = 1000
    territory_support = actual_territories * territory_support_per
    
    total_costs = monthly_salaries + base_overhead + territory_support
    
    print(f"  Base Employees: {base_employees}")
    print(f"  Average Salary: ${avg_salary:,}")
    print(f"  Monthly Salaries: ${monthly_salaries:,.0f}")
    print(f"  Base Overhead: ${base_overhead:,}")
    print(f"  Territory Support: ${territory_support:,.0f} (${territory_support_per:,}/territory)")
    print(f"  Total Costs: ${total_costs:,.0f}")
    print()
    
    # REQUIRED GROSS PROFIT
    required_gross_profit = total_costs + actual_cash_flow
    print(f"REQUIRED GROSS PROFIT: ${required_gross_profit:,.0f}")
    print()
    
    # SCENARIO 1: Conservative recurring revenue only
    print("SCENARIO 1: CONSERVATIVE RECURRING REVENUE ONLY")
    service_per_acre = 59  # Market validated rate
    saas_adoption = 0.20
    saas_per_user = 50
    
    service_revenue = actual_acres * service_per_acre
    saas_users = int(actual_acres * saas_adoption)
    saas_revenue = saas_users * saas_per_user
    recurring_revenue = service_revenue + saas_revenue
    
    # Margins and TerraSync share
    service_margin = 0.70
    saas_margin = 0.85
    terrasync_share = 0.60
    
    recurring_gp = (service_revenue * service_margin + saas_revenue * saas_margin) * terrasync_share
    
    print(f"  Service Revenue: {actual_acres} acres × ${service_per_acre} = ${service_revenue:,}")
    print(f"  SaaS Revenue: {saas_users} users × ${saas_per_user} = ${saas_revenue:,}")
    print(f"  Total Recurring: ${recurring_revenue:,}")
    print(f"  Recurring Gross Profit: ${recurring_gp:,.0f}")
    print()
    
    # MISSING GROSS PROFIT
    missing_gp = required_gross_profit - recurring_gp
    print(f"  Missing Gross Profit: ${missing_gp:,.0f}")
    
    # What additional revenue is needed?
    additional_margin = 0.60  # Reasonable margin for additional services
    additional_revenue_needed = missing_gp / (additional_margin * terrasync_share)
    additional_per_territory = additional_revenue_needed / actual_territories
    
    print(f"  Additional Revenue Needed: ${additional_revenue_needed:,.0f}")
    print(f"  Additional Per Territory: ${additional_per_territory:,.0f}")
    print()
    
    # SCENARIO 2: Higher service rate
    print("SCENARIO 2: HIGHER SERVICE RATE")
    
    # What service rate would be needed with minimal additional revenue?
    minimal_additional = 2000  # $2k/month additional revenue
    minimal_additional_gp = minimal_additional * additional_margin * terrasync_share
    
    needed_recurring_gp = required_gross_profit - minimal_additional_gp
    needed_service_gp = needed_recurring_gp - (saas_revenue * saas_margin * terrasync_share)
    needed_service_revenue = needed_service_gp / (service_margin * terrasync_share)
    needed_service_rate = needed_service_revenue / actual_acres
    
    print(f"  With ${minimal_additional:,} additional revenue:")
    print(f"  Required Service Revenue: ${needed_service_revenue:,.0f}")
    print(f"  Required Service Rate: ${needed_service_rate:.0f}/acre")
    print()
    
    # FINAL CALIBRATED MODEL
    print("=== CALIBRATED MODEL PARAMETERS ===")
    
    # Use the additional revenue approach (more realistic)
    final_service_rate = 59  # Keep market rate
    final_additional_per_territory = round(additional_per_territory / 1000) * 1000  # Round to nearest $1k
    
    print("REVENUE PARAMETERS:")
    print(f"  Service Rate: ${final_service_rate}/acre/month")
    print(f"  SaaS Rate: ${saas_per_user}/user/month")
    print(f"  SaaS Adoption: {saas_adoption:.0%}")
    print(f"  Additional Services: ${final_additional_per_territory:,.0f}/territory/month")
    print()
    
    print("COST PARAMETERS:")
    print(f"  Base Employees: {base_employees}")
    print(f"  Average Salary: ${avg_salary:,}")
    print(f"  Base Overhead: ${base_overhead:,}/month")
    print(f"  Territory Support: ${territory_support_per:,}/territory/month")
    print()
    
    print("MARGIN PARAMETERS:")
    print(f"  Service Margin: {service_margin:.0%}")
    print(f"  SaaS Margin: {saas_margin:.0%}")
    print(f"  Additional Services Margin: {additional_margin:.0%}")
    print(f"  TerraSync Share: {terrasync_share:.0%}")
    print()
    
    # VERIFICATION
    print("=== VERIFICATION ===")
    
    final_service_revenue = actual_acres * final_service_rate
    final_saas_revenue = saas_users * saas_per_user
    final_additional_revenue = actual_territories * final_additional_per_territory
    final_total_revenue = final_service_revenue + final_saas_revenue + final_additional_revenue
    
    final_gp = ((final_service_revenue * service_margin + 
                final_saas_revenue * saas_margin + 
                final_additional_revenue * additional_margin) * terrasync_share)
    
    final_cash_flow = final_gp - total_costs
    variance = final_cash_flow - actual_cash_flow
    
    print(f"Total Revenue: ${final_total_revenue:,.0f}")
    print(f"  Service: ${final_service_revenue:,}")
    print(f"  SaaS: ${final_saas_revenue:,}")
    print(f"  Additional: ${final_additional_revenue:,}")
    print()
    print(f"Gross Profit: ${final_gp:,.0f}")
    print(f"Total Costs: ${total_costs:,.0f}")
    print(f"Net Cash Flow: ${final_cash_flow:,.0f}")
    print(f"Target: ${actual_cash_flow:,}")
    print(f"Variance: ${variance:,.0f}")
    print(f"Accurate: {'✅ YES' if abs(variance) < 500 else '❌ NO'}")
    
    return {
        'service_rate': final_service_rate,
        'saas_rate': saas_per_user,
        'saas_adoption': saas_adoption,
        'additional_per_territory': final_additional_per_territory,
        'base_employees': base_employees,
        'avg_salary': avg_salary,
        'base_overhead': base_overhead,
        'territory_support': territory_support_per,
        'service_margin': service_margin,
        'saas_margin': saas_margin,
        'additional_margin': additional_margin,
        'terrasync_share': terrasync_share
    }

if __name__ == "__main__":
    calibrated_params = calculate_correct_assumptions() 