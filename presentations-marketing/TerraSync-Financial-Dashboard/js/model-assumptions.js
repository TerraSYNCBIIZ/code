// =================================================================================
// TERRASYNC FINANCIAL MODEL - FINAL ASSUMPTIONS & CONFIGURATION
// Version 4.0 - Definitive Realistic Ramp-Up
// =================================================================================

const assumptions = {

    // --- 1. CLIENT & LOCATION GROWTH (DEFINITIVE RAMP-UP MODEL) ---
    firstYearAcquisitionSchedule: {
        month_0: { golf: 0, other: 3 },   // April 2025
        month_1: { golf: 0, other: 3 },   // May 2025
        month_2: { golf: 0, other: 3 },   // June 2025
        month_3: { golf: 0, other: 4 },   // July 2025
        month_4: { golf: 1, other: 2 },   // Aug 2025
        month_5: { golf: 1, other: 3 },   // Sep 2025
        month_6: { golf: 1, other: 4 },   // Oct 2025
        month_7: { golf: 1, other: 5 },   // Nov 2025
        month_8: { golf: 2, other: 5 },   // Dec 2025
        month_9: { golf: 2, other: 6 },   // Jan 2026
        month_10: { golf: 2, other: 6 },  // Feb 2026
        month_11: { golf: 3, other: 7 },  // Mar 2026
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
        year1: 0.30, 
        year2: 0.40, 
        year3: 0.30,
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
        fieldServiceTech: 2000, // Bootstrap: $24K/year
        salesOps: 2000, // Bootstrap: $24K/year
        developer: 2500, // Bootstrap: $30K/year
        executiveAssistant: 2000, // Bootstrap: $24K/year
        accountManager: 3000, // Bootstrap: $36K/year
    },
    // More aggressive salary scaling as business grows
    salaryScaling: {
        fieldServiceTech: [
            { arrThreshold: 200000, salary: 3500 }, // $42K at $200K ARR
            { arrThreshold: 500000, salary: 4500 }, // $54K at $500K ARR
            { arrThreshold: 1000000, salary: 5500 }, // $66K at $1M ARR
        ],
        salesOps: [
            { arrThreshold: 200000, salary: 4000 }, // $48K at $200K ARR
            { arrThreshold: 500000, salary: 5500 }, // $66K at $500K ARR
            { arrThreshold: 1000000, salary: 7000 }, // $84K at $1M ARR
        ],
        executiveAssistant: [
            { arrThreshold: 500000, salary: 3500 }, // $42K at $500K ARR
            { arrThreshold: 1000000, salary: 4500 }, // $54K at $1M ARR
        ],
        accountManager: [
            { arrThreshold: 100000, salary: 5000 }, // $60K when first hired
            { arrThreshold: 500000, salary: 6500 }, // $78K at $500K ARR
            { arrThreshold: 1000000, salary: 8000 }, // $96K at $1M ARR
        ]
    },
    developerSalarySchedule: {
        raise1_month: 10,
        raise1_amount: 4500, // $54K/year
        raise2_month: 18,
        raise2_amount: 7000, // $84K/year
    },
    founderSalaryTiers: {
        level1: { threshold: 0, salary: 2000 }, // Bootstrap: $24K/year
        level2: { threshold: 500000, salary: 6000 }, // $72K/year
        level3: { threshold: 2000000, salary: 10000 }, // $120K/year
        level4: { threshold: 5000000, salary: 15000 }, // $180K/year
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
            new_hire_tech_kit: 2500
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
