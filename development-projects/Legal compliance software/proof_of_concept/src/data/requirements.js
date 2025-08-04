// Sample requirements data for Tennessee LLCs
export const initialRequirements = [
  {
    id: "federal-ein",
    title: "Apply for Federal Employer Identification Number (EIN)",
    description: "An EIN is required for all LLCs with employees or multiple members. Single-member LLCs may use the owner's SSN for tax purposes but typically still get an EIN for banking purposes.",
    category: "tax",
    jurisdiction: "federal",
    agency: "Internal Revenue Service (IRS)",
    isInitialFiling: true,
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "0",
    forms: [
      {
        name: "Form SS-4",
        url: "https://www.irs.gov/forms-pubs/about-form-ss-4"
      }
    ],
    steps: [
      "Go to the IRS website and apply online at https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
      "Alternatively, complete Form SS-4 and mail or fax it to the IRS",
      "Keep your EIN confirmation letter for your records",
      "Use your EIN when opening business bank accounts and filing taxes"
    ]
  },
  {
    id: "tn-annual-report",
    title: "File Tennessee LLC Annual Report",
    description: "All Tennessee LLCs must file an annual report with the Secretary of State to maintain good standing. This report confirms or updates the business's contact information and registered agent details.",
    category: "business",
    jurisdiction: "state",
    agency: "Tennessee Secretary of State",
    isInitialFiling: false,
    isRecurring: true,
    recurrencePattern: "annual",
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "annual",
      month: 4,
      day: 1
    },
    fee: "$300 (minimum)",
    forms: [
      {
        name: "Annual Report",
        url: "https://tnbear.tn.gov/Ecommerce/AnnualReport.aspx"
      }
    ],
    steps: [
      "Log in to the Tennessee Secretary of State's website",
      "Search for your LLC using your control number or business name",
      "Complete the annual report form, confirming or updating your business information",
      "Pay the annual fee (minimum $300)",
      "Save a copy of your filed report for your records"
    ]
  },
  {
    id: "tn-llc-formation",
    title: "File Tennessee LLC Articles of Organization",
    description: "To form an LLC in Tennessee, you must file Articles of Organization with the Secretary of State. This officially creates your LLC as a legal entity in Tennessee.",
    category: "business",
    jurisdiction: "state",
    agency: "Tennessee Secretary of State",
    isInitialFiling: true,
    priority: "critical",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: null, // No due date since this is the formation itself
    fee: "$300 (minimum)",
    forms: [
      {
        name: "Articles of Organization",
        url: "https://sos.tn.gov/products/business-services/limited-liability-company-formation-filing-forms"
      }
    ],
    steps: [
      "Complete the Articles of Organization form (SS-4270)",
      "Include the LLC name, principal office address, registered agent information, and management structure",
      "Pay the filing fee ($300 minimum)",
      "Submit the form online through the Secretary of State's website or by mail",
      "Wait for the approval and receive your LLC's Certificate of Formation"
    ]
  },
  {
    id: "tn-business-license",
    title: "Obtain Tennessee Business License",
    description: "Most businesses in Tennessee need a business license. If your business is located in Knox County, you'll need both a county and city business license if you operate within Knoxville city limits.",
    category: "business",
    jurisdiction: "state",
    agency: "Tennessee Department of Revenue",
    isInitialFiling: true,
    isRecurring: true,
    recurrencePattern: "annual",
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "$15-$50",
    forms: [
      {
        name: "Business License Application",
        url: "https://www.tn.gov/revenue/taxes/business-tax/business-licensing-and-registration.html"
      }
    ],
    steps: [
      "Determine if your business requires a state business license",
      "Complete the application form for your county clerk's office",
      "Pay the required fee",
      "Display your business license at your place of business",
      "Renew annually before the expiration date"
    ]
  },
  {
    id: "knox-business-license",
    title: "Obtain Knox County Business License",
    description: "Businesses operating in Knox County must obtain a county business license from the County Clerk's office.",
    category: "business",
    jurisdiction: "county",
    agency: "Knox County Clerk",
    isInitialFiling: true,
    isRecurring: true,
    recurrencePattern: "annual",
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "$15-$50",
    forms: [
      {
        name: "Knox County Business License Application",
        url: "https://www.knoxcounty.org/clerk/business_licenses.php"
      }
    ],
    steps: [
      "Visit the Knox County Clerk's office or website",
      "Complete the business license application",
      "Pay the required fee (varies based on business type)",
      "Display your business license at your place of business",
      "Renew your license annually"
    ]
  },
  {
    id: "knoxville-business-license",
    title: "Obtain Knoxville City Business License",
    description: "If your business operates within Knoxville city limits, you need a city business license in addition to your county license.",
    category: "business",
    jurisdiction: "city",
    agency: "City of Knoxville",
    isInitialFiling: true,
    isRecurring: true,
    recurrencePattern: "annual",
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "$15-$50",
    forms: [
      {
        name: "City of Knoxville Business Tax License Application",
        url: "https://knoxvilletn.gov/government/city_departments_offices/finance/business_tax_office"
      }
    ],
    steps: [
      "Visit the City of Knoxville Business Tax Office",
      "Complete the business license application",
      "Pay the required fee (varies based on business type)",
      "Display your business license at your place of business",
      "Renew your license annually"
    ]
  },
  {
    id: "operating-agreement",
    title: "Create an LLC Operating Agreement",
    description: "While not legally required in Tennessee, an operating agreement is highly recommended for all LLCs. It outlines ownership, management structure, and operating procedures for your LLC.",
    category: "legal",
    jurisdiction: "state",
    agency: "N/A",
    isInitialFiling: true,
    priority: "medium",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "0",
    forms: [],
    steps: [
      "Draft an operating agreement that includes member information, capital contributions, profit/loss allocations, voting rights, and dissolution procedures",
      "For multi-member LLCs, all members should review and sign the agreement",
      "Keep the operating agreement with your business records",
      "Review and update the agreement periodically as your business changes"
    ]
  },
  {
    id: "sales-tax-permit",
    title: "Register for Tennessee Sales Tax Permit",
    description: "If your LLC sells physical products or certain services in Tennessee, you must register to collect and remit sales tax.",
    category: "tax",
    jurisdiction: "state",
    agency: "Tennessee Department of Revenue",
    isInitialFiling: true,
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "0",
    forms: [
      {
        name: "Tennessee Sales Tax Registration",
        url: "https://tntap.tn.gov/eservices/_/"
      }
    ],
    steps: [
      "Register online through the Tennessee Taxpayer Access Point (TNTAP)",
      "Complete the sales tax registration form",
      "Receive your sales tax permit certificate",
      "Begin collecting sales tax from customers",
      "File sales tax returns and remit collected taxes (typically monthly, quarterly, or annually depending on sales volume)"
    ]
  },
  {
    id: "federal-tax-election",
    title: "File Federal Tax Election (Form 8832 or 2553)",
    description: "By default, single-member LLCs are taxed as sole proprietorships and multi-member LLCs as partnerships. You can elect to be taxed as a corporation by filing Form 8832 or as an S corporation by filing Form 2553.",
    category: "tax",
    jurisdiction: "federal",
    agency: "Internal Revenue Service (IRS)",
    isInitialFiling: true,
    priority: "medium",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 75
    },
    fee: "0",
    forms: [
      {
        name: "Form 8832 (C Corporation Election)",
        url: "https://www.irs.gov/forms-pubs/about-form-8832"
      },
      {
        name: "Form 2553 (S Corporation Election)",
        url: "https://www.irs.gov/forms-pubs/about-form-2553"
      }
    ],
    steps: [
      "Determine if a different tax classification would benefit your LLC",
      "For C corporation taxation, complete Form 8832",
      "For S corporation taxation, complete Form 2553",
      "Submit the form to the IRS by mail",
      "Keep a copy of the filed form and IRS acceptance letter for your records"
    ]
  },
  {
    id: "tn-tax-registration",
    title: "Register with Tennessee Department of Revenue",
    description: "Tennessee LLCs must register with the Department of Revenue for applicable state taxes, including franchise and excise taxes.",
    category: "tax",
    jurisdiction: "state",
    agency: "Tennessee Department of Revenue",
    isInitialFiling: true,
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "0",
    forms: [
      {
        name: "Tennessee State Tax Registration",
        url: "https://tntap.tn.gov/eservices/_/"
      }
    ],
    steps: [
      "Register online through the Tennessee Taxpayer Access Point (TNTAP)",
      "Complete the tax registration application",
      "Register for applicable taxes, including franchise and excise taxes",
      "Receive your tax account numbers",
      "File tax returns according to the required schedule"
    ]
  },
  {
    id: "business-bank-account",
    title: "Open Business Bank Account",
    description: "Maintaining separate finances is crucial for LLC liability protection. Open a dedicated business bank account using your EIN and LLC formation documents.",
    category: "financial",
    jurisdiction: "n/a",
    agency: "N/A",
    isInitialFiling: true,
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 14
    },
    fee: "Varies by bank",
    forms: [],
    steps: [
      "Research banks that offer business checking accounts",
      "Gather required documents: EIN, Articles of Organization, Operating Agreement, and personal ID",
      "Visit the bank to open the account",
      "Set up online banking and order checks if needed",
      "Start using the account for all business transactions"
    ]
  },
  {
    id: "accounting-system",
    title: "Set Up Accounting System",
    description: "Establish a proper accounting system to track income, expenses, and tax obligations for your LLC.",
    category: "financial",
    jurisdiction: "n/a",
    agency: "N/A",
    isInitialFiling: true,
    priority: "medium",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "days_after_formation",
      days: 30
    },
    fee: "Varies",
    forms: [],
    steps: [
      "Choose accounting software (e.g., QuickBooks, Xero, FreshBooks)",
      "Set up your chart of accounts",
      "Connect your business bank account to your accounting software",
      "Establish a system for tracking receipts and expenses",
      "Consider hiring an accountant for initial setup and ongoing advice"
    ]
  },
  {
    id: "tn-franchise-excise-tax",
    title: "File Tennessee Franchise & Excise Tax Return",
    description: "Tennessee LLCs (except for single-member LLCs owned by individuals) must file an annual Franchise & Excise Tax Return.",
    category: "tax",
    jurisdiction: "state",
    agency: "Tennessee Department of Revenue",
    isInitialFiling: false,
    isRecurring: true,
    recurrencePattern: "annual",
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "annual",
      month: 4,
      day: 15
    },
    fee: "Minimum tax: $100 franchise tax, $100 excise tax",
    forms: [
      {
        name: "Form FAE170",
        url: "https://www.tn.gov/revenue/taxes/franchise---excise-tax/forms.html"
      }
    ],
    steps: [
      "Determine if your LLC is exempt (most single-member LLCs owned by individuals are exempt)",
      "If not exempt, prepare Form FAE170",
      "Calculate your franchise tax (based on net worth) and excise tax (based on net earnings)",
      "File and pay through TNTAP by the deadline (April 15 for calendar year filers)",
      "Keep copies of all filed returns for at least 7 years"
    ]
  },
  {
    id: "federal-income-tax",
    title: "File Federal Income Tax Return",
    description: "LLCs must report their business income on the appropriate tax form based on their tax classification.",
    category: "tax",
    jurisdiction: "federal",
    agency: "Internal Revenue Service (IRS)",
    isInitialFiling: false,
    isRecurring: true,
    recurrencePattern: "annual",
    priority: "critical",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "annual",
      month: 4,
      day: 15
    },
    fee: "0",
    forms: [
      {
        name: "Schedule C (Single-member LLC)",
        url: "https://www.irs.gov/forms-pubs/about-schedule-c-form-1040"
      },
      {
        name: "Form 1065 (Multi-member LLC)",
        url: "https://www.irs.gov/forms-pubs/about-form-1065"
      }
    ],
    steps: [
      "Determine which tax form to use based on your LLC's tax classification",
      "For single-member LLCs taxed as sole proprietorships: File Schedule C with your personal Form 1040",
      "For multi-member LLCs taxed as partnerships: File Form 1065 and issue Schedule K-1 to each member",
      "For LLCs taxed as corporations: File Form 1120 (C corps) or Form 1120S (S corps)",
      "Submit your return by the deadline (typically April 15 for calendar year filers)"
    ]
  },
  {
    id: "estimated-tax-payments",
    title: "Make Quarterly Estimated Tax Payments",
    description: "LLC owners typically need to make quarterly estimated tax payments on their business income.",
    category: "tax",
    jurisdiction: "federal",
    agency: "Internal Revenue Service (IRS)",
    isInitialFiling: false,
    isRecurring: true,
    recurrencePattern: "quarterly",
    priority: "high",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["single-member", "multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "quarterly",
      months: [4, 6, 9, 1],
      days: [15, 15, 15, 15]
    },
    fee: "0",
    forms: [
      {
        name: "Form 1040-ES",
        url: "https://www.irs.gov/forms-pubs/about-form-1040-es"
      }
    ],
    steps: [
      "Estimate your tax liability for the year",
      "Calculate your quarterly payment amounts using Form 1040-ES",
      "Pay online through the IRS Electronic Federal Tax Payment System (EFTPS)",
      "Make payments by the quarterly due dates (April 15, June 15, September 15, January 15)",
      "Keep records of all payments for your annual tax return"
    ]
  },
  {
    id: "tn-estimated-tax",
    title: "Make Tennessee Franchise & Excise Estimated Tax Payments",
    description: "LLCs subject to Tennessee Franchise & Excise tax must make quarterly estimated tax payments if their combined liability exceeds $500.",
    category: "tax",
    jurisdiction: "state",
    agency: "Tennessee Department of Revenue",
    isInitialFiling: false,
    isRecurring: true,
    recurrencePattern: "quarterly",
    priority: "medium",
    applicableBusinessTypes: ["llc"],
    applicableLLCTypes: ["multi-member"],
    requiresEmployees: false,
    dueDateFormula: {
      type: "quarterly",
      months: [4, 6, 9, 1],
      days: [15, 15, 15, 15]
    },
    fee: "0",
    forms: [
      {
        name: "Form FAE170ES",
        url: "https://www.tn.gov/revenue/taxes/franchise---excise-tax/forms.html"
      }
    ],
    steps: [
      "Determine if your estimated annual tax liability exceeds $500",
      "Calculate your quarterly payment amounts",
      "File and pay through TNTAP by the quarterly due dates",
      "Keep records of all payments for your annual tax return"
    ]
  }
];

export default initialRequirements; 