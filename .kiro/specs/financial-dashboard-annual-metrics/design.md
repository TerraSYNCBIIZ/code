# Design Document

## Overview

This design outlines the implementation of annual financial metrics dashboard components that will be added below the existing growth trajectory chart. The solution will reuse the existing `updateAnnualDashboard` function logic while adding the necessary HTML elements and styling to display key business metrics.

## Architecture

The annual metrics dashboard will follow the existing dashboard architecture pattern:

- **HTML Structure**: Card-based layout organized into logical sections
- **JavaScript Functions**: Reuse existing `updateAnnualDashboard` function with minor modifications
- **CSS Styling**: Extend existing dashboard styles for consistency
- **Data Flow**: Time slider → `updateAnnualDashboard()` → DOM updates

## Components and Interfaces

### HTML Components

#### Annual Revenue Metrics Section
```html
<div class="annual-metrics-section">
  <div class="section-header">
    <h3>Annual Financial Performance - <span id="annual-year-label">2025</span></h3>
  </div>
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-value" id="annualGrossRevenue">$0</div>
      <div class="metric-label">Gross Revenue</div>
    </div>
    <div class="metric-card">
      <div class="metric-value" id="annualTotalCosts">$0</div>
      <div class="metric-label">Total Costs</div>
    </div>
    <div class="metric-card">
      <div class="metric-value" id="annualNetProfit">$0</div>
      <div class="metric-label">Net Profit</div>
    </div>
    <div class="metric-card">
      <div class="metric-value" id="annualProfitMargin">0%</div>
      <div class="metric-label">Profit Margin</div>
    </div>
  </div>
</div>
```

#### Unit Economics Section
```html
<div class="annual-metrics-section">
  <div class="section-header">
    <h3>Unit Economics - <span id="unit-econ-year-label">2025</span></h3>
  </div>
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-value" id="ltvValue">$0</div>
      <div class="metric-label">Customer LTV</div>
    </div>
    <div class="metric-card">
      <div class="metric-value" id="cacValue">$0</div>
      <div class="metric-label">Customer CAC</div>
    </div>
    <div class="metric-card">
      <div class="metric-value" id="ltvCacRatio">0:1</div>
      <div class="metric-label">LTV:CAC Ratio</div>
    </div>
  </div>
</div>
```

#### Customer Metrics Section
```html
<div class="annual-metrics-section">
  <div class="section-header">
    <h3>Customer Metrics - <span id="customer-year-label">2025</span></h3>
  </div>
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-value" id="totalCustomers">0</div>
      <div class="metric-label">Total Customers</div>
    </div>
    <div class="metric-card">
      <div class="metric-value" id="annualChurnRate">0%</div>
      <div class="metric-label">Annual Churn Rate</div>
    </div>
  </div>
</div>
```

### JavaScript Interface

The existing `updateAnnualDashboard(monthIndex)` function will be reactivated and called from:
1. Initial dashboard load: `updateAnnualDashboard(0)`
2. Time slider input event: `updateAnnualDashboard(this.value)`

### CSS Styling

Extend existing styles with:
```css
.annual-metrics-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 12px;
  border: 1px solid #374151;
}

.section-header h3 {
  color: #e5e7eb;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```

## Data Models

### Annual Metrics Data Structure
```javascript
{
  year: 2025,
  revenue: {
    gross: 1500000,
    costs: 1200000,
    net: 300000,
    margin: 20.0
  },
  unitEconomics: {
    ltv: 2500,
    cac: 500,
    ratio: 5.0
  },
  customers: {
    total: 150,
    churnRate: 8.5
  }
}
```

### Calculation Methods

#### LTV Calculation
```javascript
const avgWeightedGrossMargin = yearProjections.reduce((sum, p) => sum + p.weightedGrossMargin, 0) / yearProjections.length;
const ltv = monthlyChurnRate > 0 ? (avgMonthlyRevenuePerCustomer * avgWeightedGrossMargin) / monthlyChurnRate : 0;
```

#### CAC Calculation
```javascript
const annualAcquisitionCosts = yearProjections.reduce((sum, p) => sum + p.costs.breakdown.totalAcquisitionCosts, 0);
const grossNewClientsThisYear = yearProjections.reduce((sum, p) => sum + p.newClientsAcquired, 0);
const cac = grossNewClientsThisYear > 0 ? annualAcquisitionCosts / grossNewClientsThisYear : 0;
```

## Error Handling

- **Missing Data**: Return 0 or default values for missing projection data
- **Division by Zero**: Check denominators before calculations
- **DOM Elements**: Verify elements exist before setting textContent
- **Invalid Dates**: Handle edge cases in year calculations

## Testing Strategy

### Unit Tests
- Test `updateAnnualDashboard` function with various month indices
- Test calculation methods for LTV, CAC, and profit margins
- Test edge cases (zero values, missing data)

### Integration Tests
- Test time slider interaction with annual metrics updates
- Test initial dashboard load with annual metrics
- Test responsive layout on different screen sizes

### Visual Tests
- Verify consistent styling with existing dashboard components
- Test smooth transitions when metrics update
- Verify proper formatting of currency and percentage values