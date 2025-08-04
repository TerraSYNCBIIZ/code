# Requirements Database Schema for Tennessee LLC Compliance

This document outlines the database schema for storing comprehensive compliance requirements for LLCs in Tennessee, specifically focusing on Knox County and Knoxville. This schema is designed to power the timeline-based visualization in the legal compliance software.

## Core Tables

### `jurisdictions`
Stores information about different jurisdictional levels.

```
Table: jurisdictions
- jurisdiction_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- level: ENUM('federal', 'state', 'county', 'city', 'special_district') NOT NULL
- parent_jurisdiction_id: UUID FOREIGN KEY REFERENCES jurisdictions(jurisdiction_id)
- code: VARCHAR(50) NOT NULL
- description: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `business_types`
Stores different business entity types.

```
Table: business_types
- business_type_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- code: VARCHAR(50) NOT NULL
- description: TEXT
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `industries`
Stores industry classifications.

```
Table: industries
- industry_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- naics_code: VARCHAR(10)
- parent_industry_id: UUID FOREIGN KEY REFERENCES industries(industry_id)
- description: TEXT
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `requirement_categories`
Categorizes requirements for better organization and filtering.

```
Table: requirement_categories
- category_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- code: VARCHAR(50) NOT NULL
- description: TEXT
- parent_category_id: UUID FOREIGN KEY REFERENCES requirement_categories(category_id)
- color_code: VARCHAR(10)
- icon: VARCHAR(50)
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `agencies`
Tracks government agencies responsible for requirements.

```
Table: agencies
- agency_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- acronym: VARCHAR(20)
- jurisdiction_id: UUID FOREIGN KEY REFERENCES jurisdictions(jurisdiction_id)
- website: VARCHAR(255)
- phone: VARCHAR(20)
- email: VARCHAR(255)
- address: TEXT
- description: TEXT
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `requirements`
Core table for all compliance requirements.

```
Table: requirements
- requirement_id: UUID PRIMARY KEY
- title: VARCHAR(255) NOT NULL
- short_title: VARCHAR(100)
- description: TEXT NOT NULL
- category_id: UUID FOREIGN KEY REFERENCES requirement_categories(category_id)
- jurisdiction_id: UUID FOREIGN KEY REFERENCES jurisdictions(jurisdiction_id)
- agency_id: UUID FOREIGN KEY REFERENCES agencies(agency_id)
- is_initial_filing: BOOLEAN DEFAULT FALSE
- is_recurring: BOOLEAN DEFAULT FALSE
- has_variable_deadline: BOOLEAN DEFAULT FALSE
- applies_to_all_businesses: BOOLEAN DEFAULT FALSE
- required_for_operation: BOOLEAN DEFAULT FALSE
- penalty_description: TEXT
- cost_description: TEXT
- estimated_time_minutes: INTEGER
- difficulty_level: ENUM('simple', 'moderate', 'complex') DEFAULT 'moderate'
- help_text: TEXT
- external_url: VARCHAR(255)
- is_active: BOOLEAN DEFAULT TRUE
- legal_authority: TEXT
- last_updated_date: DATE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `requirement_deadlines`
Manages complex deadline rules for requirements.

```
Table: requirement_deadlines
- deadline_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- deadline_type: ENUM('fixed_date', 'days_after_event', 'days_before_event', 'monthly', 'quarterly', 'annually', 'custom') NOT NULL
- reference_date: DATE
- days_offset: INTEGER
- month: INTEGER
- day: INTEGER
- custom_rule: TEXT
- recurrence_pattern: ENUM('none', 'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'custom')
- recurrence_interval: INTEGER DEFAULT 1
- reference_event: VARCHAR(255)
- deadline_description: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `forms`
Records forms associated with requirements.

```
Table: forms
- form_id: UUID PRIMARY KEY
- form_number: VARCHAR(50) NOT NULL
- title: VARCHAR(255) NOT NULL
- description: TEXT
- agency_id: UUID FOREIGN KEY REFERENCES agencies(agency_id)
- url: VARCHAR(255)
- instructions_url: VARCHAR(255)
- fillable_pdf_available: BOOLEAN DEFAULT FALSE
- online_submission_available: BOOLEAN DEFAULT FALSE
- estimated_completion_time_minutes: INTEGER
- version: VARCHAR(20)
- effective_date: DATE
- expiration_date: DATE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `requirement_forms`
Junction table linking requirements to forms.

```
Table: requirement_forms
- requirement_form_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- form_id: UUID FOREIGN KEY REFERENCES forms(form_id)
- is_primary: BOOLEAN DEFAULT FALSE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `fees`
Stores fee information for requirements.

```
Table: fees
- fee_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- amount: DECIMAL(10,2) NOT NULL
- description: VARCHAR(255)
- calculation_method: ENUM('fixed', 'percentage', 'tiered', 'formula', 'variable') DEFAULT 'fixed'
- calculation_rule: TEXT
- is_recurring: BOOLEAN DEFAULT FALSE
- recurrence_period: ENUM('monthly', 'quarterly', 'annually', 'biennial', 'triennial', 'custom')
- currency: VARCHAR(3) DEFAULT 'USD'
- effective_date: DATE
- expiration_date: DATE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Applicability Rules

### `applicability_conditions`
Defines when requirements apply to businesses.

```
Table: applicability_conditions
- condition_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- condition_type: ENUM('business_type', 'jurisdiction', 'employee_count', 'revenue', 'industry', 'activity', 'location_type', 'custom') NOT NULL
- operator: ENUM('equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'not_contains', 'starts_with', 'ends_with', 'between', 'in', 'not_in', 'exists', 'not_exists', 'custom') NOT NULL
- value: TEXT
- secondary_value: TEXT
- logic_group: VARCHAR(50)
- is_required_condition: BOOLEAN DEFAULT TRUE
- description: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `business_activities`
Tracks specific business activities that trigger requirements.

```
Table: business_activities
- activity_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- description: TEXT
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `requirement_activities`
Junction table linking requirements to business activities.

```
Table: requirement_activities
- requirement_activity_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- activity_id: UUID FOREIGN KEY REFERENCES business_activities(activity_id)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `business_type_requirements`
Junction table linking requirements to business types.

```
Table: business_type_requirements
- business_type_requirement_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- business_type_id: UUID FOREIGN KEY REFERENCES business_types(business_type_id)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `industry_requirements`
Junction table linking requirements to industries.

```
Table: industry_requirements
- industry_requirement_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- industry_id: UUID FOREIGN KEY REFERENCES industries(industry_id)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Timeline Generation and Management

### `requirement_dependencies`
Defines dependencies between requirements.

```
Table: requirement_dependencies
- dependency_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- depends_on_requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- dependency_type: ENUM('blocks', 'suggests', 'related', 'alternative', 'prerequisite') NOT NULL
- description: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `requirement_steps`
Breaks down requirements into actionable steps.

```
Table: requirement_steps
- step_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- sequence_number: INTEGER NOT NULL
- title: VARCHAR(255) NOT NULL
- description: TEXT
- estimated_time_minutes: INTEGER
- is_required: BOOLEAN DEFAULT TRUE
- help_text: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `document_requirements`
Tracks documents needed for compliance requirements.

```
Table: document_requirements
- document_requirement_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- document_name: VARCHAR(255) NOT NULL
- document_description: TEXT
- is_required: BOOLEAN DEFAULT TRUE
- acceptable_formats: VARCHAR(255)
- retention_period_years: INTEGER
- sample_available: BOOLEAN DEFAULT FALSE
- sample_url: VARCHAR(255)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## User-Specific Data

### `businesses`
Stores businesses using the system.

```
Table: businesses
- business_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- business_type_id: UUID FOREIGN KEY REFERENCES business_types(business_type_id)
- formation_date: DATE
- fiscal_year_end_month: INTEGER
- fiscal_year_end_day: INTEGER
- ein: VARCHAR(20)
- state_tax_id: VARCHAR(50)
- primary_industry_id: UUID FOREIGN KEY REFERENCES industries(industry_id)
- employee_count: INTEGER
- annual_revenue: DECIMAL(15,2)
- address_line1: VARCHAR(255)
- address_line2: VARCHAR(255)
- city: VARCHAR(100)
- state: VARCHAR(50)
- zip_code: VARCHAR(20)
- county: VARCHAR(100)
- country: VARCHAR(100) DEFAULT 'USA'
- website: VARCHAR(255)
- email: VARCHAR(255)
- phone: VARCHAR(20)
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `business_answers`
Stores questionnaire answers for businesses.

```
Table: business_answers
- answer_id: UUID PRIMARY KEY
- business_id: UUID FOREIGN KEY REFERENCES businesses(business_id)
- question_id: VARCHAR(100) NOT NULL
- answer_value: TEXT
- answer_type: ENUM('text', 'number', 'boolean', 'date', 'selection', 'multiple_selection')
- confidence_score: DECIMAL(5,2)
- source: ENUM('user_input', 'system_default', 'imported', 'calculated', 'ai_suggestion')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `business_timeline_items`
Specific timeline items for each business.

```
Table: business_timeline_items
- timeline_item_id: UUID PRIMARY KEY
- business_id: UUID FOREIGN KEY REFERENCES businesses(business_id)
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- title: VARCHAR(255) NOT NULL
- description: TEXT
- due_date: DATE
- start_date: DATE
- completion_date: DATE
- status: ENUM('not_started', 'in_progress', 'completed', 'overdue', 'waived', 'not_applicable') DEFAULT 'not_started'
- priority: ENUM('critical', 'high', 'medium', 'low') DEFAULT 'medium'
- assigned_to_user_id: VARCHAR(100)
- is_recurring: BOOLEAN DEFAULT FALSE
- recurrence_pattern: TEXT
- next_occurrence_id: UUID REFERENCES business_timeline_items(timeline_item_id)
- parent_item_id: UUID REFERENCES business_timeline_items(timeline_item_id)
- notes: TEXT
- custom_fields: JSONB
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `business_documents`
Tracks documents uploaded by businesses.

```
Table: business_documents
- document_id: UUID PRIMARY KEY
- business_id: UUID FOREIGN KEY REFERENCES businesses(business_id)
- timeline_item_id: UUID FOREIGN KEY REFERENCES business_timeline_items(timeline_item_id)
- document_requirement_id: UUID FOREIGN KEY REFERENCES document_requirements(document_requirement_id)
- file_name: VARCHAR(255) NOT NULL
- file_type: VARCHAR(50)
- file_size: INTEGER
- file_url: VARCHAR(255)
- storage_path: VARCHAR(255)
- uploaded_by: VARCHAR(100)
- upload_date: TIMESTAMP
- description: TEXT
- metadata: JSONB
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `timeline_item_steps`
Tracks progress on individual steps for timeline items.

```
Table: timeline_item_steps
- item_step_id: UUID PRIMARY KEY
- timeline_item_id: UUID FOREIGN KEY REFERENCES business_timeline_items(timeline_item_id)
- step_id: UUID FOREIGN KEY REFERENCES requirement_steps(step_id)
- status: ENUM('not_started', 'in_progress', 'completed', 'skipped') DEFAULT 'not_started'
- completed_date: TIMESTAMP
- completed_by: VARCHAR(100)
- notes: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Supporting Tables

### `notifications`
Manages notifications for upcoming deadlines.

```
Table: notifications
- notification_id: UUID PRIMARY KEY
- business_id: UUID FOREIGN KEY REFERENCES businesses(business_id)
- timeline_item_id: UUID FOREIGN KEY REFERENCES business_timeline_items(timeline_item_id)
- notification_type: ENUM('deadline_approaching', 'overdue', 'status_change', 'assignment', 'document_required', 'custom') NOT NULL
- title: VARCHAR(255) NOT NULL
- message: TEXT NOT NULL
- priority: ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium'
- status: ENUM('pending', 'sent', 'read', 'actioned', 'dismissed') DEFAULT 'pending'
- scheduled_date: TIMESTAMP
- sent_date: TIMESTAMP
- read_date: TIMESTAMP
- actioned_date: TIMESTAMP
- recipient_user_id: VARCHAR(100)
- channel: ENUM('email', 'in_app', 'sms', 'push', 'all') DEFAULT 'all'
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `notification_templates`
Templates for system notifications.

```
Table: notification_templates
- template_id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- subject: VARCHAR(255)
- body: TEXT NOT NULL
- notification_type: ENUM('deadline_approaching', 'overdue', 'status_change', 'assignment', 'document_required', 'custom') NOT NULL
- days_before_due: INTEGER
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `timeline_views`
Stores user-defined timeline views.

```
Table: timeline_views
- view_id: UUID PRIMARY KEY
- business_id: UUID FOREIGN KEY REFERENCES businesses(business_id)
- name: VARCHAR(255) NOT NULL
- description: TEXT
- is_default: BOOLEAN DEFAULT FALSE
- filter_criteria: JSONB
- sort_order: VARCHAR(50)
- display_options: JSONB
- created_by: VARCHAR(100)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `compliance_changes`
Tracks regulatory changes over time.

```
Table: compliance_changes
- change_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- change_type: ENUM('new_requirement', 'modified', 'deadline_change', 'fee_change', 'form_update', 'sunset', 'replaced') NOT NULL
- change_date: DATE NOT NULL
- description: TEXT NOT NULL
- source: VARCHAR(255)
- effective_date: DATE
- reference_url: VARCHAR(255)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `help_resources`
Provides help resources for requirements.

```
Table: help_resources
- resource_id: UUID PRIMARY KEY
- requirement_id: UUID FOREIGN KEY REFERENCES requirements(requirement_id)
- title: VARCHAR(255) NOT NULL
- description: TEXT
- resource_type: ENUM('article', 'video', 'webinar', 'faq', 'guide', 'form_instructions', 'external_link') NOT NULL
- url: VARCHAR(255)
- content: TEXT
- is_featured: BOOLEAN DEFAULT FALSE
- is_active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Sample Initial Data

### Tennessee LLC-Specific Jurisdictions
```
INSERT INTO jurisdictions (jurisdiction_id, name, level, code, description) VALUES
(gen_random_uuid(), 'United States', 'federal', 'US', 'Federal government of the United States'),
(gen_random_uuid(), 'Tennessee', 'state', 'TN', 'State of Tennessee'),
(gen_random_uuid(), 'Knox County', 'county', 'TN-KNOX', 'Knox County, Tennessee'),
(gen_random_uuid(), 'Knoxville', 'city', 'TN-KNOX-KNOXVILLE', 'City of Knoxville, Tennessee');
```

### Common Business Types
```
INSERT INTO business_types (business_type_id, name, code, description) VALUES
(gen_random_uuid(), 'Limited Liability Company', 'LLC', 'Standard Limited Liability Company'),
(gen_random_uuid(), 'Single-Member LLC', 'SMLLC', 'LLC with only one member'),
(gen_random_uuid(), 'Multi-Member LLC', 'MMLLC', 'LLC with multiple members'),
(gen_random_uuid(), 'Professional LLC', 'PLLC', 'LLC for licensed professionals'),
(gen_random_uuid(), 'Series LLC', 'SLLC', 'LLC with segregated series of assets');
```

### Requirement Categories
```
INSERT INTO requirement_categories (category_id, name, code, description, color_code) VALUES
(gen_random_uuid(), 'Formation', 'FORM', 'Initial business formation requirements', '#4285F4'),
(gen_random_uuid(), 'Tax Registration', 'TAXREG', 'Tax account setup and registration', '#EA4335'),
(gen_random_uuid(), 'Annual Report', 'ANNREP', 'Periodic reporting requirements', '#FBBC05'),
(gen_random_uuid(), 'Business License', 'BIZLIC', 'Business licensing requirements', '#34A853'),
(gen_random_uuid(), 'Tax Filing', 'TAXFIL', 'Tax return filing requirements', '#EA4335'),
(gen_random_uuid(), 'Employment', 'EMPLOY', 'Employment-related requirements', '#4285F4'),
(gen_random_uuid(), 'Industry-Specific', 'INDSPEC', 'Requirements for specific industries', '#FBBC05'),
(gen_random_uuid(), 'Property', 'PROP', 'Property-related filings and taxes', '#34A853');
```

### Sample Requirements
```
INSERT INTO requirements (requirement_id, title, description, category_id, jurisdiction_id, agency_id, is_initial_filing, is_recurring) VALUES
(gen_random_uuid(), 'File Articles of Organization', 'Submit Articles of Organization to form an LLC in Tennessee', 
  (SELECT category_id FROM requirement_categories WHERE code = 'FORM'),
  (SELECT jurisdiction_id FROM jurisdictions WHERE code = 'TN'),
  (SELECT agency_id FROM agencies WHERE name = 'Tennessee Secretary of State'),
  TRUE, FALSE),
  
(gen_random_uuid(), 'Obtain Federal EIN', 'Apply for a Federal Employer Identification Number from the IRS', 
  (SELECT category_id FROM requirement_categories WHERE code = 'TAXREG'),
  (SELECT jurisdiction_id FROM jurisdictions WHERE code = 'US'),
  (SELECT agency_id FROM agencies WHERE name = 'Internal Revenue Service'),
  TRUE, FALSE),
  
(gen_random_uuid(), 'File Annual Report', 'File annual report with the Tennessee Secretary of State', 
  (SELECT category_id FROM requirement_categories WHERE code = 'ANNREP'),
  (SELECT jurisdiction_id FROM jurisdictions WHERE code = 'TN'),
  (SELECT agency_id FROM agencies WHERE name = 'Tennessee Secretary of State'),
  FALSE, TRUE);
``` 