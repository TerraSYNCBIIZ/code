# Requirements Document

## Introduction

This feature enhancement will restore and improve the annual financial metrics dashboard that displays key business metrics below the main growth trajectory chart. The annual metrics will update dynamically based on the time slider position, showing annualized data for the selected year.

## Requirements

### Requirement 1

**User Story:** As a financial analyst, I want to see annual financial metrics below the growth chart, so that I can understand the yearly performance and key business indicators.

#### Acceptance Criteria

1. WHEN the dashboard loads THEN the system SHALL display an annual metrics section below the growth trajectory chart
2. WHEN the time slider is moved THEN the system SHALL update all annual metrics to reflect the selected year
3. WHEN displaying annual metrics THEN the system SHALL show the current year being analyzed prominently

### Requirement 2

**User Story:** As a business stakeholder, I want to see key revenue metrics for each year, so that I can understand our financial performance.

#### Acceptance Criteria

1. WHEN viewing annual metrics THEN the system SHALL display annual gross revenue
2. WHEN viewing annual metrics THEN the system SHALL display annual total costs
3. WHEN viewing annual metrics THEN the system SHALL display annual net profit
4. WHEN viewing annual metrics THEN the system SHALL display profit margin percentage
5. WHEN values are displayed THEN the system SHALL format currency values appropriately (K, M notation)

### Requirement 3

**User Story:** As a business analyst, I want to see unit economics metrics (LTV and CAC), so that I can evaluate customer acquisition efficiency.

#### Acceptance Criteria

1. WHEN viewing annual metrics THEN the system SHALL display Customer Lifetime Value (LTV)
2. WHEN viewing annual metrics THEN the system SHALL display Customer Acquisition Cost (CAC)
3. WHEN viewing annual metrics THEN the system SHALL display LTV:CAC ratio
4. WHEN calculating LTV THEN the system SHALL use weighted gross margin and churn rate for the selected year
5. WHEN calculating CAC THEN the system SHALL use total acquisition costs divided by new clients acquired

### Requirement 4

**User Story:** As a growth analyst, I want to see customer metrics for each year, so that I can understand customer retention and growth patterns.

#### Acceptance Criteria

1. WHEN viewing annual metrics THEN the system SHALL display total customers at year end
2. WHEN viewing annual metrics THEN the system SHALL display annual churn rate percentage
3. WHEN calculating churn rate THEN the system SHALL use average customers over the period for accurate percentage calculation

### Requirement 5

**User Story:** As a user, I want the annual metrics to be visually organized and easy to read, so that I can quickly understand the key information.

#### Acceptance Criteria

1. WHEN displaying annual metrics THEN the system SHALL organize metrics into logical sections (Revenue, Unit Economics, Customer Metrics)
2. WHEN displaying metrics THEN the system SHALL use consistent card-based layout matching the existing design
3. WHEN displaying the current year THEN the system SHALL highlight it prominently in each section
4. WHEN metrics update THEN the system SHALL provide smooth transitions without jarring layout changes