# Legal Compliance Software - Detailed Data Schema

## Firestore Database Schema

### businesses Collection

```
businesses/{businessId}/
  profile: {
    name: string,
    legalName: string,
    entityType: "sole_proprietorship" | "llc" | "c_corp" | "s_corp" | "partnership" | "nonprofit",
    ein: string, // Encrypted
    foundedDate: timestamp,
    website: string,
    phoneNumber: string,
    email: string,
    primaryAddress: {
      street: string,
      unit: string,
      city: string,
      county: string,
      state: string,
      zipCode: string,
      country: string,
      latitude: number, // For jurisdiction determination
      longitude: number,
      isMailingAddress: boolean,
      isPhysicalLocation: boolean
    },
    industry: {
      primaryNaicsCode: string,
      primarySicCode: string,
      description: string,
      subIndustries: array<string>
    },
    employeeCount: number,
    annualRevenue: string, // Ranges like "0-100k", "100k-1M", etc.
    taxFilingMonths: array<number>, // 1-12 representing months
    fiscalYearEnd: string, // "MM-DD"
    subscriptionTier: "starter" | "professional" | "enterprise",
    subscriptionStatus: "active" | "past_due" | "canceled" | "trial",
    subscriptionRenewalDate: timestamp,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  
  locations/{locationId}: {
    name: string,
    isPrimary: boolean,
    address: {
      street: string,
      unit: string,
      city: string,
      county: string,
      state: string,
      zipCode: string,
      country: string,
      latitude: number,
      longitude: number
    },
    employeeCount: number,
    operationStartDate: timestamp,
    businessActivities: array<string>,
    specialPermits: array<string>,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  
  employees/{userId}: {
    displayName: string,
    email: string,
    role: "owner" | "admin" | "staff",
    permissions: {
      canViewDocuments: boolean,
      canEditDocuments: boolean,
      canSubmitFilings: boolean,
      canManageBilling: boolean,
      canAddOtherUsers: boolean
    },
    jobTitle: string,
    departmentId: string,
    invitationStatus: "pending" | "accepted" | "rejected",
    lastLogin: timestamp,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  
  questionnaire_responses/{questionnaireId}: {
    questionId: string,
    response: any, // Could be string, boolean, array, or object
    timestamp: timestamp,
    version: string // Questionnaire version for tracking changes
  }
}
```

### compliance_requirements Collection

```
compliance_requirements/
  federal/
    {requirementId}: {
      title: string,
      description: string,
      shortDescription: string,
      applicabilityRules: array<{
        entityTypes: array<string>,
        employeeThresholds: array<{min: number, max: number}>,
        industries: array<string>,
        excludedIndustries: array<string>,
        states: array<string>, // If applicable to specific states only
        revenueThresholds: array<{min: number, max: number}>,
        businessActivities: array<string>,
        conditions: string // Free text for complex conditions
      }>,
      filingFrequency: "one_time" | "annual" | "quarterly" | "monthly" | "custom",
      customFrequency: {
        months: array<number>, // If filingFrequency is "custom"
        daysOfMonth: array<number>
      },
      deadlines: array<{
        name: string,
        dueDate: string, // "MM-DD" format or expression like "last_day_of_quarter"
        gracePeriod: number // Days
      }>,
      estimatedTimeToComplete: number, // Minutes
      estimatedCost: {
        min: number,
        max: number,
        currency: string,
        variableCostFactors: array<string>
      },
      requiredDocuments: array<{
        name: string,
        description: string,
        templateAvailable: boolean,
        templateId: string
      }>,
      formNumbers: array<string>,
      agencyInfo: {
        name: string,
        website: string,
        phoneNumber: string,
        emailAddress: string
      },
      digitalSubmissionAvailable: boolean,
      digitalSubmissionUrl: string,
      penalties: array<{
        description: string,
        amount: number,
        calculationType: "fixed" | "percentage" | "daily_accumulation",
        calculationBase: string // What the percentage is based on
      }>,
      relatedRequirements: array<string>, // IDs of related requirements
      tags: array<string>,
      lastUpdated: timestamp,
      effectiveDate: timestamp,
      expirationDate: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  
  states/{stateId}/
    {requirementId}: {
      // Same schema as federal plus state-specific fields
      countySpecific: boolean, // Whether counties can have additional requirements
      citySpecific: boolean, // Whether cities can have additional requirements
      supersededFederalRequirements: array<string> // Federal requirements this replaces
    }
  
  states/{stateId}/counties/{countyId}/
    {requirementId}: {
      // Same schema as state plus county-specific fields
      stateRequirementReferences: array<string> // State requirements this extends
    }
  
  states/{stateId}/cities/{cityId}/
    {requirementId}: {
      // Same schema as state/county plus city-specific fields
      countyRequirementReferences: array<string>, // County requirements this extends
      stateRequirementReferences: array<string> // State requirements this extends
    }
```

### user_requirements Collection

```
user_requirements/{businessId}/
  {requirementId}: {
    requirementReference: string, // Reference to the original requirement
    status: "not_started" | "in_progress" | "submitted" | "completed" | "not_applicable" | "overdue",
    applicabilityReason: string,
    priority: "critical" | "high" | "medium" | "low",
    assignedTo: string, // User ID
    notes: string,
    customDeadline: timestamp, // If different from standard
    lastUpdatedStatus: timestamp,
    filingHistory: array<{
      status: string,
      timestamp: timestamp,
      userId: string,
      notes: string
    }>,
    documents: array<{
      storageRef: string,
      fileName: string,
      uploadDate: timestamp,
      uploadedBy: string,
      status: "draft" | "final" | "submitted" | "rejected"
    }>,
    nextDeadline: timestamp,
    reminderSettings: {
      enabledChannels: {
        email: boolean,
        sms: boolean,
        inApp: boolean,
        push: boolean
      },
      reminderDays: array<number> // Days before deadline
    },
    automationEnabled: boolean, // Whether to use auto-filing
    createdAt: timestamp,
    updatedAt: timestamp
  }
```

### submissions Collection

```
submissions/{businessId}/
  {submissionId}: {
    requirementId: string,
    status: "preparing" | "pending" | "processing" | "completed" | "rejected" | "error",
    submissionMethod: "electronic" | "mail" | "in_person" | "third_party",
    submissionDate: timestamp,
    confirmationNumber: string,
    agencyResponse: {
      received: boolean,
      receivedDate: timestamp,
      status: string,
      message: string,
      attachments: array<{
        name: string,
        storageRef: string
      }>
    },
    paymentInfo: {
      amount: number,
      currency: string,
      paymentMethod: string,
      transactionId: string,
      receipt: string // Storage reference
    },
    documents: array<{
      originalName: string,
      generatedName: string,
      storageRef: string,
      pages: number,
      size: number // In bytes
    }>,
    submittedBy: string, // User ID
    rejectionDetails: {
      reason: string,
      correctiveActions: string,
      resubmissionDeadline: timestamp
    },
    processingTimeInSeconds: number,
    followupDeadline: timestamp,
    followupRequired: boolean,
    followupInstructions: string,
    createdAt: timestamp,
    updatedAt: timestamp
  }
```

## Cloud Storage Structure

```
businesses/{businessId}/
  profile/
    logo.{png|jpg|svg}
    business_license.{pdf|jpg|png}
    articles_of_incorporation.pdf
    operating_agreement.pdf
  
  documents/
    {categoryId}/
      {documentId}.{pdf|docx|jpg|png}
  
  submissions/
    {requirementId}/
      {submissionId}/
        {documentId}.{pdf|docx|jpg|png}
        receipt.pdf
        confirmation.pdf
  
  verifications/
    identity/
      {verificationId}.{jpg|png|pdf}
    address/
      {verificationId}.{jpg|png|pdf}

templates/
  forms/
    federal/
      {formId}/
        template.{pdf|docx}
        instructions.pdf
        sample.pdf
    
    state/{stateId}/
      {formId}/
        template.{pdf|docx}
        instructions.pdf
        sample.pdf
    
    county/{stateId}/{countyId}/
      {formId}/
        template.{pdf|docx}
        instructions.pdf
        sample.pdf
    
    city/{stateId}/{cityId}/
      {formId}/
        template.{pdf|docx}
        instructions.pdf
        sample.pdf
  
  guides/
    industry/{industryId}/
      {guideId}.pdf
    
    jurisdiction/{jurisdictionType}/{jurisdictionId}/
      {guideId}.pdf
```

## Firebase Authentication User Properties

```
User {
  uid: string,
  email: string,
  displayName: string,
  phoneNumber: string,
  photoURL: string,
  emailVerified: boolean,
  
  customClaims: {
    role: "system_admin" | "business_owner" | "business_admin" | "staff",
    businessId: string,
    subscriptionTier: "starter" | "professional" | "enterprise",
    creationDate: timestamp,
    lastPaymentDate: timestamp,
    multiBusinessAccess: boolean
  },
  
  multiFactor: {
    enrolled: boolean,
    enrollmentDate: timestamp
  }
}
```

## Real-time Notification Schema

```
notifications/{businessId}/
  {notificationId}: {
    type: "deadline" | "submission_status" | "requirement_change" | "system" | "billing",
    title: string,
    message: string,
    severity: "info" | "warning" | "critical",
    requirementId: string,
    submissionId: string,
    read: boolean,
    readBy: array<string>, // User IDs
    readDate: timestamp,
    actionRequired: boolean,
    actionLink: string, // Deep link to relevant section
    expirationDate: timestamp,
    sentVia: {
      inApp: boolean,
      email: boolean,
      sms: boolean,
      push: boolean
    },
    createdAt: timestamp
  }
```

## AI Model Training Data Schema

```
aiTrainingData/
  requirementIdentification/
    {entryId}: {
      businessProfile: {
        entityType: string,
        industry: string,
        employeeCount: number,
        location: {
          state: string,
          county: string,
          city: string
        },
        businessActivities: array<string>
      },
      identifiedRequirements: array<string>, // Requirement IDs
      manuallyVerified: boolean,
      accuracy: number, // 0-1
      feedbackNotes: string,
      modelVersion: string,
      createdAt: timestamp
    }
  
  documentAnalysis/
    {entryId}: {
      documentType: string,
      documentRef: string, // Storage reference
      extractedFields: object, // Key-value pairs of extracted data
      groundTruth: object, // Manually verified data
      accuracy: number, // 0-1
      processingTimeMs: number,
      modelVersion: string,
      createdAt: timestamp
    }
  
  regulationSummarization/
    {entryId}: {
      originalText: string,
      simplifiedText: string,
      regulationId: string,
      userRating: number, // 1-5
      complexity: {
        original: number, // Readability score
        simplified: number
      },
      modelVersion: string,
      createdAt: timestamp
    }
```

## Timeline-Specific Data Structures

### timeline_items Collection

```
timeline_items/{businessId}/
  {itemId}: {
    title: string,
    description: string,
    shortDescription: string,
    itemType: "requirement" | "task" | "deadline" | "milestone" | "custom",
    
    // Dates
    dueDate: timestamp,
    startDate: timestamp, // Optional start for range items
    completedDate: timestamp,
    
    // Status information
    status: "not_started" | "in_progress" | "completed" | "overdue" | "waived",
    completionPercentage: number, // 0-100
    lastStatusUpdate: timestamp,
    statusUpdateHistory: array<{
      status: string,
      timestamp: timestamp,
      updatedBy: string, // User ID
      notes: string
    }>,
    
    // Classification
    priority: "critical" | "high" | "medium" | "low",
    category: "tax" | "license" | "permit" | "registration" | "report" | "meeting" | "custom",
    tags: array<string>,
    
    // Jurisdiction and source
    jurisdiction: {
      level: "federal" | "state" | "county" | "city",
      name: string,
      code: string
    },
    
    // Relations
    requirementId: string, // Reference to original requirement if applicable
    relatedItems: array<string>, // Other timeline item IDs
    dependencies: array<{
      itemId: string,
      type: "blocks" | "requires" | "suggested_before"
    }>,
    
    // Assignments
    assignedTo: string, // User ID
    assignmentHistory: array<{
      userId: string,
      assignedAt: timestamp,
      assignedBy: string
    }>,
    
    // Notifications
    reminderSettings: {
      reminderDays: array<number>, // Days before deadline
      reminderChannels: {
        email: boolean,
        inApp: boolean,
        sms: boolean,
        push: boolean
      },
      customMessage: string
    },
    
    // Steps/subtasks
    steps: array<{
      id: string,
      title: string,
      description: string,
      status: "not_started" | "in_progress" | "completed" | "skipped",
      completedDate: timestamp,
      assignedTo: string,
      estimatedTime: number // Minutes
    }>,
    
    // Resources
    documents: array<{
      id: string,
      name: string,
      type: "template" | "completed" | "supporting" | "submission",
      storageRef: string,
      uploadDate: timestamp,
      uploadedBy: string,
      status: "draft" | "final" | "submitted" | "approved" | "rejected"
    }>,
    
    // Requirement details if applicable
    requirementDetails: {
      estimatedTime: number, // Minutes
      estimatedCost: {
        amount: number,
        currency: string
      },
      formNumbers: array<string>,
      authorities: array<{
        name: string,
        website: string,
        phone: string
      }>,
      submissionMethods: array<{
        type: "online" | "mail" | "in_person" | "email" | "fax",
        instructions: string,
        url: string
      }>
    },
    
    // Recurrence for repeating items
    recurrence: {
      pattern: "annual" | "semi_annual" | "quarterly" | "monthly" | "custom",
      interval: number,
      dayOfMonth: number, // For monthly/annual
      dayOfWeek: number, // 0-6 for custom weekly
      monthOfYear: number, // 1-12 for annual
      endDate: timestamp,
      customPattern: string // For complex patterns
    },
    
    // Custom properties
    customFields: object, // For industry-specific or custom properties
    
    // AI assistance
    aiAssistanceContext: {
      requiredKnowledge: array<string>, // Topics needed to assist
      commonQuestions: array<string>,
      helpfulResources: array<{
        title: string,
        url: string,
        type: string
      }>,
      assistanceHistory: array<{
        question: string,
        answer: string,
        rating: number, // User feedback
        timestamp: timestamp
      }>
    },
    
    // Metadata
    visibility: "all_members" | "owners_only" | "specific_users",
    visibleToUsers: array<string>, // If visibility is specific_users
    createdBy: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    source: "system" | "user" | "ai" | "import"
  }
```

### timeline_views Collection

```
timeline_views/{businessId}/
  {viewId}: {
    name: string,
    description: string,
    isDefault: boolean,
    viewType: "timeline" | "calendar" | "list" | "kanban",
    
    // Filters
    filters: {
      dateRange: {
        startDate: timestamp,
        endDate: timestamp,
        presetRange: "next_30_days" | "next_90_days" | "next_6_months" | "next_year" | "custom"
      },
      categories: array<string>,
      status: array<string>,
      priority: array<string>,
      tags: array<string>,
      assignedTo: array<string>,
      jurisdictionLevels: array<string>
    },
    
    // Grouping and Sorting
    groupBy: "month" | "quarter" | "status" | "category" | "priority" | "assignee" | "none",
    sortBy: "dueDate" | "priority" | "status" | "category" | "createdAt",
    sortDirection: "asc" | "desc",
    
    // Display options
    displayOptions: {
      cardDensity: "compact" | "normal" | "expanded",
      showDescription: boolean,
      showAssignee: boolean,
      showCategory: boolean,
      showTags: boolean,
      showCompleted: boolean,
      completedItemsOpacity: number, // 0-1
      colorCoding: "status" | "priority" | "category" | "none"
    },
    
    // Sharing and permissions
    isShared: boolean,
    sharedWith: array<string>, // User IDs
    editableBy: array<string>, // User IDs who can edit this view
    
    // Metadata
    createdBy: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    lastUsed: timestamp
  }
```

### timeline_templates Collection

```
timeline_templates/
  {templateId}: {
    name: string,
    description: string,
    businessType: string, // Type of business this template is for
    industry: string,
    jurisdictions: array<{
      level: string,
      code: string,
      name: string
    }>,
    
    // Requirements and items in this template
    items: array<{
      title: string,
      description: string,
      itemType: string,
      category: string,
      priority: string,
      
      // Timing logic
      daysFromStart: number, // Days from business start date
      daysFromOtherItem: {
        itemIndex: number, // Index in this array
        days: number
      },
      dependsOn: array<number>, // Indexes of items this depends on
      
      // Applicability conditions
      conditions: array<{
        field: string, // Field in business profile
        operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains" | "not_contains",
        value: any
      }>,
      
      // Recurrence
      recurrence: {
        pattern: string,
        interval: number,
        customPattern: string
      },
      
      // Additional details
      requirementReference: string, // ID in requirements collection
      steps: array<{
        title: string,
        description: string,
        estimatedTime: number
      }>,
      estimatedTime: number,
      estimatedCost: {
        amount: number,
        currency: string
      }
    }>,
    
    // Metadata
    createdBy: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    version: string,
    isPublished: boolean,
    usageCount: number
  }
``` 