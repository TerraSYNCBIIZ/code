# Implementation Plan

- [ ] 1. Fix data consistency issue in annual dashboard calculations



  - Debug and identify why annual gross revenue shows 903K vs 500K in projections
  - Add detailed logging to updateAnnualDashboard function to trace calculation steps
  - Ensure dashboard displays match underlying projection data exactly
  - Fix any data aggregation or filtering issues in year projection slicing
  - _Requirements: 1.1, 1.2, 1.3, 1.4_
-


- [ ] 2. Add comprehensive location-scaling operational costs

  - Add facility costs (rent, utilities, insurance, maintenance) that scale per location
  - Add vehicle costs (lease, fuel, maintenance, insurance) that scale with field operations
  - Add equipment financing and maintenance costs that scale with business growth
  - Add compliance costs (licensing, professional services, certifications)
- [ ] 3. Enhance personnel cost model with realistic salaries and benefits



- [-] 3. Enhance personnel cost model with realistic salaries and benefits


  - Update founder salary tiers to more realistic levels based on ARR growth
  - Increase employee salaries to competitive market rates
  - Add employee benefits costs (health insurance, payroll taxes, workers comp)



  - Ensure personnel costs scale appropriately with business growth
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 4. Implement enhanced cost calculation in financial model

  - Modify calculateCosts function to include all new operational cost categories
  - Ensure costs scale properly with number of locations and employees
  - Add working capital requirements based on revenue growth
  - Update cost breakdown structure to show detailed cost categories
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 5. Add data validation and consistency checking
  - Create DataValidator class to check calculation consistency
  - Add validation for annual revenue calculations vs dashboard displays
  - Implement unit economics validation with industry benchmark warnings
  - Add detailed logging for debugging data discrepancies
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Update dashboard to display enhanced cost breakdown
  - Add new cost categories to annual metrics display
  - Show detailed cost breakdown in dashboard (facilities, vehicles, equipment, etc.)
  - Ensure all cost displays are consistent with underlying calculations
  - Add validation indicators to show data consistency status
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 7. Test and validate all financial calculations
  - Test annual revenue calculations match between dashboard and projections
  - Validate that all new cost categories are included and scaling properly
  - Test personnel cost calculations with realistic salary increases
  - Verify unit economics calculations are accurate with enhanced cost model
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3, 4.4_

- [ ] 8. Perform comprehensive model validation and debugging
  - Run full model simulation and validate all outputs
  - Check for any remaining data consistency issues
  - Verify cost model completeness and realism
  - Test edge cases and boundary conditions
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_