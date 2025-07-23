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
        month_5: { golf: 0, other: 1 },   // Aug 2025 - gentle start: +1 small client
        month_6: { golf: 0, other: 1 },   // Sep 2025 - gradual: +1 more client
        month_7: { golf: 1, other: 1 },   // Oct 2025 - add first golf client
        month_8: { golf: 1, other: 2 },   // Nov 2025 - smooth ramp-up
        month_9: { golf: 1, other: 2 },   // Dec 2025 - steady growth
        month_10: { golf: 1, other: 2 },  // Jan 2026 - consistent growth
        month_11: { golf: 2, other: 2 },  // Feb 2026 - preparing for territory expansion
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
    // Dynamic client mix that evolves over time
    clientMixByYear: {
        2025: { golfCourse: 0.3, other: 0.7 },  // Early focus on other clients
        2026: { golfCourse: 0.5, other: 0.5 },  // Balanced approach
        2027: { golfCourse: 0.7, other: 0.3 },  // Shift to golf focus
        2028: { golfCourse: 0.8, other: 0.2 },  // Strong golf focus
        2029: { golfCourse: 0.85, other: 0.15 } // Primarily golf for software
    },
    // Variable client sizes with realistic ranges
    clientProfile: {
        golfCourse: { 
            minAcres: 80, 
            maxAcres: 120,
            initialAcresRange: { min: 8, max: 12 }, // Start SMALL, grow to full size over 3 years
            maturityTimeMonths: 36 // 3 years to reach full maturity
        },
        other: { 
            minAcres: 5, 
            maxAcres: 40,
            initialAcresRange: { min: 3, max: 8 }, // Start small, grow to full size
            maturityTimeMonths: 18 // 1.5 years to reach full maturity
        }
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

    maturityCurve: {
        1: 25,      // Start with 25 acres
        3: 75,      // 75 acres by month 3
        6: 150,     // 150 acres by month 6
        12: 400,    // 400 acres by month 12 (faster growth)
        18: 600,    // 600 acres by month 18
        24: 800,    // 800 acres by month 24
        36: 1000,   // 1,000 acres by month 36
        48: 1200,   // 1,200 acres by month 48 (target ~$67K revenue)
        60: 1200    // Maximum capacity at maturity (aligned with slide targets)
    },

    // --- 1.5. LOCATION GROWTH (SCHEDULE-BASED) ---
    locationAcquisitionSchedule: [
            // Year 1 (Months 0-11): Start with 2, NO NEW LOCATIONS - Foundation phase
            { month: 0, action: 'start', count: 2 },
            // Focus on perfecting operations in existing Knoxville and West Palm territories
            
            // Year 2 (Months 12-23): AGGRESSIVE GROWTH - Add 8 territories (10 total)
            { month: 13, action: 'add', count: 1 },    // Month 13: 3rd territory
            { month: 15, action: 'add', count: 1 },    // Month 15: 4th territory
            { month: 17, action: 'add', count: 1 },    // Month 17: 5th territory
            { month: 19, action: 'add', count: 1 },    // Month 19: 6th territory
            { month: 21, action: 'add', count: 1 },    // Month 21: 7th territory
            { month: 22, action: 'add', count: 1 },    // Month 22: 8th territory
            { month: 23, action: 'add', count: 1 },    // Month 23: 9th territory
            { month: 24, action: 'add', count: 1 },    // Month 24: 10th territory
            
            // Year 3 (Months 25-36): PEAK GROWTH - Add 12 territories (22 total)
            { month: 26, action: 'add', count: 1 },    // Month 26: 11th territory
            { month: 27, action: 'add', count: 1 },    // Month 27: 12th territory
            { month: 28, action: 'add', count: 1 },    // Month 28: 13th territory
            { month: 29, action: 'add', count: 1 },    // Month 29: 14th territory
            { month: 30, action: 'add', count: 1 },    // Month 30: 15th territory
            { month: 31, action: 'add', count: 1 },    // Month 31: 16th territory
            { month: 32, action: 'add', count: 1 },    // Month 32: 17th territory
            { month: 33, action: 'add', count: 1 },    // Month 33: 18th territory
            { month: 34, action: 'add', count: 1 },    // Month 34: 19th territory
            { month: 35, action: 'add', count: 1 },    // Month 35: 20th territory
            { month: 36, action: 'add', count: 1 },    // Month 36: 21st territory
            { month: 37, action: 'add', count: 1 },    // Month 37: 22nd territory
            
            // Year 4 (Months 38-49): CONTINUED GROWTH - Add 8 territories (30 total)
            { month: 39, action: 'add', count: 1 },    // Month 39: 23rd territory
            { month: 40, action: 'add', count: 1 },    // Month 40: 24th territory
            { month: 41, action: 'add', count: 1 },    // Month 41: 25th territory
            { month: 43, action: 'add', count: 1 },    // Month 43: 26th territory
            { month: 45, action: 'add', count: 1 },    // Month 45: 27th territory
            { month: 47, action: 'add', count: 1 },    // Month 47: 28th territory
            { month: 48, action: 'add', count: 1 },    // Month 48: 29th territory
            { month: 49, action: 'add', count: 1 },    // Month 49: 30th territory
            
            // Year 5 (Month 50+): SLOW GROWTH - Focus on software, add 2 territories (32 total)
            { month: 53, action: 'add', count: 1 },    // Month 53: 31st territory
            { month: 57, action: 'add', count: 1 },    // Month 57: 32nd territory
        ],
    locationCapacity: {
        maxGolfCourses: 60,
        maxAcres: 1800,
    },
    newLocationMarketSize: 100,

    // --- YEAR-SPECIFIC COST MULTIPLIERS ---
    costMultipliers: {
        2025: {
            acquisition: 0.3,    // 30% of normal acquisition costs - foundation phase
            operational: 0.6,    // 60% of normal operational costs - minimal operations
            equipment: 0.5,      // 50% of normal equipment costs - basic setup only
        },
        2026: {
            acquisition: 1.2,    // 120% of normal - aggressive growth phase
            operational: 1.0,    // 100% of normal
            equipment: 1.0,      // 100% of normal
        },
        2027: {
            acquisition: 1.0,    // 100% of normal - steady state
            operational: 1.0,    // 100% of normal
            equipment: 1.0,      // 100% of normal
        },
        2028: {
            acquisition: 0.8,    // 80% of normal - more efficient processes
            operational: 0.95,   // 95% of normal - economies of scale
            equipment: 0.9,      // 90% of normal - bulk purchasing
        },
        2029: {
            acquisition: 0.5,    // 50% of normal - software focus, less territory expansion
            operational: 0.9,    // 90% of normal - mature operations
            equipment: 0.8,      // 80% of normal - established infrastructure
        }
    },

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
        ]
    },
    developerSalarySchedule: {
        raise1_month: 10,
        raise1_amount: 4500, // $54K/year
        raise2_month: 18,
        raise2_amount: 7000, // $84K/year
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
// =================================================================================
// TERRASYNC FINANCIAL MODEL - PERSONNEL & HIRING LOGIC
// Version 4.0 - Definitive Realistic Team Structure & Hiring Plan
// =================================================================================

class PersonnelModel {
    constructor(assumptions) {
        this.assumptions = assumptions;
        this.team = []; 
    }

    initializeStartingTeam() {
        this.team = [
            { role: 'Sales Ops', salary: this.assumptions.salaries.salesOps, locationId: 1, startMonth: 0 },
            { role: 'Field Service Tech', salary: this.assumptions.salaries.fieldServiceTech, locationId: 1, startMonth: 0 },
            { role: 'Executive Assistant', salary: this.assumptions.salaries.executiveAssistant, locationId: 1, startMonth: 0 },
        ];
    }

    getFounderSalary(currentARR) {
        const tiers = this.assumptions.founderSalaryTiers;
        if (currentARR >= tiers.level6.threshold) return tiers.level6.salary;
        if (currentARR >= tiers.level5.threshold) return tiers.level5.salary;
        if (currentARR >= tiers.level4.threshold) return tiers.level4.salary;
        if (currentARR >= tiers.level3.threshold) return tiers.level3.salary;
        if (currentARR >= tiers.level2.threshold) return tiers.level2.salary;
        return tiers.level1.salary;
    }

    updateTeam(metrics, month) {
        // --- Scheduled Hires ---
        if (month === 4) {
            const currentDevelopers = this.team.filter(e => e.role === 'Developer').length;
            if (currentDevelopers === 0) {
                for (let i = 0; i < 3; i++) {
                    this.team.push({ role: 'Developer', salary: this.assumptions.salaries.developer, location: 'New Hire', startMonth: month });
                }
            }
        }

        // --- Scheduled Salary Increases for Developers ---
        const devSchedule = this.assumptions.developerSalarySchedule;
        if (month === devSchedule.raise1_month) {
            this.team.forEach(e => { if (e.role === 'Developer') e.salary = devSchedule.raise1_amount; });
        } else if (month === devSchedule.raise2_month) {
            this.team.forEach(e => { if (e.role === 'Developer') e.salary = devSchedule.raise2_amount; });
        }

        // --- REALISTIC Field Service Tech Logic (FIXED VERSION) ---
        // Only service acres need field techs (1 tech per 500 acres of physical turf)
        const serviceAcres = metrics.serviceAcres || 0;
        const currentTechs = this.team.filter(e => e.role === 'Field Service Tech').length;
        const acresPerTech = 500; // Your target ratio
        const requiredTechsByService = Math.max(1, Math.ceil(serviceAcres / acresPerTech));

        // --- Account Manager Hiring Logic ---
        const currentAccountManagers = this.team.filter(e => e.role === 'Account Manager').length;
        const clientCount = metrics.clientCount || 0;
        const currentARR = metrics.currentARR || 0;
        
        // First account manager at 20 clients or $500K ARR
        if (currentAccountManagers === 0 && (clientCount >= 20 || currentARR >= 500000)) {
            this.team.push({ role: 'Account Manager', salary: this.assumptions.salaries.accountManager, location: 'New Hire', startMonth: month });
        }
        // Additional account managers: 1 per 50 clients or per $2M ARR
        else if (currentAccountManagers > 0) {
            const requiredByClients = Math.floor(clientCount / 50);
            const requiredByARR = Math.floor(currentARR / 2000000);
            const requiredAccountManagers = Math.max(requiredByClients, requiredByARR);
            
            if (requiredAccountManagers > currentAccountManagers) {
                this.team.push({ role: 'Account Manager', salary: this.assumptions.salaries.accountManager, location: 'New Hire', startMonth: month });
            }
        }

        // --- Additional Sophisticated Hiring Logic ---
        // Executive Assistant scaling based on team size
        const currentExecAssistants = this.team.filter(e => e.role === 'Executive Assistant').length;
        const totalTeamSize = this.team.length;
        if (currentExecAssistants === 1 && totalTeamSize >= 15) {
            // Add second executive assistant when team reaches 15 people
            this.team.push({ role: 'Executive Assistant', salary: this.assumptions.salaries.executiveAssistant, location: 'New Hire', startMonth: month });
        }

        // Additional developers based on SaaS growth, client demands, and product complexity
        const currentDevelopers = this.team.filter(e => e.role === 'Developer').length;
        const saasRevenue = metrics.saasRevenue || 0; // Monthly SaaS revenue
        
        // Developer scaling logic:
        let requiredDevelopers = 3; // Starting team
        
        if (saasRevenue > 25000 || clientCount >= 100) requiredDevelopers = Math.max(requiredDevelopers, 4);
        if (saasRevenue > 50000 || clientCount >= 200) requiredDevelopers = Math.max(requiredDevelopers, 5);
        if (saasRevenue > 75000 || clientCount >= 300) requiredDevelopers = Math.max(requiredDevelopers, 6);
        
        // Scale beyond 6 developers based on SaaS revenue
        if (saasRevenue > 75000) {
            const scaleDevelopers = Math.min(10, 6 + Math.floor((saasRevenue - 75000) / 40000));
            requiredDevelopers = Math.max(requiredDevelopers, scaleDevelopers);
        }
        
        if (requiredDevelopers > currentDevelopers && month > 3) { // Allow some ramp-up time
            console.log(`Month ${month}: Hiring Developer #${currentDevelopers + 1}. SaaS Revenue: $${saasRevenue}, Clients: ${clientCount}`);
            this.team.push({ role: 'Developer', salary: this.assumptions.salaries.developer, location: 'Remote/HQ', startMonth: month });
        }

        // Sales Ops scaling based on client acquisition rate
        const currentSalesOps = this.team.filter(e => e.role === 'Sales Ops').length;
        const newClientsThisMonth = metrics.newClientsThisMonth || 0;
        if (currentSalesOps === 1 && clientCount >= 100 && newClientsThisMonth >= 8) {
            // Add second sales ops when managing 100+ clients with high acquisition rate
            this.team.push({ role: 'Sales Ops', salary: this.assumptions.salaries.salesOps, location: 'New Hire', startMonth: month });
        }

        // --- LOCATION-BASED SCALING LOGIC ---
        const locationCount = metrics.locationCount || 1;
        const newLocationsThisMonth = metrics.newLocationsThisMonth || 0;

        // Field Service Tech scaling: Ensure adequate coverage per location + service acres
        const clientsPerLocation = Math.floor(clientCount / locationCount);
        if (clientsPerLocation >= 5) {
            const minTechsByLocation = locationCount; // At least 1 tech per established location
            const requiredTechsTotal = Math.max(minTechsByLocation, requiredTechsByService);
            
            if (requiredTechsTotal > currentTechs && serviceAcres > 250) {
                console.log(`Month ${month}: Hiring Field Service Tech. Service Acres: ${serviceAcres}, Locations: ${locationCount}, Required: ${requiredTechsTotal}, Current: ${currentTechs}`);
                this.team.push({ role: 'Field Service Tech', salary: this.assumptions.salaries.fieldServiceTech, location: `Location ${locationCount}`, startMonth: month });
            }
        }

        // Sales Ops scaling: Add regional sales ops for every 4-5 locations
        if (locationCount >= 5 && currentSalesOps < Math.ceil(locationCount / 4)) {
            this.team.push({ role: 'Sales Ops', salary: this.assumptions.salaries.salesOps, location: `Regional - ${Math.ceil(locationCount / 4)}`, startMonth: month });
        }

        // Account Manager regional scaling: 1 per 2-3 locations once locations are established
        if (locationCount >= 3) {
            const requiredAMsByLocation = Math.floor(locationCount / 2.5);
            const requiredAMs = Math.max(requiredAMsByLocation, currentAccountManagers);
            
            if (requiredAMs > currentAccountManagers) {
                this.team.push({ role: 'Account Manager', salary: this.assumptions.salaries.accountManager, location: `Regional - ${requiredAMs}`, startMonth: month });
            }
        }

        // Executive Assistant scaling: Add operations coordinator for multi-location management
        if (locationCount >= 8 && currentExecAssistants < 3) {
            this.team.push({ role: 'Executive Assistant', salary: this.assumptions.salaries.executiveAssistant, location: 'Operations Coordinator', startMonth: month });
        }
    }

    calculateTotalMonthlySalaries(currentARR) {
        // Apply salary scaling based on ARR
        const scaledTeamSalaries = this.team.reduce((sum, employee) => {
            const scaledSalary = this.getScaledSalary(employee.role, currentARR);
            return sum + scaledSalary;
        }, 0);
        
        const founderSalary = this.getFounderSalary(currentARR);
        return scaledTeamSalaries + founderSalary;
    }
    
    getScaledSalary(role, currentARR) {
        // Convert role name to camelCase key for lookup
        const roleKey = this.convertRoleToKey(role);
        
        const scalingConfig = this.assumptions.salaryScaling[roleKey];
        if (!scalingConfig) {
            // No scaling defined, use base salary
            return this.assumptions.salaries[roleKey] || 0;
        }
        
        // Find the highest threshold met
        let applicableSalary = this.assumptions.salaries[roleKey] || 0; // Default to base
        
        for (const tier of scalingConfig) {
            if (currentARR >= tier.arrThreshold) {
                applicableSalary = tier.salary;
            }
        }
        
        return applicableSalary;
    }
    
    convertRoleToKey(role) {
        const roleMapping = {
            'Sales Ops': 'salesOps',
            'Field Service Tech': 'fieldServiceTech',
            'Executive Assistant': 'executiveAssistant',
            'Developer': 'developer',
            'Account Manager': 'accountManager'
        };
        
        return roleMapping[role] || role.toLowerCase().replace(/\s+/g, '');
    }

    getNewHires(month) {
        return this.team.filter(e => e.startMonth === month);
    }
}// =================================================================================
// ENHANCED COST INTEGRATION - Predictive Modeling for Operational Costs
// =================================================================================
class EnhancedCostIntegration {
    constructor() {
        this.predictiveModel = null;
        this.isInitialized = false;
    }

    initializePredictiveModeling() {
        // Placeholder for initializing a more complex predictive model
        // In a real scenario, this might load a pre-trained model or historical data
        this.isInitialized = true;
        console.log("Enhanced Cost Integration Initialized.");
    }

    getCostAnalysisForDashboard(month, totalAcres, territoryCount) {
        if (!this.isInitialized) {
            throw new Error("Enhanced cost model not initialized.");
        }

        // --- Predictive Cost Calculation ---
        // This is a simplified simulation of a predictive model's output.
        // A real model would use more complex inputs and algorithms.

        const baseCostPerAcre = 12; // Base operational cost per acre
        const territoryComplexityFactor = 1 + (territoryCount * 0.05); // Costs increase with more territories
        const techMaturityFactor = 1 - (month * 0.005); // Costs decrease as tech/processes mature
        const seasonalFactor = this.getSeasonalFactor(month); // Costs vary by season

        // 1. Core Per-Acre Costs
        const dynamicCostPerAcre = baseCostPerAcre * territoryComplexityFactor * techMaturityFactor * seasonalFactor;
        const totalPerAcreCost = totalAcres * dynamicCostPerAcre;

        // 2. Fixed & Semi-Fixed Costs per Territory
        const baseTerritoryCost = 1500; // Base monthly cost for a territory (facilities, local admin)
        const totalTerritoryFixedCost = territoryCount * baseTerritoryCost;

        // 3. Equipment-Related Costs (Depreciation, Maintenance, Fuel)
        const equipmentDepreciation = totalAcres * 5; // Simplified depreciation
        const equipmentMaintenance = totalAcres * 3 * seasonalFactor; // Maintenance is higher in peak seasons
        const fuelAndPower = totalAcres * 2;

        // 4. Other Variable Costs
        const insuranceAndPermits = territoryCount * 500 + totalAcres * 0.5;
        const vehicleAndTools = territoryCount * 300;

        // --- Total Cost ---
        const totalCost = totalPerAcreCost + totalTerritoryFixedCost + equipmentDepreciation + equipmentMaintenance + fuelAndPower + insuranceAndPermits + vehicleAndTools;

        return {
            totalCost: totalCost,
            costPerAcre: totalAcres > 0 ? totalCost / totalAcres : 0,
            breakdown: {
                perAcre: totalPerAcreCost,
                facilities: totalTerritoryFixedCost,
                depreciation: equipmentDepreciation,
                maintenance: equipmentMaintenance,
                fuel: fuelAndPower,
                insurance: insuranceAndPermits,
                vehicles: vehicleAndTools,
            }
        };
    }

    getSeasonalFactor(month) {
        // Simple seasonal index (e.g., higher costs in summer for mowing)
        const seasonalFactors = [
            0.8, 0.8, 1.0, 1.2, 1.3, 1.3, // Jan-Jun
            1.2, 1.1, 1.0, 0.9, 0.8, 0.7  // Jul-Dec
        ];
        return seasonalFactors[month % 12];
    }
}// =================================================================================
// TERRASYNC FINANCIAL MODEL - MAIN ENGINE
// Version 4.2 - Corrected Unit Economics Logic
// =================================================================================

class UnifiedFinancialModel {
    constructor(assumptions) {
        this.assumptions = assumptions;
        this.personnelModel = new PersonnelModel(assumptions);
        this.state = {};
        this.projections = [];
    }

    runSimulation(months = 60) {
        this.initializeState();
        for (let month = 0; month < months; month++) {
            this.runMonthlyCycle(month);
        }
        return this.projections;
    }

    initializeState() {
        this.personnelModel.initializeStartingTeam();
        this.state = {
            clients: [
                // Start with clients that will have ~62 acres by July (month 4)
                // Knoxville - mature established clients (~50 acres total)
                { id: 1, type: 'golfCourse', startMonth: -12, age: 12, maxAcres: 120, initialAcres: 10, currentAcres: 35, maturityTimeMonths: 36, saas: { plan: 'none' }, locationId: 1 },
                { id: 2, type: 'other', startMonth: -8, age: 8, maxAcres: 40, initialAcres: 5, currentAcres: 8, maturityTimeMonths: 18, saas: { plan: 'none' }, locationId: 1 },
                { id: 3, type: 'other', startMonth: -6, age: 6, maxAcres: 40, initialAcres: 3, currentAcres: 7, maturityTimeMonths: 18, saas: { plan: 'none' }, locationId: 1 },
                
                // West Palm - newer but growing clients (~12 acres total)  
                { id: 4, type: 'other', startMonth: -4, age: 4, maxAcres: 40, initialAcres: 4, currentAcres: 8, maturityTimeMonths: 18, saas: { plan: 'none' }, locationId: 2 },
                { id: 5, type: 'other', startMonth: -2, age: 2, maxAcres: 40, initialAcres: 2, currentAcres: 4, maturityTimeMonths: 18, saas: { plan: 'none' }, locationId: 2 },
            ],
            locations: this.getTerritoryList(0),
            cumulativeARR: 0,
        };
        this.projections = [];
        
        // Verify initial state
        const initialAcres = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
        console.log(`INITIAL STATE VERIFICATION: ${initialAcres} total acres`);
        console.log(`  Knoxville clients: ${this.state.clients.filter(c => c.locationId === 1).map(c => c.currentAcres).join('+')} = ${this.state.clients.filter(c => c.locationId === 1).reduce((sum, c) => sum + c.currentAcres, 0)} acres`);
        console.log(`  West Palm clients: ${this.state.clients.filter(c => c.locationId === 2).map(c => c.currentAcres).join('+')} = ${this.state.clients.filter(c => c.locationId === 2).reduce((sum, c) => sum + c.currentAcres, 0)} acres`);
    }

    runMonthlyCycle(month) {
        // ULTRA DEBUG: Track acres at every step
        if (month <= 6) {
            const initialAcres = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
            console.log(`\n=== MONTH ${month} ULTRA DEBUG ===`);
            console.log(`BEFORE any changes: ${initialAcres} acres`);
            console.log(`Initial clients:`, this.state.clients.map(c => `${c.type} ${c.currentAcres}acres`));
        }
        
        this.updateLocations(month);
        
        if (month <= 6) {
            const afterLocations = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
            console.log(`AFTER updateLocations: ${afterLocations} acres`);
        }
        
        this.updateClientState(month);
        
        if (month <= 6) {
            const afterClientState = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
            console.log(`AFTER updateClientState: ${afterClientState} acres`);
            console.log(`Client acres after update:`, this.state.clients.map(c => `${c.type} ${c.currentAcres}acres`));
        }
        
        const newClients = this.acquireNewClients(month);
        const newClientsAcquired = newClients.length;
        this.state.clients.push(...newClients);

        if (month <= 6) {
            const afterNewClients = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
            console.log(`AFTER acquireNewClients: ${afterNewClients} acres (added ${newClientsAcquired} clients)`);
        }

        const { churnedClientsCount } = this.applyChurn(month);

        if (month <= 6) {
            const afterChurn = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
            console.log(`AFTER applyChurn: ${afterChurn} acres (churned ${churnedClientsCount} clients)`);
        }

        // Calculate total acres from ACTUAL client data, not theoretical territory data
        const totalAcres = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
        const previousTotalAcres = this.projections.length > 0 ? this.projections[this.projections.length - 1].totalAcres : 0;
        const newAcresThisMonth = totalAcres - previousTotalAcres;
        
        // Track sources of new acres for better understanding
        const newClientAcres = newClients.reduce((sum, c) => sum + c.initialAcres, 0);
        const existingClientGrowthAcres = newAcresThisMonth - newClientAcres;
        
        // Debug acre growth for key months  
        if (month >= 4 && month <= 16) {
            const monthNames = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
            const monthName = monthNames[month % 12];
            const year = month < 12 ? '2025' : '2026';
            
            console.log(`Month ${month} (${monthName} ${year}) ACRE BREAKDOWN:`);
            console.log(`  Total Acres: ${totalAcres.toFixed(1)} (was ${previousTotalAcres.toFixed(1)})`);
            console.log(`  New Acres This Month: ${newAcresThisMonth.toFixed(1)}`);
            console.log(`    - From New Clients: ${newClientAcres.toFixed(1)} (${newClients.length} clients)`);
            console.log(`    - From Existing Growth: ${existingClientGrowthAcres.toFixed(1)}`);
            console.log(`  Active Clients: ${this.state.clients.length}`);
        }

        const revenues = this.calculateRevenues(month, newAcresThisMonth);
        
        const totalRecurringRevenue = revenues.recurring.service + revenues.recurring.saas;
        let weightedGrossMargin = 0;
        if (totalRecurringRevenue > 0) {
            const serviceMargin = this.assumptions.margins.service;
            const saasMargin = this.assumptions.margins.saas;
            weightedGrossMargin = 
                (revenues.recurring.service / totalRecurringRevenue) * serviceMargin +
                (revenues.recurring.saas / totalRecurringRevenue) * saasMargin;
        }

        this.state.cumulativeARR = totalRecurringRevenue * 12;
        
        // Calculate service vs SaaS acres BEFORE calculating costs (needed for field tech hiring)
        let serviceAcres = 0;
        let saasAcres = 0;
        this.state.clients.forEach(client => {
            if (client.type === 'golfCourse' || client.type === 'other') {
                if (month >= 14 && client.saas.plan !== 'none' && client.saas.plan !== 'trial') {
                    saasAcres += client.currentAcres;
                } else {
                    serviceAcres += client.currentAcres;
                }
            }
        });

        // Count SaaS clients for account manager scaling
        const saasClients = this.state.clients.filter(c => 
            (c.type === 'golfCourse' || c.type === 'other') && 
            c.saas.plan !== 'none' && 
            c.saas.plan !== 'trial'
        ).length + this.state.clients.filter(c => c.type === 'saasOnly').length;

        const costs = this.calculateCosts(revenues, month, newClientsAcquired, serviceAcres, saasClients);
        const netCashFlow = revenues.total - costs.totalCosts;

        const currentGolfAcres = this.state.clients.filter(c => c.type === 'golfCourse').reduce((sum, c) => sum + c.currentAcres, 0);
        const newGolfAcres = currentGolfAcres - (this.projections.length > 0 ? this.projections[this.projections.length - 1].golfAcres : 0);
        const newOtherAcres = newAcresThisMonth - newGolfAcres;

        // Debug team data
        if (month % 6 === 0) {
            console.log(`Month ${month} - Team size: ${this.personnelModel.team.length}, Team:`, this.personnelModel.team.map(e => e.role));
        }

        this.projections.push({
            month,
            locations: this.state.locations.length,
            clients: this.state.clients.length,
            newClientsAcquired,
            churnedClients: churnedClientsCount,
            weightedGrossMargin,
            golfClients: this.state.clients.filter(c => c.type === 'golfCourse').length,
            otherClients: this.state.clients.filter(c => c.type === 'other').length,
            saasOnlyClients: this.state.clients.filter(c => c.type === 'saasOnly').length,
            saasGolfClients: this.state.clients.filter(c => c.type === 'golfCourse' && c.saas.plan !== 'none' && c.saas.plan !== 'trial').length,
            avgClientsPerLocation: (this.state.clients.length / this.state.locations.length).toFixed(2),
            avgAcresPerLocation: (totalAcres / this.state.locations.length).toFixed(2),
            totalAcres,
            golfAcres: currentGolfAcres,
            serviceAcres,
            saasAcres,
            newAcresThisMonth,
            newClientAcres, // New acres from acquiring new clients
            existingClientGrowthAcres, // New acres from existing clients expanding
            newGolfAcres,
            newOtherAcres,
            revenues,
            costs,
            netCashFlow,
            cumulativeARR: this.state.cumulativeARR, // FIX: Add the missing ARR value
            // Add team/personnel data
            team: this.personnelModel.team.length,
            newHires: costs.newHiresThisMonth ? costs.newHiresThisMonth.length : 0,
            teamByRole: {
                salesOps: this.personnelModel.team.filter(e => e.role === 'Sales Ops').length,
                fieldServiceTech: this.personnelModel.team.filter(e => e.role === 'Field Service Tech').length,
                developer: this.personnelModel.team.filter(e => e.role === 'Developer').length,
                executiveAssistant: this.personnelModel.team.filter(e => e.role === 'Executive Assistant').length,
                accountManager: this.personnelModel.team.filter(e => e.role === 'Account Manager').length,
            },
        });
    }

    updateLocations(month) {
        const territories = this.getTerritoryList(month);
        this.state.locations = territories;
    }

    getTerritoryCount(month) {
        let totalTerritories = 0;
        for (const event of this.assumptions.locationAcquisitionSchedule) {
            if (event.month <= month) {
                if (event.action === 'start') {
                    totalTerritories = event.count;
                } else if (event.action === 'add') {
                    totalTerritories += event.count;
                }
            }
        }
        return totalTerritories;
    }

    getTerritoryList(currentMonth) {
        const territories = [];
        let territoryId = 1;
        for (const event of this.assumptions.locationAcquisitionSchedule) {
            if (event.month <= currentMonth) {
                if (event.action === 'start') {
                    for (let i = 0; i < event.count; i++) {
                        territories.push({
                            id: territoryId++,
                            startMonth: -12, // Existing locations started 12 months ago
                            age: currentMonth + 12 // They've been operating for 12+ months
                        });
                    }
                } else if (event.action === 'add') {
                    for (let i = 0; i < event.count; i++) {
                        territories.push({
                            id: territoryId++,
                            startMonth: event.month,
                            age: currentMonth - event.month
                        });
                    }
                }
            }
        }
        return territories;
    }

    calculateNewAcresForTerritory(age, month = 0) {
        if (age < 0) return 0;
        
        // 2025 SLOW GROWTH - Foundation phase with very limited new acres
        if (month <= 11) { // Months 0-11 = 2025
            if (age <= 3) return 2;    // Very slow growth - 2 acres/month
            if (age <= 6) return 1.5;  // Minimal growth
            if (age <= 12) return 1;   // Barely growing
            return 0.5;                // Maintenance only
        }
        
        // 2026+ NORMAL GROWTH - Back to regular expansion
        if (age <= 3) return 25;    // High growth first 3 months
        if (age <= 6) return 20;    // Good growth months 3-6
        if (age <= 12) return 15;   // Steady growth months 6-12
        if (age <= 24) return 12;   // Slower growth months 12-24
        if (age <= 36) return 8;    // Mature growth months 24-36
        return 5;                   // Maintenance growth 36+
    }

    calculateTotalAcres(month) {
        // ALWAYS use actual client data - no more territory calculations!
        return this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
    }

    calculateTerritoryAcres(age) {
        if (age < 0) return 0;
        
        // Find the appropriate maturity level
        const maturityKeys = Object.keys(this.assumptions.maturityCurve).map(k => parseInt(k)).sort((a, b) => a - b);
        
        for (const months of maturityKeys) {
            if (age <= months) {
                return this.assumptions.maturityCurve[months];
            }
        }
        
        return this.assumptions.maturityCurve[60]; // Mature capacity
    }

    acquireNewClients(month) {
        const newClientsList = [];
        const year = 2025 + Math.floor(month / 12);

        console.log(`\n=== ACQUIRE NEW CLIENTS DEBUG - MONTH ${month} ===`);
        console.log(`Year calculated: ${year}`);
        console.log(`Month/12 = ${month}/12 = ${month / 12}`);
        console.log(`Math.floor(${month / 12}) = ${Math.floor(month / 12)}`);

        // For the first year (2025), use the controlled acquisition schedule
        if (year === 2025) {
            console.log(`Using CONTROLLED SCHEDULE for 2025`);
            const monthKey = `month_${month}`;
            const schedule = this.assumptions.firstYearAcquisitionSchedule[monthKey];
            
            console.log(`Looking for schedule key: ${monthKey}`);
            console.log(`Schedule found:`, schedule);
            
            if (schedule) {
                console.log(`CONTROLLED: Adding ${schedule.golf} golf + ${schedule.other} other clients`);
                
                // Add golf clients
                for (let i = 0; i < schedule.golf; i++) {
                    newClientsList.push(this.createNewClient(month, 'golfCourse', month < 6 ? 1 : 2));
                }
                
                // Add other clients  
                for (let i = 0; i < schedule.other; i++) {
                    newClientsList.push(this.createNewClient(month, 'other', month < 6 ? 1 : 2));
                }
            } else {
                console.log(`NO SCHEDULE FOUND for ${monthKey} - adding 0 clients`);
            }
        } else {
            console.log(`Using TERRITORY-BASED ACQUISITION for ${year}`);
            const territories = this.getTerritoryList(month);
            console.log(`Territories found:`, territories.length, territories);

            territories.forEach(loc => {
                const acresInLocation = this.state.clients.filter(c => c.locationId === loc.id).reduce((sum, c) => sum + c.currentAcres, 0);
                const newAcres = this.calculateNewAcresForTerritory(loc.age, month);
                
                console.log(`Territory ${loc.id}: age=${loc.age}, newAcres=${newAcres}, currentAcres=${acresInLocation}`);

                if (acresInLocation < this.assumptions.locationCapacity.maxAcres) {
                    const clientMix = this.assumptions.clientMixByYear[year] || this.assumptions.clientMixByYear[2029];
                    const golfProbability = clientMix.golfCourse;
                    
                    let avgClientSize = 12;
                    const newClients = Math.max(1, Math.floor(newAcres / avgClientSize));
                    
                    console.log(`TERRITORY: Adding ${newClients} clients for territory ${loc.id}`);
                    
                    for (let i = 0; i < newClients; i++) {
                        const isGolfCourse = Math.random() < golfProbability;
                        const clientType = isGolfCourse ? 'golfCourse' : 'other';
                        newClientsList.push(this.createNewClient(month, clientType, loc.id));
                    }
                }
            });
        }

        // Direct SaaS-only client acquisition (software-native customers)
        const { directToSaaSAcquisition } = this.assumptions.saas;
        if (directToSaaSAcquisition[year]) {
            const annualSaaSClients = directToSaaSAcquisition[year];
            const monthlySaaSClients = annualSaaSClients / 12;
            const startOfYearMonth = (year - 2025) * 12;
            const saasClientsAddedThisYear = this.state.clients.filter(c => c.type === 'saasOnly' && c.startMonth >= startOfYearMonth && c.startMonth < month).length;
            
            // Check if we should add a SaaS-only client this month
            const targetSaaSClientsForThisMonth = Math.floor((month - startOfYearMonth + 1) * monthlySaaSClients);
            if (targetSaaSClientsForThisMonth > saasClientsAddedThisYear) {
                console.log(`Adding direct SaaS client in month ${month} for year ${year}`);
                newClientsList.push(this.createSaaSClient(month, 'smallTeam'));
            }
        }

        console.log(`TOTAL NEW CLIENTS CREATED: ${newClientsList.length}`);
        return newClientsList;
    }

    createNewClient(month, clientType, locationId = null) {
        const profile = this.assumptions.clientProfile[clientType];
        const startsOnTrial = Math.random() < this.assumptions.saas.freemium.initialAdoptionRate;
        
        // Variable client sizes within realistic ranges
        const initialRange = profile.initialAcresRange;
        const initialAcres = Math.floor(Math.random() * (initialRange.max - initialRange.min + 1)) + initialRange.min;
        const maxAcres = Math.floor(Math.random() * (profile.maxAcres - profile.minAcres + 1)) + profile.minAcres;
        
        return {
            id: this.state.clients.length + this.projections.length + 1,
            type: clientType,
            startMonth: month,
            age: 0,
            maxAcres: Math.max(maxAcres, initialAcres), // Ensure maxAcres >= initialAcres
            initialAcres: initialAcres,
            currentAcres: initialAcres,
            maturityTimeMonths: profile.maturityTimeMonths,
            saas: { plan: startsOnTrial ? 'trial' : 'none', trialEndMonth: month + this.assumptions.saas.freemium.trialPeriodMonths, users: 1 },
            locationId: locationId || (Math.random() < 0.5 ? 1 : 2)
        };
    }

    updateClientAcres(month) {
        this.state.clients.forEach(client => {
            if (client.age < client.maturityTimeMonths) {
                // Different growth curves for different client types
                let growthProgress;
                
                if (client.type === 'golfCourse') {
                    // Golf courses: Slower start, then accelerate, then plateau (3 years)
                    const normalizedAge = client.age / client.maturityTimeMonths;
                    if (normalizedAge < 0.2) {
                        growthProgress = normalizedAge * 0.5; // Slow start - 10% in first 20% of time
                    } else if (normalizedAge < 0.7) {
                        growthProgress = 0.1 + (normalizedAge - 0.2) * 1.6; // Accelerate - 80% in middle 50% of time
                    } else {
                        growthProgress = 0.9 + (normalizedAge - 0.7) * 0.33; // Plateau - final 10% in last 30% of time
                    }
                } else {
                    // Other clients: More linear growth (1.5 years)
                    growthProgress = Math.pow(client.age / client.maturityTimeMonths, 0.8);
                }
                
                const targetAcres = client.initialAcres + (client.maxAcres - client.initialAcres) * growthProgress;
                client.currentAcres = Math.min(targetAcres, client.maxAcres);
            }
        });
    }

    createSaaSClient(month, saasPlan) {
        return {
            id: this.state.clients.length + this.projections.length + 1,
            type: 'saasOnly',
            startMonth: month,
            age: 0,
            maxAcres: 0,
            initialAcres: 0,
            currentAcres: 0,
            saas: { plan: saasPlan, trialEndMonth: -1, users: 1 },
            locationId: null
        };
    }

    updateClientState(month) {
        const year = 2025 + Math.floor(month / 12);
        const conversionRate = this.assumptions.serviceToSaaSConversionRate[year] || 0;
        const monthlyConversionRate = conversionRate / 12;

        this.state.clients.forEach(client => {
            client.age++;
            if ((client.type === 'golfCourse' || client.type === 'other') && client.saas.plan === 'none' && conversionRate > 0) {
                if (Math.random() < monthlyConversionRate) client.saas.plan = 'smallTeam';
            }
            if (client.saas.plan === 'trial' && month >= client.saas.trialEndMonth) {
                const freemiumConversionRate = this.assumptions.saas.freemium.conversionToPaidRate + (this.assumptions.saas.freemium.saasMaturityBonus * month);
                client.saas.plan = Math.random() < freemiumConversionRate ? 'smallTeam' : 'none';
            }
            // Enable client growth from the beginning, not just after month 12
            if (client.currentAcres < client.maxAcres && client.age >= 0) {
                const clientAgeInYears = Math.floor(client.age / 12);
                const growthRateKey = `year${clientAgeInYears + 1}`;
                const growthRate = this.assumptions.clientAcreageGrowthCurve[growthRateKey] || 0.30; // Default to 30% year 1 growth
                const potentialGrowth = (client.maxAcres - client.initialAcres) * growthRate;
                client.currentAcres = Math.min(client.maxAcres, client.currentAcres + (potentialGrowth / 12));
            }

            // SaaS Upgrades and Add-ons Logic
            if (client.saas.plan !== 'none' && client.saas.plan !== 'trial') {
                // Tier upgrades
                if (client.saas.plan === 'smallTeam' && client.age > 18 && Math.random() < 0.15) { // 15% chance to upgrade after 18 months
                    client.saas.plan = 'professional';
                } else if (client.saas.plan === 'professional' && client.age > 30 && Math.random() < 0.10) { // 10% chance to upgrade after 30 months
                    client.saas.plan = 'enterprise';
                }

                // Add-on adoption
                if (!client.saas.addOns) client.saas.addOns = {};

                if (!client.saas.addOns.aiFeatures && client.age > 12 && Math.random() < 0.20) { // 20% chance to adopt after 12 months
                    client.saas.addOns.aiFeatures = true;
                }
                if (!client.saas.addOns.premiumSupport && client.age > 6 && Math.random() < 0.15) { // 15% chance to adopt after 6 months
                    client.saas.addOns.premiumSupport = true;
                }
            }
        });
    }

    applyChurn(month) {
        const year = 2025 + Math.floor(month / 12);
        const churnRate = this.assumptions.churnRateSchedule[year] || 0.005;
        const clientsBeforeChurn = this.state.clients.length;
        this.state.clients = this.state.clients.filter(c => c.age <= this.assumptions.minClientAgeForChurnMonths || Math.random() >= churnRate);
        const churnedClientsCount = clientsBeforeChurn - this.state.clients.length;
        return { churnedClientsCount };
    }

    calculateRevenues(month, newAcresThisMonth) {
        let serviceRevenue = 0, installationRevenue = 0, productRevenue = 0, saasRevenue = 0;

        // Core installation/product revenue from new acres ONLY (one-time per acre)
        if (newAcresThisMonth > 0) {
            installationRevenue = newAcresThisMonth * this.assumptions.revenueStreams.installationPerAcre;
            productRevenue = newAcresThisMonth * this.assumptions.revenueStreams.productSalePerAcre;
        }

        // NO recurring product sales - product revenue only happens with new acres

        this.state.clients.forEach(client => {
            let isSaaSPaying = false;
            if (month >= 14 && client.saas.plan !== 'none' && client.saas.plan !== 'trial') {
                const tierInfo = this.assumptions.saas.pricingTiers[client.saas.plan];
                if (tierInfo) {
                    let monthlySaasValue = tierInfo.price;
                    // Add revenue from add-ons
                    if (client.saas.addOns) {
                        if (client.saas.addOns.aiFeatures) {
                            monthlySaasValue += this.assumptions.saas.addOns.aiFeatures;
                        }
                        if (client.saas.addOns.premiumSupport) {
                            monthlySaasValue += this.assumptions.saas.addOns.premiumSupport;
                        }
                    }
                    saasRevenue += monthlySaasValue;
                    isSaaSPaying = true;
                }
            }
            if (!isSaaSPaying && (client.type === 'golfCourse' || client.type === 'other')) {
                serviceRevenue += client.currentAcres * this.assumptions.revenueStreams.servicePerAcreMonthly;
            }
        });

        return { 
            total: serviceRevenue + installationRevenue + productRevenue + saasRevenue, 
            breakdown: { serviceRevenue, installationRevenue, productRevenue, saasRevenue }, 
            recurring: { service: serviceRevenue, saas: saasRevenue }, 
            oneTime: { installation: installationRevenue, product: productRevenue } 
        };
    }


    calculateCosts(revenues, month, newClientsThisMonthCount, serviceAcres = 0, saasClients = 0) {
        const totalAcres = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
        const newLocationsThisMonth = this.state.locations.filter(loc => loc.startMonth === month);
        const metrics = {
            totalAcres,
            serviceAcres, // Add serviceAcres for realistic field tech hiring
            saasClients, // Add saasClients for account manager scaling
            clientCount: this.state.clients.length,
            currentARR: this.state.cumulativeARR,
            saasRevenue: revenues.breakdown?.saasRevenue || 0,
            newClientsThisMonth: newClientsThisMonthCount,
            locationCount: this.state.locations.length,
            newLocationsThisMonth: newLocationsThisMonth.length
        };
        this.personnelModel.updateTeam(metrics, month);
        const newHiresThisMonth = this.personnelModel.getNewHires(month);

        // --- ENHANCED COST CALCULATION ---
        const opAssumptions = this.assumptions.operationalCosts;
        const acqAssumptions = this.assumptions.acquisitionCosts;
        const year = 2025 + Math.floor(month / 12);
        
        // Initialize enhanced cost integration if not already done
        if (!this.enhancedCostIntegration) {
            this.enhancedCostIntegration = new EnhancedCostIntegration();
            this.enhancedCostIntegration.initializePredictiveModeling();
        }
        
        // Calculate enhanced territory costs
        const territoryCount = this.state.locations.length;
        let enhancedCostAnalysis;
        try {
            enhancedCostAnalysis = this.enhancedCostIntegration.getCostAnalysisForDashboard(month, totalAcres, territoryCount);
        } catch (error) {
            console.warn("Enhanced cost integration failed:", error);
            enhancedCostAnalysis = {
                totalCost: 0,
                costPerAcre: 0,
                breakdown: {
                    depreciation: 0, maintenance: 0, fuel: 0, electricity: 0, labor: 0, insurance: 0, 
                    vehicles: 0, tools: 0, perAcre: 0, facilities: 0, permits: 0, management: 0, marketing: 0, other: 0
                }
            };
        }
        
        // Apply year-specific cost multipliers
        const yearMultipliers = this.assumptions.costMultipliers[year] || this.assumptions.costMultipliers[2027]; // Default to 2027 if year not found
        
        // --- 1. ACQUISITION COSTS ---
        let totalAcquisitionCosts = 0;
        const newClientsThisMonth = this.state.clients.filter(c => c.startMonth === month);

        // 1a. Direct Client Costs
        if (newClientsThisMonth.length > 0) {
            totalAcquisitionCosts += newClientsThisMonth.length * (acqAssumptions.per_client.travel + acqAssumptions.per_client.entertainment);
            
            let salesCommission = 0;
            const commissionRate = acqAssumptions.personnel_allocation.sales_commission_rate;
            newClientsThisMonth.forEach(client => {
                if (client.type === 'saasOnly') return;
                const firstYearServiceRevenue = client.initialAcres * this.assumptions.revenueStreams.servicePerAcreMonthly * 12;
                const oneTimeRevenue = client.initialAcres * (this.assumptions.revenueStreams.installationPerAcre + this.assumptions.revenueStreams.productSalePerAcre);
                salesCommission += (firstYearServiceRevenue + oneTimeRevenue) * commissionRate;
            });
            totalAcquisitionCosts += salesCommission;
        }

        // 1b. S&M Operational Costs
        const smBudgets = acqAssumptions.general_S_and_M;
        const acquisitionCostMultiplier = yearMultipliers.acquisition;
        
        let marketingBudget = 0;
        if (month <= 6) marketingBudget = smBudgets.base_marketing_budget.months_0_6;
        else if (month <= 12) marketingBudget = smBudgets.base_marketing_budget.months_7_12;
        else if (month <= 24) marketingBudget = smBudgets.base_marketing_budget.months_13_24;
        else marketingBudget = smBudgets.base_marketing_budget.months_25_plus;
        totalAcquisitionCosts += marketingBudget * acquisitionCostMultiplier;

        let conferenceBudget = 0;
        if (year === 2025) conferenceBudget = smBudgets.annual_conference_budget.year_1;
        else if (year === 2026) conferenceBudget = smBudgets.annual_conference_budget.year_2;
        else conferenceBudget = smBudgets.annual_conference_budget.year_3_plus;
        totalAcquisitionCosts += (conferenceBudget / 12) * acquisitionCostMultiplier;

        let swagBudget = 0;
        if (year === 2025) swagBudget = smBudgets.annual_swag_budget.year_1;
        else if (year === 2026) swagBudget = smBudgets.annual_swag_budget.year_2;
        else swagBudget = smBudgets.annual_swag_budget.year_3_plus;
        totalAcquisitionCosts += (swagBudget / 12) * acquisitionCostMultiplier;

        // 1c. S&M Personnel & Software
        const salesOpsEmployees = this.personnelModel.team.filter(e => e.role === 'Sales Ops');
        const salesOpsSalary = salesOpsEmployees.reduce((sum, e) => sum + e.salary, 0);
        const founderSalary = this.personnelModel.getFounderSalary(this.state.cumulativeARR);
        const salesOpsSalaryAllocation = salesOpsSalary * acqAssumptions.personnel_allocation.sales_ops_allocation;
        const founderSalaryAllocation = founderSalary * acqAssumptions.personnel_allocation.founder_sales_allocation;
        totalAcquisitionCosts += salesOpsSalaryAllocation + founderSalaryAllocation;
        
        const salesTeamCount = salesOpsEmployees.length + 1; // +1 for founder
        totalAcquisitionCosts += salesTeamCount * smBudgets.sales_software_seat_cost;

        // 1d. Demo Equipment Costs
        // One-time demo equipment cost for new locations
        if (newLocationsThisMonth.length > 0) {
            totalAcquisitionCosts += newLocationsThisMonth.length * acqAssumptions.per_location.one_time_demo_equipment;
        }
        
        // Annual demo equipment upkeep (monthly portion)
        const totalLocations = this.state.locations.length;
        totalAcquisitionCosts += (totalLocations * acqAssumptions.per_location.annual_demo_upkeep) / 12;

        // --- 2. OPERATIONAL COSTS ---
        let totalOperationalCosts = 0;

        // Apply year-specific operational cost multipliers
        const operationalCostMultiplier = yearMultipliers.operational;
        
        // 2a. G&A Costs
        const gna = opAssumptions.G_and_A;
        let professionalServicesCost = 0;
        if (this.state.cumulativeARR < gna.professional_services_monthly.tier1_max_arr) professionalServicesCost = gna.professional_services_monthly.tier1_cost;
        else if (this.state.cumulativeARR < gna.professional_services_monthly.tier2_max_arr) professionalServicesCost = gna.professional_services_monthly.tier2_cost;
        else professionalServicesCost = gna.professional_services_monthly.tier3_cost;
        
        totalOperationalCosts += professionalServicesCost * operationalCostMultiplier;
        totalOperationalCosts += gna.general_business_software_per_employee * this.personnelModel.team.length * operationalCostMultiplier;
        totalOperationalCosts += (gna.corporate_insurance_annual.base + gna.corporate_insurance_annual.per_location_adder * this.state.locations.length) / 12 * operationalCostMultiplier;

        // 2b. Tech & IT Costs
        const tech = opAssumptions.tech_and_it;
        totalOperationalCosts += tech.it_security_software_per_employee * this.personnelModel.team.length * operationalCostMultiplier;
        totalOperationalCosts += newHiresThisMonth.length * tech.new_hire_tech_kit * operationalCostMultiplier;
        
        // Training costs for new hires
        totalOperationalCosts += newHiresThisMonth.length * tech.new_hire_training_cost * operationalCostMultiplier;
        
        // Ongoing training budget for all employees (annual cost spread monthly)
        totalOperationalCosts += (this.personnelModel.team.length * tech.ongoing_training_budget_per_employee_annual / 12) * operationalCostMultiplier;

        // 2c. Location-Based Costs
        const locCosts = opAssumptions.per_location;
        totalOperationalCosts += newLocationsThisMonth.length * locCosts.one_time_security_setup * operationalCostMultiplier;
        totalOperationalCosts += this.state.locations.length * (locCosts.base_operational_costs + locCosts.annual_insurance / 12) * operationalCostMultiplier;
        
        // 2d. West Palm Commission (Special Case)
        const westPalmClients = this.state.clients.filter(c => c.locationId === 2);
        const westPalmRevenue = westPalmClients.reduce((sum, c) => sum + (c.currentAcres * this.assumptions.revenueStreams.servicePerAcreMonthly), 0);
        const westPalmOpEx = westPalmClients.reduce((sum, c) => sum + (opAssumptions.per_location.base_operational_costs), 0);
        const westPalmCommission = Math.max(0, (westPalmRevenue - westPalmOpEx) * 0.40);
        totalOperationalCosts += westPalmCommission;

        // 3. Salaries (Unallocated Portion)
        const totalSalaryCosts = this.personnelModel.calculateTotalMonthlySalaries(this.state.cumulativeARR);
        const unallocatedSalaries = totalSalaryCosts - (salesOpsSalaryAllocation + founderSalaryAllocation);
        
        // Add enhanced territory operational costs (apply equipment multiplier)
        const enhancedTerritoryCosts = (enhancedCostAnalysis.totalCost || 0) * yearMultipliers.equipment;
        
        // Ensure all values are numbers and not NaN
        const cleanUnallocatedSalaries = isNaN(unallocatedSalaries) ? 0 : unallocatedSalaries;
        const cleanAcquisitionCosts = isNaN(totalAcquisitionCosts) ? 0 : totalAcquisitionCosts;
        const cleanOperationalCosts = isNaN(totalOperationalCosts) ? 0 : totalOperationalCosts;
        const cleanEnhancedCosts = isNaN(enhancedTerritoryCosts) ? 0 : enhancedTerritoryCosts;
        
        const totalCosts = cleanUnallocatedSalaries + cleanAcquisitionCosts + cleanOperationalCosts + cleanEnhancedCosts;
        
        // Debug logging for first few months
        if (month <= 3) {
            console.log(`Month ${month} DETAILED COSTS:`);
            console.log(`  New Locations This Month: ${newLocationsThisMonth.length}`);
            console.log(`  Demo Equipment Costs: $${newLocationsThisMonth.length * acqAssumptions.per_location.one_time_demo_equipment}`);
            console.log(`  Marketing Budget: Monthly marketing cost applied`);
            console.log(`  Salary: $${cleanUnallocatedSalaries}, Acquisition: $${cleanAcquisitionCosts}, Operational: $${cleanOperationalCosts}, Enhanced: $${cleanEnhancedCosts}`);
            console.log(`  Total: $${totalCosts}`);
        }
        
        return { 
            totalCosts, 
            breakdown: { 
                salaryCosts: cleanUnallocatedSalaries, 
                totalAcquisitionCosts: cleanAcquisitionCosts, 
                totalOperationalCosts: cleanOperationalCosts,
                enhancedTerritoryCosts: cleanEnhancedCosts
            },
            enhancedCostAnalysis: enhancedCostAnalysis,
            newHiresThisMonth: newHiresThisMonth
        };
    }
}