/**
 * Sample requirements data for Tennessee LLC compliance
 * This file contains structured data that represents legal requirements for
 * LLCs in Tennessee, focusing on Knox County and Knoxville
 */

const requirementsData = [
  // FEDERAL REQUIREMENTS
  {
    id: 'fed-001',
    title: 'Apply for Employer Identification Number (EIN)',
    description: 'All LLCs must obtain an EIN (even single-member LLCs) when they have employees or are taxed as a corporation or partnership.',
    category: 'tax',
    jurisdiction: 'federal',
    agency: 'Internal Revenue Service (IRS)',
    fee: 0,
    forms: ['Form SS-4'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['federal'],
      hasEmployees: false // Not dependant on having employees - almost all LLCs need this
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 30,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Create an account on the IRS website',
      'Complete Form SS-4 online or by mail',
      'Provide information about the responsible party (must have SSN)',
      'Choose your tax classification (disregarded entity, partnership, or corporation)',
      'Receive your EIN immediately (online) or within 4-5 weeks (mail)'
    ],
    requiredDocuments: [
      'LLC formation documents',
      'Responsible party information (name, SSN, address)'
    ]
  },
  {
    id: 'fed-002',
    title: 'File Annual Tax Return',
    description: 'Single-member LLCs report income on Schedule C on the owner\'s Form 1040. Multi-member LLCs file Form 1065 partnership return.',
    category: 'tax',
    jurisdiction: 'federal',
    agency: 'Internal Revenue Service (IRS)',
    fee: 0,
    forms: ['Schedule C (Form 1040)', 'Form 1065'],
    isInitialFiling: false,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['federal']
    },
    deadlineType: 'fixed-date',
    deadlineMonth: 4,
    deadlineDay: 15,
    priority: 'high',
    isRecurring: true,
    recurrencePattern: 'yearly',
    steps: [
      'Collect annual income and expense documentation',
      'For single-member LLC: Complete Schedule C and attach to Form 1040',
      'For multi-member LLC: Complete Form 1065 and issue Schedule K-1 to each member',
      'File return by April 15 (or request extension)'
    ],
    requiredDocuments: [
      'Annual financial statements',
      'Expense receipts and documentation',
      'Previous year\'s tax return',
      'EIN documentation'
    ]
  },
  {
    id: 'fed-003',
    title: 'File Quarterly Estimated Tax Payments',
    description: 'LLC owners must make quarterly estimated tax payments on their expected tax liability.',
    category: 'tax',
    jurisdiction: 'federal',
    agency: 'Internal Revenue Service (IRS)',
    fee: 0,
    forms: ['Form 1040-ES'],
    isInitialFiling: false,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['federal']
    },
    deadlineType: 'fixed-date',
    deadlineMonth: 4, // First deadline, there are actually 4 deadlines
    deadlineDay: 15,
    priority: 'medium',
    isRecurring: true,
    recurrencePattern: 'quarterly',
    steps: [
      'Calculate estimated annual tax liability',
      'Divide annual estimate by 4 for quarterly payment amount',
      'Complete Form 1040-ES',
      'Submit payment by April 15, June 15, September 15, and January 15'
    ],
    requiredDocuments: [
      'Previous year\'s tax return',
      'Current year income and expense projections'
    ]
  },
  {
    id: 'fed-004',
    title: 'Set Up Federal Employment Tax Filing',
    description: 'If your LLC has employees, you must register for federal employment taxes and establish a payroll tax account.',
    category: 'tax',
    jurisdiction: 'federal',
    agency: 'Internal Revenue Service (IRS)',
    fee: 0,
    forms: ['Form 941', 'Form 940'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['federal'],
      hasEmployees: true
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 30,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Obtain an EIN (if not already done)',
      'Register for EFTPS (Electronic Federal Tax Payment System)',
      'Set up withholding accounts for income tax, Social Security, and Medicare',
      'Determine filing frequency based on tax liability (monthly, quarterly)'
    ],
    requiredDocuments: [
      'EIN documentation',
      'Business banking information for EFTPS',
      'Employee information'
    ]
  },
  
  // TENNESSEE STATE REQUIREMENTS
  {
    id: 'tn-001',
    title: 'File Articles of Organization',
    description: 'Submit Articles of Organization to establish your LLC with the Tennessee Secretary of State.',
    category: 'formation',
    jurisdiction: 'state',
    agency: 'Tennessee Secretary of State',
    fee: 300,
    forms: ['Articles of Organization Form SS-4270'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['tn']
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 0, // This is the formation itself
    priority: 'critical',
    isRecurring: false,
    steps: [
      'Complete Form SS-4270 (Articles of Organization)',
      'Choose a unique business name that ends with "LLC" or "Limited Liability Company"',
      'Designate a registered agent with a physical address in Tennessee',
      'Pay the $300 filing fee',
      'Submit online through the Secretary of State website or by mail'
    ],
    requiredDocuments: [
      'Completed Articles of Organization form',
      'Payment for filing fee'
    ]
  },
  {
    id: 'tn-002',
    title: 'File Annual Report',
    description: 'All Tennessee LLCs must file an Annual Report with the Secretary of State to maintain active status.',
    category: 'compliance',
    jurisdiction: 'state',
    agency: 'Tennessee Secretary of State',
    fee: 300,
    forms: ['Annual Report Form'],
    isInitialFiling: false,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['tn']
    },
    deadlineType: 'fixed-date',
    deadlineMonth: 4,
    deadlineDay: 1,
    priority: 'high',
    isRecurring: true,
    recurrencePattern: 'yearly',
    steps: [
      'Complete the Annual Report form online',
      'Update company information if needed (registered agent, principal address, etc.)',
      'Pay the $300 minimum annual fee',
      'Submit by April 1st of each year (due in the fourth month after fiscal year end)'
    ],
    requiredDocuments: [
      'LLC information including EIN',
      'Updated company information if applicable'
    ]
  },
  {
    id: 'tn-003',
    title: 'Register for Franchise & Excise Tax',
    description: 'All LLCs doing business in Tennessee must register for Franchise & Excise Tax, even if they qualify for exemption.',
    category: 'tax',
    jurisdiction: 'state',
    agency: 'Tennessee Department of Revenue',
    fee: 0,
    forms: ['Application for Franchise & Excise Tax Registration'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['tn']
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 60,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Complete the Application for Registration online or by mail',
      'Provide information about your business structure and activities',
      'Determine if you qualify for the Family-Owned Non-Corporate Entity (FONCE) exemption',
      'Receive your tax account number for future filings'
    ],
    requiredDocuments: [
      'LLC formation documents',
      'EIN documentation',
      'Business ownership information'
    ]
  },
  {
    id: 'tn-004',
    title: 'Register for Sales & Use Tax',
    description: 'If your LLC sells tangible products or certain services, you must register to collect sales tax.',
    category: 'tax',
    jurisdiction: 'state',
    agency: 'Tennessee Department of Revenue',
    fee: 0,
    forms: ['Sales and Use Tax Application'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['tn'],
      hasTangibleProducts: true
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 30,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Complete the Sales and Use Tax Application online or by mail',
      'Provide details about your business and products/services',
      'Determine filing frequency based on expected tax liability',
      'Set up procedures for collecting and remitting sales tax'
    ],
    requiredDocuments: [
      'EIN documentation',
      'LLC formation documents',
      'Business banking information'
    ]
  },
  
  // KNOX COUNTY REQUIREMENTS
  {
    id: 'knox-001',
    title: 'Obtain Knox County Business License',
    description: 'Most businesses operating in Knox County must obtain a county business license.',
    category: 'license',
    jurisdiction: 'county',
    agency: 'Knox County Clerk',
    fee: 15,
    forms: ['Business License Application'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knox-county']
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 30,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Complete the Business License Application',
      'Provide business information and location details',
      'Pay the $15 minimum license fee (fee based on expected gross sales)',
      'Submit in person at the Knox County Clerk\'s Office'
    ],
    requiredDocuments: [
      'LLC formation documents',
      'EIN documentation',
      'Proof of business location'
    ]
  },
  {
    id: 'knox-002',
    title: 'Register for Knox County Business Tax',
    description: 'All businesses with a Knox County Business License must file annual business tax returns.',
    category: 'tax',
    jurisdiction: 'county',
    agency: 'Knox County Clerk',
    fee: 0, // Fee varies by business class and gross receipts
    forms: ['County Business Tax Return'],
    isInitialFiling: false,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knox-county']
    },
    deadlineType: 'fixed-date',
    deadlineMonth: 4,
    deadlineDay: 15,
    priority: 'medium',
    isRecurring: true,
    recurrencePattern: 'yearly',
    steps: [
      'Maintain records of gross sales throughout the year',
      'Complete the County Business Tax Return',
      'Calculate tax based on business classification and gross receipts',
      'File and pay by April 15 for businesses with fiscal year ending December 31'
    ],
    requiredDocuments: [
      'Financial records showing gross sales',
      'Knox County Business License'
    ]
  },
  
  // KNOXVILLE CITY REQUIREMENTS
  {
    id: 'knox-city-001',
    title: 'Obtain Knoxville City Business License',
    description: 'Most businesses operating within Knoxville city limits must obtain a city business license.',
    category: 'license',
    jurisdiction: 'city',
    agency: 'Knoxville City Business Tax Office',
    fee: 15,
    forms: ['City Business License Application'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knoxville']
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 30,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Complete the City Business License Application',
      'Provide business information and location details',
      'Pay the $15 minimum license fee (fee based on expected gross sales)',
      'Submit in person at the Knoxville City Court Building'
    ],
    requiredDocuments: [
      'LLC formation documents',
      'EIN documentation',
      'Proof of business location within city limits'
    ]
  },
  {
    id: 'knox-city-002',
    title: 'Register for Knoxville City Business Tax',
    description: 'All businesses with a Knoxville City Business License must file annual business tax returns.',
    category: 'tax',
    jurisdiction: 'city',
    agency: 'Knoxville City Business Tax Office',
    fee: 0, // Fee varies by business class and gross receipts
    forms: ['City Business Tax Return'],
    isInitialFiling: false,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knoxville']
    },
    deadlineType: 'fixed-date',
    deadlineMonth: 4,
    deadlineDay: 15,
    priority: 'medium',
    isRecurring: true,
    recurrencePattern: 'yearly',
    steps: [
      'Maintain records of gross sales throughout the year',
      'Complete the City Business Tax Return',
      'Calculate tax based on business classification and gross receipts',
      'File and pay by April 15 for businesses with fiscal year ending December 31'
    ],
    requiredDocuments: [
      'Financial records showing gross sales',
      'Knoxville City Business License'
    ]
  },
  {
    id: 'knox-city-003',
    title: 'Obtain Zoning Compliance Verification',
    description: 'Verify that your business location is properly zoned for your intended business activities.',
    category: 'compliance',
    jurisdiction: 'city',
    agency: 'Knoxville-Knox County Planning',
    fee: 0,
    forms: ['Zoning Verification Request'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knoxville']
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 15,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Submit a Zoning Verification Request to Knoxville-Knox County Planning',
      'Provide your business address and description of business activities',
      'Receive confirmation that your location is properly zoned',
      'If zoning issues exist, you may need to request a variance or find another location'
    ],
    requiredDocuments: [
      'Property address',
      'Description of business activities',
      'Lease agreement or property deed'
    ]
  },
  {
    id: 'knox-city-004',
    title: 'Apply for Food Service Permit',
    description: 'Businesses serving or preparing food must obtain a Food Service Establishment Permit.',
    category: 'license',
    jurisdiction: 'city',
    agency: 'Knox County Health Department',
    fee: 290, // Base fee, may vary by establishment size
    forms: ['Food Service Establishment Application'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knoxville', 'knox-county'],
      sellsFood: true
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 30,
    priority: 'high',
    isRecurring: true,
    recurrencePattern: 'yearly',
    steps: [
      'Complete the Food Service Establishment Application',
      'Submit floor plans and equipment specifications',
      'Pay the permit fee (varies based on establishment type)',
      'Schedule pre-operational inspection',
      'Pass inspection before opening for business'
    ],
    requiredDocuments: [
      'Floor plans',
      'Equipment specifications',
      'Menu',
      'Food safety manager certification'
    ]
  },
  {
    id: 'knox-city-005',
    title: 'Apply for Beer Permit',
    description: 'Businesses selling beer in Knoxville must obtain a beer permit from the city.',
    category: 'license',
    jurisdiction: 'city',
    agency: 'Knoxville Beer Board',
    fee: 250,
    forms: ['Beer Permit Application'],
    isInitialFiling: true,
    applicableTo: {
      llcTypes: ['single-member', 'multi-member'],
      jurisdictions: ['knoxville'],
      sellsAlcohol: true
    },
    deadlineType: 'days-after-formation',
    deadlineDays: 60,
    priority: 'high',
    isRecurring: false,
    steps: [
      'Complete the Beer Permit Application',
      'Pay the $250 non-refundable application fee',
      'Submit background check forms for all owners',
      'Attend the Beer Board meeting when your application is considered',
      'Post permit in a prominent location at your business'
    ],
    requiredDocuments: [
      'Copy of lease or proof of ownership',
      'Certificate of Occupancy',
      'Business License(s)',
      'Sales Tax Certificate',
      'Food Service Permit (if applicable)'
    ]
  }
];

export default requirementsData; 