// =================================================================================
// TERRASYNC FINANCIAL MODEL - FINAL ASSUMPTIONS & CONFIGURATION
// Version 4.0 - Definitive Realistic Ramp-Up
// =================================================================================

const assumptions = {

    // --- 1. CLIENT & LOCATION GROWTH (CONTROLLED 2025 RAMP-UP) ---
    // Starting point: July 2025 (month 4) = 62 acres
    firstYearAcquisitionSchedule: {
        month_0: { golf: 0, other: 0 },   // March 2025 - no growth yet
        month_1: { golf: 0, other: 0 },   // April 2025 - no growth yet
        month_2: { golf: 0, other: 0 },   // May 2025 - no growth yet
        month_3: { golf: 0, other: 0 },   // June 2025 - no growth yet  
        month_4: { golf: 0, other: 0 },   // July 2025 - 62 acres (CURRENT STATE)
        month_5: { golf: 0, other: 1 },   // Aug 2025 - gentle start: +1 small client (~5-10 acres)
        month_6: { golf: 0, other: 1 },   // Sep 2025 - +1 small client
        month_7: { golf: 0, other: 1 },   // Oct 2025 - +1 small client
        month_8: { golf: 0, other: 2 },   // Nov 2025 - +2 small clients
        month_9: { golf: 0, other: 2 },   // Dec 2025 - +2 small clients
        month_10: { golf: 0, other: 2 },  // Jan 2026 - +2 small clients
        month_11: { golf: 1, other: 1 },  // Feb 2026 - FIRST golf course + 1 small (spread the big jump)
    },
    clientAcquisitionRateSchedule: {
        2026: { golf: 0.25, other: 0.5 },
        2027: { golf: 0.55, other: 0.6 },
        2028: { golf: 0.4, other: 0.3 },
        2029: { golf: 0.15, other: 0.1 },
        2030: { golf: 0.08, other: 0.05 }, // Mature market - lower but ongoing acquisition
        2031: { golf: 0.06, other: 0.04 }, // Continued steady growth
        2032: { golf: 0.05, other: 0.03 }, // Stable mature market rates
    },
    clientMix: {
        golfCourse: 0.8,
    },
    clientProfile: {
        golfCourse: { initialAcres: 10, maxAcres: 120 },
        other:      { initialAcres: 3,  maxAcres: 40 }, 
    },
    clientAcreageGrowthCurve: {
        year1: 0.25,  // 25% of potential growth in first year (slightly slower)
        year2: 0.45,  // 45% in second year (main growth)
        year3: 0.30,  // 30% in third year (completion)
    },
    churnRateSchedule: {
        2025: 0.005,
        2026: 0.005,
        2027: 0.005,
        2028: 0.006,
        2029: 0.007,
    },
    serviceToSaaSConversionRate: {
        2026: 0.15, // 15% of service clients convert
        2027: 0.25, // 25% of remaining service clients convert
        2028: 0.40,
        2029: 0.50,
    },
    minClientAgeForChurnMonths: 6,

    // --- 1.5. LOCATION GROWTH (SCHEDULE-BASED) ---
    locationAcquisitionSchedule: {
        2026: 6,
        2027: 12,
        2028: 8,
        2029: 4,
    },
    locationCapacity: {
        maxGolfCourses: 60,
        maxAcres: 1800,
    },
    newLocationMarketSize: 100,

    // --- 2. REVENUE & SAAS MODEL ---
    revenueStreams: {
        servicePerAcreMonthly: 59,
        installationPerAcre: 700,
        productSalePerAcre: 1700,
    },
    saas: {
        pricingTiers: {
            trial: { priceAfterMonth1: 500 },
            smallTeam: { price: 2500, userLimit: 4 },
            professional: { price: 5000, userLimit: 10 },
            enterprise: { price: 8000, userLimit: 25 },
        },
        addOns: {
            aiFeatures: 2500,
            premiumSupport: 1200,
            onSiteSupportBase: 2000,
            onSiteSupportPerAcre: 40,
            additionalUserFee: 150,
        },
        freemium: {
            trialPeriodMonths: 1,
            initialAdoptionRate: 0.50,
            conversionToPaidRate: 0.75,
            saasMaturityBonus: 0.001, // Monthly increase to conversion rate
        },
        directToSaaSAcquisition: {
            2026: 10,
            2027: 20,
            2028: 35,
            2029: 50,
        },
        saasProductSales: {
            adoptionRate: 0.25, // 25% of new SaaS customers buy some product
            averagePurchaseValue: 5000 // The average one-time product revenue from that purchase
        },
    },

    // --- 3. COSTS & PERSONNEL ---
    salaries: {
        fieldServiceTech: 2000, // $24K/year - owner-operators (West Palm)
        salesOps: 2500, // $30K/year base + commissions
        developer: 2500, // $30K/year - current developer rate
        executiveAssistant: 2500, // $30K/year - operations support
        accountManager: 4500, // $54K/year - when hired later
        // Corporate Infrastructure Roles
        accountant: 5000, // $60K/year - transition from outsourced
        hrManager: 5500, // $66K/year - HR specialist
        operationsManager: 6500, // $78K/year - regional ops management
        marketingManager: 5500, // $66K/year - dedicated marketing
        customerSuccessManager: 4500, // $54K/year - client retention
        itManager: 6000, // $72K/year - internal IT support
        coo: 12000, // $144K/year - Chief Operating Officer
        cfo: 15000, // $180K/year - Chief Financial Officer
    },
    
    // Sales Ops Commission Structure
    salesCommissions: {
        newClientCommission: 500, // $500 per new client
        acreCommissionRate: 10, // $10 per acre per year in service contract
        saasCommissionRate: 0.05, // 5% of monthly SaaS revenue
        installationCommissionRate: 0.03, // 3% of installation revenue
    },
    // AGGRESSIVE salary scaling as business grows (competitive tech company rates)
    salaryScaling: {
        fieldServiceTech: [
            { arrThreshold: 300000, salary: 3500 }, // $42K at $300K ARR
            { arrThreshold: 750000, salary: 4500 }, // $54K at $750K ARR
            { arrThreshold: 1500000, salary: 5500 }, // $66K at $1.5M ARR
            { arrThreshold: 3000000, salary: 6500 }, // $78K at $3M ARR
        ],
        salesOps: [
            { arrThreshold: 300000, salary: 4000 }, // $48K base at $300K ARR (+ commissions)
            { arrThreshold: 750000, salary: 5500 }, // $66K base at $750K ARR (+ commissions)
            { arrThreshold: 1500000, salary: 7000 }, // $84K base at $1.5M ARR (+ commissions)
            { arrThreshold: 3000000, salary: 8500 }, // $102K base at $3M ARR (+ commissions)
        ],
        developer: [
            { arrThreshold: 300000, salary: 5000 }, // $60K at $300K ARR
            { arrThreshold: 750000, salary: 7000 }, // $84K at $750K ARR
            { arrThreshold: 1500000, salary: 9500 }, // $114K at $1.5M ARR
            { arrThreshold: 3000000, salary: 12000 }, // $144K at $3M ARR (competitive tech salary)
            { arrThreshold: 5000000, salary: 15000 }, // $180K at $5M ARR (senior tech salary)
        ],
        executiveAssistant: [
            { arrThreshold: 300000, salary: 3500 }, // $42K at $300K ARR
            { arrThreshold: 750000, salary: 4500 }, // $54K at $750K ARR
            { arrThreshold: 1500000, salary: 5500 }, // $66K at $1.5M ARR
        ],
        accountManager: [
            { arrThreshold: 300000, salary: 6000 }, // $72K at $300K ARR
            { arrThreshold: 750000, salary: 7500 }, // $90K at $750K ARR
            { arrThreshold: 1500000, salary: 9500 }, // $114K at $1.5M ARR
            { arrThreshold: 3000000, salary: 12000 }, // $144K at $3M ARR
        ],
        // Corporate Infrastructure Salary Scaling
        accountant: [
            { arrThreshold: 500000, salary: 6000 }, // $72K at $500K ARR
            { arrThreshold: 1500000, salary: 7500 }, // $90K at $1.5M ARR
            { arrThreshold: 3000000, salary: 9000 }, // $108K at $3M ARR
        ],
        hrManager: [
            { arrThreshold: 1000000, salary: 7000 }, // $84K at $1M ARR
            { arrThreshold: 2500000, salary: 8500 }, // $102K at $2.5M ARR
            { arrThreshold: 5000000, salary: 10000 }, // $120K at $5M ARR
        ],
        operationsManager: [
            { arrThreshold: 750000, salary: 7500 }, // $90K at $750K ARR
            { arrThreshold: 2000000, salary: 9000 }, // $108K at $2M ARR
            { arrThreshold: 4000000, salary: 11000 }, // $132K at $4M ARR
        ],
        marketingManager: [
            { arrThreshold: 500000, salary: 6500 }, // $78K at $500K ARR
            { arrThreshold: 1500000, salary: 8000 }, // $96K at $1.5M ARR
            { arrThreshold: 3000000, salary: 10000 }, // $120K at $3M ARR
        ],
        customerSuccessManager: [
            { arrThreshold: 750000, salary: 5500 }, // $66K at $750K ARR
            { arrThreshold: 2000000, salary: 7000 }, // $84K at $2M ARR
            { arrThreshold: 4000000, salary: 8500 }, // $102K at $4M ARR
        ],
        itManager: [
            { arrThreshold: 1000000, salary: 7500 }, // $90K at $1M ARR
            { arrThreshold: 2500000, salary: 9000 }, // $108K at $2.5M ARR
            { arrThreshold: 5000000, salary: 11000 }, // $132K at $5M ARR
        ],
        coo: [
            { arrThreshold: 2000000, salary: 15000 }, // $180K at $2M ARR
            { arrThreshold: 4000000, salary: 18000 }, // $216K at $4M ARR
            { arrThreshold: 7000000, salary: 22000 }, // $264K at $7M ARR
        ],
        cfo: [
            { arrThreshold: 3000000, salary: 18000 }, // $216K at $3M ARR
            { arrThreshold: 6000000, salary: 22000 }, // $264K at $6M ARR
            { arrThreshold: 10000000, salary: 25000 }, // $300K at $10M ARR
        ]
    },
    developerSalarySchedule: {
        raise1_month: 12, // After 1 year
        raise1_amount: 3000, // $36K/year
        raise2_month: 24, // After 2 years  
        raise2_amount: 4000, // $48K/year
    },
    founderSalaryTiers: {
        level1: { threshold: 0, salary: 2000 }, // $24K/year - current bootstrap phase
        level2: { threshold: 300000, salary: 5000 }, // $60K/year at $300K ARR
        level3: { threshold: 750000, salary: 8000 }, // $96K/year at $750K ARR
        level4: { threshold: 1500000, salary: 12000 }, // $144K/year at $1.5M ARR
        level5: { threshold: 3000000, salary: 17000 }, // $204K/year at $3M ARR
        level6: { threshold: 5000000, salary: 22000 }, // $264K/year at $5M ARR (competitive CEO salary)
    },
    costs: {
        rentAndUtilitiesPerLocation: 3000,
        supportCostPerClientMonthly: 100,
        operationalCostPerAcreMonthly: 10,
    },
    
    // --- 4. OPERATIONAL COSTS ---
    operationalCosts: {
        // 4.1. General & Administrative
        G_and_A: {
            professional_services_monthly: {
                tier1_cost: 2500,
                tier1_max_arr: 1000000,
                tier2_cost: 5000,
                tier2_max_arr: 3000000,
                tier3_cost: 8000
            },
            general_business_software_per_employee: 50,
            corporate_insurance_annual: {
                base: 12000,
                per_location_adder: 2000
            }
        },
        // 4.2. Technology & IT
        tech_and_it: {
            it_security_software_per_employee: 25,
            new_hire_tech_kit: 2500,
            new_hire_training_cost: 3500, // Training and onboarding per new employee
            ongoing_training_budget_per_employee_annual: 2000 // Continuing education/training
        },
        // 4.3. Per Location Costs
        per_location: {
            one_time_security_setup: 1500,
            base_operational_costs: 3000,
            annual_insurance: 6000
        }
    },

    // --- 5. ACQUISITION COSTS (REVISED & DETAILED) ---
    acquisitionCosts: {
        // 4.1. Personnel Allocation (Portion of salary counted in CAC)
        personnel_allocation: {
            founder_sales_allocation: 0.25, // 25% of founder's time/salary
            sales_ops_allocation: 0.75,     // 75% of Sales Ops' time/salary
            sales_commission_rate: 0.10,    // 10% of First Year TCV
        },
        // 4.2. Per-Client Costs (Variable costs to close a deal, factoring in a 3:1 lead-to-close ratio)
        per_client: {
            travel: 4500,           // Flights, hotels
            entertainment: 3000,    // Client dinners, events
        },
        // 4.3. Per-Location Costs (One-time and recurring costs for expansion)
        per_location: {
            one_time_demo_equipment: 60000, // Truck, trailer, mowers, etc.
            annual_demo_upkeep: 5000,       // Maintenance, fuel, insurance
        },
        // 4.4. General Sales & Marketing Costs (Ongoing operational spend)
        general_S_and_M: {
            base_marketing_budget: { // Monthly spend
                months_0_6: 2500,
                months_7_12: 4000,
                months_13_24: 7500,
                months_25_plus: 12000,
            },
            sales_software_seat_cost: 350, // Per sales-focused employee, per month
            annual_conference_budget: { // Annual spend
                year_1: 10000,
                year_2: 20000,
                year_3_plus: 35000,
            },
            annual_swag_budget: { // Annual spend for marketing materials
                year_1: 2500,
                year_2: 5000,
                year_3_plus: 7500,
            }
        }
    },
    
    // --- 5. PROFIT MARGINS ---
    margins: {
        service: 0.70, 
        installation: 0.60, 
        product: 0.25,
        saas: 0.90,
    }
};
