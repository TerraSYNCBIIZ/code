# Legal Compliance Software - Database Schema

## Firestore Database Schema

This document outlines the Firestore collections, document structures, fields, and relationships that will power the legal compliance software platform.

### Core Collections

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   businesses    │ ──► │     users       │ ◄── │   invitations   │
│                 │     │                 │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         │
         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  requirements   │ ◄── │ questionnaires  │ ──► │    responses    │
│                 │     │                 │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         │
         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   documents     │ ──► │ document_types  │ ◄── │ jurisdictions   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Collection: `businesses`

Stores information about businesses registered on the platform.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Auto-generated business ID |
| `name` | String | Business name |
| `legal_name` | String | Legal business name |
| `entity_type` | String | Business entity type (LLC, Corporation, etc.) |
| `ein` | String | Employer Identification Number (encrypted) |
| `primary_address` | Object | Primary business address |
| `additional_addresses` | Array<Object> | Additional business locations |
| `primary_industry` | String | Primary industry code/category |
| `secondary_industries` | Array<String> | Secondary industry codes/categories |
| `employee_count` | Number | Number of employees |
| `annual_revenue` | String | Annual revenue range |
| `founding_date` | Timestamp | Business founding date |
| `website` | String | Business website URL |
| `phone` | String | Business phone number |
| `email` | String | Business email address |
| `primary_contact_id` | String | Reference to user who is primary contact |
| `status` | String | Business account status (active, suspended, etc.) |
| `subscription_tier` | String | Current subscription level |
| `subscription_status` | String | Subscription status |
| `billing_contact_id` | String | Reference to user who handles billing |
| `payment_method_id` | String | Reference to payment method |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |
| `metadata` | Map | Additional business metadata |

#### Sub-document: `businesses/{businessId}/locations`

Stores detailed information about business locations.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Location ID |
| `name` | String | Location name/identifier |
| `address` | Object | Full address details |
| `phone` | String | Location phone number |
| `manager_id` | String | Reference to user who manages this location |
| `jurisdictions` | Array<String> | List of jurisdiction IDs this location operates in |
| `is_primary` | Boolean | Whether this is the primary business location |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

#### Sub-document: `businesses/{businessId}/departments`

Tracks different departments within a business.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Department ID |
| `name` | String | Department name |
| `description` | String | Department description |
| `head_user_id` | String | Reference to user who heads the department |
| `member_count` | Number | Number of members in department |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

### Collection: `users`

Stores information about users of the platform.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Auto-generated user ID |
| `auth_id` | String | Firebase Auth UID |
| `email` | String | User email address |
| `full_name` | String | User's full name |
| `first_name` | String | User's first name |
| `last_name` | String | User's last name |
| `phone` | String | User phone number |
| `profile_photo_url` | String | Profile photo URL |
| `job_title` | String | User job title |
| `business_id` | String | Reference to user's business |
| `department` | String | User's department |
| `roles` | Array<String> | User roles in the system |
| `permissions` | Array<String> | User-specific permissions |
| `status` | String | Account status (active, inactive, pending) |
| `last_login` | Timestamp | Last login timestamp |
| `mfa_enabled` | Boolean | Whether MFA is enabled |
| `preferred_language` | String | User's preferred language |
| `notification_preferences` | Object | User notification preferences |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |
| `metadata` | Map | Additional user metadata |

#### Sub-document: `users/{userId}/activity_log`

Tracks user activity for audit purposes.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Activity log entry ID |
| `timestamp` | Timestamp | When the activity occurred |
| `action` | String | Action performed |
| `resource_type` | String | Type of resource affected |
| `resource_id` | String | ID of resource affected |
| `description` | String | Description of activity |
| `ip_address` | String | IP address activity came from |
| `user_agent` | String | User agent string |
| `location` | Object | Geo-location data if available |

### Collection: `invitations`

Manages invitations to new users.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Invitation ID |
| `email` | String | Invitee email address |
| `business_id` | String | Business ID invitation is for |
| `inviter_id` | String | User ID who sent invitation |
| `roles` | Array<String> | Roles to assign upon acceptance |
| `permissions` | Array<String> | Permissions to assign |
| `status` | String | Invitation status (pending, accepted, expired) |
| `invitation_code` | String | Unique invitation code |
| `expiration_date` | Timestamp | When invitation expires |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

### Collection: `requirements`

Stores legal compliance requirements applicable to businesses.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Requirement ID |
| `title` | String | Requirement title |
| `description` | String | Detailed description |
| `jurisdiction_id` | String | Reference to jurisdiction |
| `jurisdiction_level` | String | Federal, State, County, City, etc. |
| `authority` | String | Issuing authority |
| `category` | String | Requirement category |
| `subcategory` | String | Requirement subcategory |
| `industry_codes` | Array<String> | Industries this applies to |
| `employee_thresholds` | Array<Number> | Employee thresholds when applicable |
| `revenue_thresholds` | Array<String> | Revenue thresholds when applicable |
| `entity_types` | Array<String> | Entity types this applies to |
| `periodicity` | String | How often requirement must be fulfilled |
| `deadline_type` | String | Fixed or relative deadline |
| `deadline_details` | Object | Structured deadline information |
| `estimated_time` | Number | Estimated time to complete (minutes) |
| `estimated_cost` | Number | Estimated cost to complete |
| `currency` | String | Currency for estimated cost |
| `penalties` | Array<Object> | Possible penalties for non-compliance |
| `required_documents` | Array<String> | Required document types |
| `required_information` | Array<String> | Required information fields |
| `online_filing_available` | Boolean | Whether online filing is available |
| `direct_filing_supported` | Boolean | Whether we support direct filing |
| `filing_url` | String | URL for manual filing |
| `instructions` | String | Filing instructions |
| `last_updated` | Timestamp | When requirement was last updated |
| `effective_date` | Timestamp | When requirement becomes effective |
| `expiration_date` | Timestamp | When requirement expires (if applicable) |
| `metadata` | Map | Additional metadata |

#### Sub-document: `requirements/{requirementId}/versions`

Tracks changes to requirements over time.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Version ID |
| `requirement_id` | String | Parent requirement ID |
| `version_number` | Number | Sequential version number |
| `changes` | Array<Object> | List of changes from previous version |
| `effective_date` | Timestamp | When changes become effective |
| `created_at` | Timestamp | Record creation timestamp |
| `created_by` | String | User or system that created this version |
| `notes` | String | Notes about this version |

### Collection: `business_requirements`

Maps requirements to businesses with compliance status.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Business requirement mapping ID |
| `business_id` | String | Reference to business |
| `requirement_id` | String | Reference to requirement |
| `status` | String | Compliance status |
| `applicable` | Boolean | Whether requirement applies |
| `exempt` | Boolean | Whether business is exempt |
| `exemption_reason` | String | Reason for exemption |
| `exemption_documents` | Array<String> | Supporting exemption documents |
| `assigned_to` | String | User assigned to handle this |
| `next_due_date` | Timestamp | Next due date |
| `last_completed_date` | Timestamp | Last completion date |
| `completion_history` | Array<Object> | History of completions |
| `notes` | String | Notes about this requirement |
| `importance` | String | Priority/importance level |
| `documents` | Array<String> | Related document references |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

### Collection: `questionnaires`

Stores questionnaires used to determine requirement applicability.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Questionnaire ID |
| `title` | String | Questionnaire title |
| `description` | String | Questionnaire description |
| `version` | String | Questionnaire version |
| `category` | String | Questionnaire category |
| `target_entity_type` | String | Target entity type |
| `status` | String | Active, Draft, Archived |
| `estimated_completion_time` | Number | Estimated minutes to complete |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |
| `created_by` | String | User ID who created questionnaire |
| `tags` | Array<String> | Searchable tags |

#### Sub-document: `questionnaires/{questionnaireId}/questions`

Stores questions within a questionnaire.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Question ID |
| `text` | String | Question text |
| `help_text` | String | Additional help text |
| `type` | String | Question type (multiple choice, text, etc.) |
| `options` | Array<Object> | Available options for selection questions |
| `required` | Boolean | Whether answer is required |
| `conditional_display` | Object | Display logic conditions |
| `order` | Number | Display order within questionnaire |
| `requirement_mapping` | Object | How answers map to requirements |
| `validation` | Object | Validation rules for answers |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

### Collection: `responses`

Stores business responses to questionnaires.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Response ID |
| `business_id` | String | Business ID |
| `questionnaire_id` | String | Questionnaire ID |
| `questionnaire_version` | String | Questionnaire version when answered |
| `status` | String | Complete, In Progress, Abandoned |
| `started_at` | Timestamp | When questionnaire was started |
| `completed_at` | Timestamp | When questionnaire was completed |
| `last_updated` | Timestamp | Last update timestamp |
| `completed_by` | String | User ID who completed questionnaire |
| `completion_percentage` | Number | Percentage complete |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

#### Sub-document: `responses/{responseId}/answers`

Stores individual question answers.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Answer ID |
| `question_id` | String | Question ID |
| `value` | Any | Answer value |
| `answered_at` | Timestamp | When question was answered |
| `answered_by` | String | User ID who answered |
| `notes` | String | Optional notes with answer |
| `requirements_triggered` | Array<String> | Requirements triggered by this answer |

### Collection: `documents`

Stores documents uploaded by businesses for compliance purposes.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Document ID |
| `business_id` | String | Business ID |
| `title` | String | Document title |
| `description` | String | Document description |
| `document_type_id` | String | Document type reference |
| `file_path` | String | Storage path |
| `file_name` | String | Original filename |
| `file_size` | Number | File size in bytes |
| `file_type` | String | MIME type |
| `status` | String | Pending, Approved, Rejected |
| `tags` | Array<String> | Searchable tags |
| `requirements` | Array<String> | Related requirement IDs |
| `expiration_date` | Timestamp | Document expiration date if applicable |
| `reminder_days` | Number | Days before expiration to send reminder |
| `uploaded_by` | String | User ID who uploaded |
| `reviewed_by` | String | User ID who reviewed |
| `review_date` | Timestamp | When document was reviewed |
| `review_notes` | String | Notes from review |
| `ai_processed` | Boolean | Whether document was AI processed |
| `ai_extraction_results` | Object | Data extracted by AI |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |
| `metadata` | Map | Additional metadata |

### Collection: `document_types`

Defines types of documents used for compliance.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Document type ID |
| `name` | String | Document type name |
| `description` | String | Document type description |
| `category` | String | Document category |
| `required_fields` | Array<Object> | Fields required in this document |
| `accepted_file_types` | Array<String> | Accepted file extensions |
| `template_available` | Boolean | Whether template is available |
| `template_url` | String | URL to template if available |
| `expiration_required` | Boolean | Whether expiration tracking is required |
| `typical_validity_period` | Number | Typical validity in days |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

### Collection: `jurisdictions`

Stores information about regulatory jurisdictions.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Jurisdiction ID |
| `name` | String | Jurisdiction name |
| `level` | String | Federal, State, County, City, etc. |
| `parent_jurisdiction_id` | String | Parent jurisdiction if applicable |
| `code` | String | Jurisdiction code |
| `country` | String | Country |
| `state` | String | State/Province |
| `county` | String | County/Region |
| `city` | String | City |
| `description` | String | Jurisdiction description |
| `website` | String | Official website |
| `contact_information` | Object | Contact information |
| `timezone` | String | Timezone of jurisdiction |
| `active` | Boolean | Whether jurisdiction is active |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |
| `metadata` | Map | Additional metadata |

### Collection: `filings`

Tracks filing submissions for requirements.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Filing ID |
| `business_id` | String | Business ID |
| `requirement_id` | String | Requirement ID |
| `status` | String | Filing status |
| `filing_method` | String | Electronic, Paper, API, etc. |
| `reference_number` | String | External reference number |
| `submitted_at` | Timestamp | When filing was submitted |
| `submitted_by` | String | User ID who submitted |
| `confirmation_received` | Boolean | Whether confirmation was received |
| `confirmation_date` | Timestamp | When confirmation was received |
| `confirmation_reference` | String | Confirmation reference |
| `documents` | Array<String> | Related document IDs |
| `payment_amount` | Number | Payment amount if applicable |
| `payment_currency` | String | Payment currency |
| `payment_method` | String | Payment method |
| `payment_reference` | String | Payment reference |
| `payment_date` | Timestamp | Payment date |
| `notes` | String | Notes about filing |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

### Collection: `conversations`

Stores AI assistant conversations.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Conversation ID |
| `business_id` | String | Business ID |
| `user_id` | String | User ID |
| `title` | String | Auto-generated title |
| `status` | String | Active, Archived |
| `start_time` | Timestamp | When conversation started |
| `last_message_time` | Timestamp | When last message was sent |
| `message_count` | Number | Number of messages |
| `context` | Object | Conversation context |
| `tags` | Array<String> | Searchable tags |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

#### Sub-document: `conversations/{conversationId}/messages`

Stores messages in a conversation.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Message ID |
| `conversation_id` | String | Conversation ID |
| `sender_type` | String | User or Assistant |
| `sender_id` | String | User ID if applicable |
| `content` | String | Message content |
| `timestamp` | Timestamp | Message timestamp |
| `references` | Array<Object> | Referenced requirements or documents |
| `actions` | Array<Object> | Actions taken by assistant |
| `feedback` | Object | User feedback on message |
| `metadata` | Map | Additional metadata |

### Collection: `audit_logs`

Comprehensive audit logs for security and compliance.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Log entry ID |
| `timestamp` | Timestamp | Event timestamp |
| `business_id` | String | Business ID if applicable |
| `user_id` | String | User ID if applicable |
| `event_type` | String | Type of event |
| `resource_type` | String | Type of resource affected |
| `resource_id` | String | ID of resource affected |
| `action` | String | Action performed |
| `status` | String | Success, Failure, etc. |
| `description` | String | Event description |
| `changes` | Object | Before/after values for changes |
| `ip_address` | String | IP address |
| `user_agent` | String | User agent string |
| `session_id` | String | Session ID |
| `request_id` | String | Request ID |
| `severity` | String | Info, Warning, Error, etc. |
| `metadata` | Map | Additional metadata |

### Collection: `notifications`

Manages system notifications for users.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Notification ID |
| `recipient_id` | String | User ID of recipient |
| `business_id` | String | Business ID |
| `type` | String | Notification type |
| `title` | String | Notification title |
| `body` | String | Notification body |
| `status` | String | Unread, Read, Dismissed |
| `priority` | String | Normal, High, Urgent |
| `action_required` | Boolean | Whether action is required |
| `action_url` | String | URL for user action |
| `resource_type` | String | Related resource type |
| `resource_id` | String | Related resource ID |
| `created_at` | Timestamp | Record creation timestamp |
| `read_at` | Timestamp | When notification was read |
| `expires_at` | Timestamp | When notification expires |

### Collection: `webhooks`

Manages webhook configurations for external integrations.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Webhook ID |
| `business_id` | String | Business ID |
| `name` | String | Webhook name |
| `url` | String | Endpoint URL |
| `events` | Array<String> | Events to trigger webhook |
| `headers` | Map | Custom headers |
| `secret` | String | Webhook secret (hashed) |
| `active` | Boolean | Whether webhook is active |
| `verified` | Boolean | Whether endpoint is verified |
| `failure_count` | Number | Consecutive failures |
| `last_triggered` | Timestamp | When webhook was last triggered |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last update timestamp |

## Indexes

### Single-Field Indexes

- `businesses.name` (ASC)
- `businesses.primary_industry` (ASC)
- `businesses.status` (ASC)
- `users.email` (ASC)
- `users.business_id` (ASC)
- `users.status` (ASC)
- `invitations.email` (ASC)
- `invitations.business_id` (ASC)
- `invitations.status` (ASC)
- `requirements.jurisdiction_id` (ASC)
- `requirements.category` (ASC)
- `requirements.industry_codes` (ASC, ARRAY_CONTAINS)
- `requirements.entity_types` (ASC, ARRAY_CONTAINS)
- `business_requirements.business_id` (ASC)
- `business_requirements.status` (ASC)
- `business_requirements.next_due_date` (ASC)
- `questionnaires.status` (ASC)
- `responses.business_id` (ASC)
- `responses.status` (ASC)
- `documents.business_id` (ASC)
- `documents.status` (ASC)
- `documents.document_type_id` (ASC)
- `documents.expiration_date` (ASC)
- `jurisdictions.level` (ASC)
- `jurisdictions.parent_jurisdiction_id` (ASC)
- `filings.business_id` (ASC)
- `filings.status` (ASC)
- `filings.submitted_at` (ASC)
- `conversations.business_id` (ASC)
- `conversations.user_id` (ASC)
- `audit_logs.timestamp` (ASC)
- `audit_logs.business_id` (ASC)
- `audit_logs.user_id` (ASC)
- `audit_logs.event_type` (ASC)
- `notifications.recipient_id` (ASC)
- `notifications.status` (ASC)
- `webhooks.business_id` (ASC)
- `webhooks.active` (ASC)

### Composite Indexes

- `businesses.status,created_at` (ASC, ASC)
- `users.business_id,status` (ASC, ASC)
- `users.business_id,roles` (ASC, ARRAY_CONTAINS)
- `invitations.business_id,status` (ASC, ASC)
- `requirements.jurisdiction_id,category` (ASC, ASC)
- `requirements.industry_codes,jurisdiction_id` (ARRAY_CONTAINS, ASC)
- `business_requirements.business_id,status` (ASC, ASC)
- `business_requirements.business_id,next_due_date` (ASC, ASC)
- `business_requirements.business_id,assigned_to` (ASC, ASC)
- `responses.business_id,questionnaire_id` (ASC, ASC)
- `responses.business_id,status` (ASC, ASC)
- `documents.business_id,document_type_id` (ASC, ASC)
- `documents.business_id,expiration_date` (ASC, ASC)
- `documents.business_id,status` (ASC, ASC)
- `filings.business_id,status` (ASC, ASC)
- `filings.business_id,requirement_id` (ASC, ASC)
- `filings.business_id,submitted_at` (ASC, DESC)
- `conversations.business_id,last_message_time` (ASC, DESC)
- `audit_logs.business_id,timestamp` (ASC, DESC)
- `audit_logs.user_id,timestamp` (ASC, DESC)
- `audit_logs.resource_type,resource_id` (ASC, ASC)
- `notifications.recipient_id,status` (ASC, ASC)
- `notifications.recipient_id,created_at` (ASC, DESC)

## Security Rules

### Base Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 'admin' in request.auth.token.roles;
    }
    
    function belongsToBusiness(businessId) {
      return isAuthenticated() && 
        request.auth.token.business_id == businessId;
    }
    
    function hasRole(role) {
      return isAuthenticated() && 
        role in request.auth.token.roles;
    }
    
    function isOwnerOf(resource) {
      return isAuthenticated() && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Business rules
    match /businesses/{businessId} {
      allow read: if belongsToBusiness(businessId) || isAdmin();
      allow create: if isAdmin();
      allow update: if belongsToBusiness(businessId) && hasRole('admin') || isAdmin();
      allow delete: if isAdmin();
      
      match /locations/{locationId} {
        allow read: if belongsToBusiness(businessId);
        allow write: if belongsToBusiness(businessId) && hasRole('admin');
      }
      
      match /departments/{departmentId} {
        allow read: if belongsToBusiness(businessId);
        allow write: if belongsToBusiness(businessId) && hasRole('admin');
      }
    }
    
    // User rules
    match /users/{userId} {
      allow read: if request.auth.uid == userId || 
                    belongsToBusiness(resource.data.business_id) && hasRole('admin') || 
                    isAdmin();
      allow create: if isAdmin() || request.auth.uid == userId;
      allow update: if request.auth.uid == userId || 
                      belongsToBusiness(resource.data.business_id) && hasRole('admin') || 
                      isAdmin();
      allow delete: if isAdmin();
      
      match /activity_log/{logId} {
        allow read: if request.auth.uid == userId || 
                      belongsToBusiness(resource.data.business_id) && hasRole('admin') || 
                      isAdmin();
        allow create: if request.auth.uid == userId;
        allow update, delete: if false; // Immutable logs
      }
    }
    
    // More rules for other collections...
  }
}
```

## Data Relationships

### Business Relationships

- `businesses` 1:N `users` - A business has many users
- `businesses` 1:N `locations` - A business has many locations
- `businesses` 1:N `departments` - A business has many departments
- `businesses` 1:N `business_requirements` - A business has many requirements
- `businesses` 1:N `documents` - A business has many documents
- `businesses` 1:N `responses` - A business has many questionnaire responses

### Requirement Relationships

- `requirements` N:M `businesses` (through `business_requirements`) - Requirements apply to many businesses
- `requirements` N:1 `jurisdictions` - Requirements belong to jurisdictions
- `requirements` 1:N `requirement_versions` - Requirements have version history
- `requirements` N:M `document_types` - Requirements need various document types

### User Relationships

- `users` N:1 `businesses` - Users belong to a business
- `users` 1:N `activity_log` - Users generate activity logs
- `users` 1:N `conversations` - Users have conversations with AI
- `users` 1:N `documents` (as uploader) - Users upload documents
- `users` 1:N `responses` (as responder) - Users complete questionnaires

## Data Migration Strategy

### Initial Data Loading

1. **Jurisdiction Data**
   - Load federal jurisdictions
   - Load state jurisdictions
   - Load county jurisdictions
   - Load city jurisdictions
   - Set up jurisdiction hierarchies

2. **Regulatory Requirements**
   - Import federal requirements
   - Import state requirements
   - Tag with applicable industries
   - Set up deadlines and periodicities
   - Link to document types

3. **Document Types**
   - Create standard document type library
   - Set up templates for common documents
   - Configure required fields
   - Set up validity periods

### Ongoing Data Updates

1. **Regulatory Updates Process**
   - Monitor regulatory changes
   - Create requirement versions for changes
   - Update affected businesses
   - Send notifications for significant changes

2. **Data Quality Management**
   - Regular data integrity checks
   - Duplicate detection and resolution
   - Consistency validation
   - Expert review workflow

## Data Security Measures

### Sensitive Data Handling

- **PII Protection**
  - Encrypted EIN/Tax ID storage
  - Encrypted SSN storage
  - Minimal PII collection

- **Document Security**
  - File encryption at rest
  - Secure access controls
  - Document watermarking option
  - View-only access when appropriate

- **Audit Logging**
  - Comprehensive data access logs
  - Change tracking
  - User action history
  - Security event monitoring

### Data Retention Policies

- **User Data**
  - Account data: Retained while active + 2 years
  - Activity logs: 1 year

- **Business Data**
  - Core business data: Retained while active + 7 years
  - Document retention based on requirement rules

- **Compliance Data**
  - Filing records: 7 years minimum
  - Submission confirmations: 7 years minimum

## Performance Considerations

### Scaling Strategy

- **Collection Sharding**
  - Shard audit logs by date
  - Shard notification data
  - Consider sharding for high-volume businesses

- **Query Optimization**
  - Index for common query patterns
  - Denormalize for frequent joins
  - Composite indexes for filtered queries

- **Caching Strategy**
  - Cache regulatory data
  - Cache jurisdiction hierarchies
  - Cache document templates
  - Use Firebase Remote Config for reference data

### Data Limits Awareness

- **Firestore Limits**
  - Document size: 1 MB maximum
  - Collection query results: 1 MB maximum
  - Read rate: Plan for scaling beyond 10K/second
  - Write rate: Plan for scaling beyond 5K/second

- **Mitigation Strategies**
  - Large file handling via Cloud Storage
  - Chunking for large datasets
  - Pagination for large result sets
  - Rate limiting for API consumers 