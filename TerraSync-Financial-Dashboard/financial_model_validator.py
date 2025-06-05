#!/usr/bin/env python3
"""
TerraSync Financial Model Validator
Deep dive analysis to ensure accuracy of all financial calculations
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import json

class TerrasyncValidator:
    def __init__(self):
        # Current reality check - user says they're only -$3-4k monthly, not -$61k
        self.current_monthly_cash_flow = -3500  # Actual current cash flow
        
        # Base assumptions from the model
        self.assumptions = {
            'monthly_service_revenue': 59,      # $59/acre/month
            'saas_revenue': 50,                 # $50/user/month
            'saas_adoption_rate': 0.20,         # 20% adoption
            'product_sale_per_acre': 1800,     # $1,800/acre one-time
            'installation_per_acre': 700,      # $700/acre one-time
            
            # Margins
            'service_gross_margin': 0.70,      # 70%
            'product_gross_margin': 0.20,      # 20%
            'installation_gross_margin': 0.60, # 60%
            'saas_gross_margin': 0.85,         # 85%
            
            'territory_partnership_split': 0.60,  # 60% to TerraSync
            
            # Churn assumptions (need realistic estimates)
            'monthly_churn_rate': 0.02,        # 2% monthly churn (24% annual)
            'acres_per_new_customer': 3,       # Average acres per new customer
        }
        
        # Current actual operational data
        self.current_state = {
            'territories': 2,                   # Current active territories
            'total_acres': 400,                 # Current total acres under management
            'employees': 8,                     # Current employee count
            'avg_salary': 55000,                # Average annual salary
            'monthly_overhead': 25000,          # Current monthly overhead
        }
        
    def calculate_current_revenue_breakdown(self):
        """Calculate current monthly revenue based on actual acres"""
        acres = self.current_state['total_acres']
        saas_users = int(acres * self.assumptions['saas_adoption_rate'])
        
        # Recurring revenue
        service_revenue = acres * self.assumptions['monthly_service_revenue']
        saas_revenue = saas_users * self.assumptions['saas_revenue']
        
        # New customer acquisition (estimate 10 new customers/month with 3 acres each)
        new_acres_monthly = 30  # 10 customers × 3 acres
        product_revenue = new_acres_monthly * self.assumptions['product_sale_per_acre']
        installation_revenue = new_acres_monthly * self.assumptions['installation_per_acre']
        
        return {
            'service_revenue': service_revenue,
            'saas_revenue': saas_revenue,
            'product_revenue': product_revenue,
            'installation_revenue': installation_revenue,
            'total_revenue': service_revenue + saas_revenue + product_revenue + installation_revenue,
            'recurring_revenue': service_revenue + saas_revenue,
            'one_time_revenue': product_revenue + installation_revenue
        }
    
    def calculate_current_costs_breakdown(self):
        """Calculate current monthly costs"""
        employees = self.current_state['employees']
        monthly_salaries = (employees * self.assumptions['avg_salary']) / 12
        
        # Territory support costs (more accurate estimate)
        territory_costs = self.current_state['territories'] * 3000  # $3k per territory, not $6.5k
        
        costs = {
            'salaries': monthly_salaries,
            'territory_support': territory_costs,
            'overhead': self.current_state['monthly_overhead'],
            'tech_infrastructure': 5000,
            'marketing': 8000,
            'total_costs': monthly_salaries + territory_costs + self.current_state['monthly_overhead'] + 5000 + 8000
        }
        
        return costs
    
    def calculate_actual_cash_flow(self):
        """Calculate actual current cash flow and compare to model"""
        revenue = self.calculate_current_revenue_breakdown()
        costs = self.calculate_current_costs_breakdown()
        
        # Calculate gross profit
        gross_profit = {
            'service': revenue['service_revenue'] * self.assumptions['service_gross_margin'],
            'saas': revenue['saas_revenue'] * self.assumptions['saas_gross_margin'],
            'product': revenue['product_revenue'] * self.assumptions['product_gross_margin'],
            'installation': revenue['installation_revenue'] * self.assumptions['installation_gross_margin']
        }
        
        total_gross_profit = sum(gross_profit.values())
        
        # TerraSync share (60%)
        terrasync_gross_profit = total_gross_profit * self.assumptions['territory_partnership_split']
        
        # Net cash flow
        net_cash_flow = terrasync_gross_profit - costs['total_costs']
        
        return {
            'revenue': revenue,
            'costs': costs,
            'gross_profit': gross_profit,
            'total_gross_profit': total_gross_profit,
            'terrasync_gross_profit': terrasync_gross_profit,
            'net_cash_flow': net_cash_flow,
            'model_vs_actual_variance': net_cash_flow - self.current_monthly_cash_flow
        }
    
    def project_growth_scenario(self, months=48):
        """Project accurate growth scenario over 48 months"""
        results = []
        
        # Starting values
        current_acres = self.current_state['total_acres']
        current_territories = self.current_state['territories']
        current_employees = self.current_state['employees']
        
        for month in range(months):
            # Territory growth (more realistic)
            if month == 6:
                current_territories = 3
            elif month == 12:
                current_territories = 4
            elif month == 18:
                current_territories = 6
            elif month == 24:
                current_territories = 8
            elif month == 36:
                current_territories = 12
            elif month == 48:
                current_territories = 15
            
            # Acre growth with churn
            new_acres = current_territories * 25  # 25 new acres per territory per month
            churned_acres = current_acres * self.assumptions['monthly_churn_rate']
            current_acres = current_acres + new_acres - churned_acres
            
            # Employee scaling (more realistic)
            current_employees = max(8, current_territories * 2 + 4)  # 2 employees per territory + 4 corporate
            
            # Calculate monthly metrics
            revenue = self.calculate_monthly_revenue(current_acres, current_territories, month)
            costs = self.calculate_monthly_costs(current_territories, current_employees)
            cash_flow = self.calculate_monthly_cash_flow(revenue, costs)
            
            results.append({
                'month': month,
                'territories': current_territories,
                'acres': current_acres,
                'employees': current_employees,
                'total_revenue': revenue['total_revenue'],
                'recurring_revenue': revenue['recurring_revenue'],
                'total_costs': costs['total_costs'],
                'net_cash_flow': cash_flow['net_cash_flow'],
                'cumulative_investment': self.calculate_cumulative_investment(month)
            })
        
        return pd.DataFrame(results)
    
    def calculate_monthly_revenue(self, acres, territories, month):
        """Calculate monthly revenue for given state"""
        saas_users = int(acres * self.assumptions['saas_adoption_rate'])
        
        # Recurring revenue
        service_revenue = acres * self.assumptions['monthly_service_revenue']
        saas_revenue = saas_users * self.assumptions['saas_revenue']
        
        # New customer revenue (seasonal)
        seasonal_multiplier = self.get_seasonal_multiplier(month)
        new_acres = territories * 25  # 25 new acres per territory per month
        product_revenue = new_acres * self.assumptions['product_sale_per_acre'] * seasonal_multiplier * 0.1  # Only 10% of acres buy products
        installation_revenue = new_acres * self.assumptions['installation_per_acre'] * seasonal_multiplier * 0.1
        
        return {
            'service_revenue': service_revenue,
            'saas_revenue': saas_revenue,
            'product_revenue': product_revenue,
            'installation_revenue': installation_revenue,
            'total_revenue': service_revenue + saas_revenue + product_revenue + installation_revenue,
            'recurring_revenue': service_revenue + saas_revenue
        }
    
    def calculate_monthly_costs(self, territories, employees):
        """Calculate monthly costs for given state"""
        monthly_salaries = (employees * self.assumptions['avg_salary']) / 12
        territory_costs = territories * 3000  # Corrected to $3k per territory
        
        # Scale overhead more gradually
        base_overhead = 25000
        scaled_overhead = base_overhead + (territories - 2) * 2000  # $2k additional per territory
        
        return {
            'salaries': monthly_salaries,
            'territory_support': territory_costs,
            'overhead': scaled_overhead,
            'tech_infrastructure': 5000 + (territories * 500),  # Scale tech costs
            'marketing': 8000 + (territories * 1000),  # Scale marketing
            'total_costs': monthly_salaries + territory_costs + scaled_overhead + (5000 + territories * 500) + (8000 + territories * 1000)
        }
    
    def calculate_monthly_cash_flow(self, revenue, costs):
        """Calculate monthly cash flow"""
        # Calculate gross profit
        gross_profit = (
            revenue['service_revenue'] * self.assumptions['service_gross_margin'] +
            revenue['saas_revenue'] * self.assumptions['saas_gross_margin'] +
            revenue['product_revenue'] * self.assumptions['product_gross_margin'] +
            revenue['installation_revenue'] * self.assumptions['installation_gross_margin']
        )
        
        # TerraSync share
        terrasync_gross_profit = gross_profit * self.assumptions['territory_partnership_split']
        
        # Net cash flow
        net_cash_flow = terrasync_gross_profit - costs['total_costs']
        
        return {
            'gross_profit': gross_profit,
            'terrasync_gross_profit': terrasync_gross_profit,
            'net_cash_flow': net_cash_flow
        }
    
    def get_seasonal_multiplier(self, month):
        """Get seasonal multiplier for revenue"""
        month_in_year = month % 12
        if month_in_year in [11, 0, 1]:  # Dec, Jan, Feb
            return 0.4  # Winter
        elif month_in_year in [2, 3, 4]:  # Mar, Apr, May
            return 1.4  # Spring
        elif month_in_year in [5, 6, 7]:  # Jun, Jul, Aug
            return 1.0  # Summer
        else:  # Sep, Oct, Nov
            return 1.2  # Fall
    
    def calculate_cumulative_investment(self, month):
        """Calculate cumulative investment needed"""
        # Initial investment at month 4
        if month < 4:
            return 0
        else:
            return 900000  # $900k initial investment
    
    def generate_analysis_report(self):
        """Generate comprehensive analysis report"""
        current_analysis = self.calculate_actual_cash_flow()
        
        print("=== TERRASYNC FINANCIAL MODEL VALIDATION ===\n")
        
        print("1. CURRENT STATE ANALYSIS")
        print(f"Current Acres: {self.current_state['total_acres']:,}")
        print(f"Current Territories: {self.current_state['territories']}")
        print(f"Current Employees: {self.current_state['employees']}")
        print()
        
        print("2. CURRENT MONTHLY CASH FLOW BREAKDOWN")
        revenue = current_analysis['revenue']
        costs = current_analysis['costs']
        print(f"Service Revenue: ${revenue['service_revenue']:,.0f}")
        print(f"SaaS Revenue: ${revenue['saas_revenue']:,.0f}")
        print(f"Product Revenue: ${revenue['product_revenue']:,.0f}")
        print(f"Installation Revenue: ${revenue['installation_revenue']:,.0f}")
        print(f"Total Monthly Revenue: ${revenue['total_revenue']:,.0f}")
        print()
        print(f"Total Monthly Costs: ${costs['total_costs']:,.0f}")
        print(f"  - Salaries: ${costs['salaries']:,.0f}")
        print(f"  - Territory Support: ${costs['territory_support']:,.0f}")
        print(f"  - Overhead: ${costs['overhead']:,.0f}")
        print(f"  - Tech/Marketing: ${costs['tech_infrastructure'] + costs['marketing']:,.0f}")
        print()
        print(f"Calculated Net Cash Flow: ${current_analysis['net_cash_flow']:,.0f}")
        print(f"Actual Cash Flow (your data): ${self.current_monthly_cash_flow:,.0f}")
        print(f"Variance: ${current_analysis['model_vs_actual_variance']:,.0f}")
        print()
        
        print("3. KEY ISSUES IDENTIFIED")
        if abs(current_analysis['model_vs_actual_variance']) > 5000:
            print("❌ MAJOR DISCREPANCY: Model doesn't match actual cash flow")
            if current_analysis['net_cash_flow'] < self.current_monthly_cash_flow:
                print("   Model is too pessimistic - likely overestimating costs")
            else:
                print("   Model is too optimistic - likely underestimating costs or overestimating revenue")
        else:
            print("✅ Cash flow calculations appear accurate")
        
        return current_analysis

if __name__ == "__main__":
    validator = TerrasyncValidator()
    current_analysis = validator.generate_analysis_report() 