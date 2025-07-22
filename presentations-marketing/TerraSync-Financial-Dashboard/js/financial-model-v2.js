// =================================================================================
// TERRASYNC FINANCIAL MODEL - MAIN ENGINE
// Version 4.2 - Corrected Unit Economics Logic
// =================================================================================

class FinancialModelV2 {
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
                { id: 1, type: 'golfCourse', startMonth: -2, age: 2, maxAcres: 120, initialAcres: 10, currentAcres: 10, saas: { plan: 'none' }, locationId: 1 },
                { id: 2, type: 'golfCourse', startMonth: -1, age: 1, maxAcres: 120, initialAcres: 10, currentAcres: 10, saas: { plan: 'none' }, locationId: 1 },
            ],
            locations: [
                { id: 1, name: 'Knoxville', startMonth: -12, marketSize: 20, age: 12 },
                { id: 2, name: 'West Palm', startMonth: -1, marketSize: 120, age: 1 },
            ],
            cumulativeARR: 0,
        };
        this.projections = [];
    }

    runMonthlyCycle(month) {
        this.updateLocations(month);
        this.updateClientState(month);
        
        const newClients = this.acquireNewClients(month);
        const newClientsAcquired = newClients.length;
        this.state.clients.push(...newClients);

        const { churnedClientsCount } = this.applyChurn(month);

        const totalAcres = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
        const previousTotalAcres = this.projections.length > 0 ? this.projections[this.projections.length - 1].totalAcres : 0;
        const newAcresThisMonth = totalAcres - previousTotalAcres;

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
        const costs = this.calculateCosts(revenues, month, newClientsAcquired);
        const netCashFlow = revenues.total - costs.totalCosts;

        const currentGolfAcres = this.state.clients.filter(c => c.type === 'golfCourse').reduce((sum, c) => sum + c.currentAcres, 0);
        const newGolfAcres = currentGolfAcres - (this.projections.length > 0 ? this.projections[this.projections.length - 1].golfAcres : 0);
        const newOtherAcres = newAcresThisMonth - newGolfAcres;

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

        this.projections.push({
            month,
            locations: this.state.locations.length,
            clients: this.state.clients.length,
            newClientsAcquired,
            churnedClients: churnedClientsCount,
            weightedGrossMargin,
            golfClients: this.state.clients.filter(c => c.type === 'golfCourse').length,
            otherClients: this.state.clients.filter(c => c.type === 'other' || c.type === 'saasOnly').length,
            saasGolfClients: this.state.clients.filter(c => c.type === 'golfCourse' && c.saas.plan !== 'none' && c.saas.plan !== 'trial').length,
            avgClientsPerLocation: (this.state.clients.length / this.state.locations.length).toFixed(2),
            avgAcresPerLocation: (totalAcres / this.state.locations.length).toFixed(2),
            totalAcres,
            golfAcres: currentGolfAcres,
            serviceAcres,
            saasAcres,
            newAcresThisMonth,
            newGolfAcres,
            newOtherAcres,
            revenues,
            costs,
            netCashFlow,
        });
    }

    updateLocations(month) {
        this.state.locations.forEach(loc => loc.age++);
        const year = 2025 + Math.floor(month / 12);
        const schedule = this.assumptions.locationAcquisitionSchedule;

        if (schedule[year]) {
            const locationsToAddThisYear = schedule[year];
            const monthOfYear = month % 12;
            const locationsAddedSoFarThisYear = this.state.locations.filter(loc => loc.startMonth >= (year - 2025) * 12 && loc.startMonth < month).length;
            const interval = 12 / locationsToAddThisYear;

            if (locationsAddedSoFarThisYear < locationsToAddThisYear && monthOfYear >= locationsAddedSoFarThisYear * interval) {
                const newLocationId = this.state.locations.length + 1;
                this.state.locations.push({ id: newLocationId, name: `New Location ${newLocationId}`, startMonth: month, marketSize: this.assumptions.newLocationMarketSize, age: 0 });
            }
        }
    }

    acquireNewClients(month) {
        const newClientsList = [];
        const schedule = this.assumptions.firstYearAcquisitionSchedule;
        const monthKey = `month_${month}`;

        if (month < 12) {
            if (schedule[monthKey]) {
                for (let i = 0; i < schedule[monthKey].golf; i++) newClientsList.push(this.createNewClient(month, 'golfCourse'));
                for (let i = 0; i < schedule[monthKey].other; i++) newClientsList.push(this.createNewClient(month, 'other'));
            }
        } else {
            const year = 2025 + Math.floor(month / 12);
            const { clientAcquisitionRateSchedule, locationCapacity } = this.assumptions;
            if (clientAcquisitionRateSchedule[year]) {
                const { golf, other } = clientAcquisitionRateSchedule[year];
                this.state.locations.forEach(loc => {
                    const golfCoursesInLocation = this.state.clients.filter(c => c.locationId === loc.id && c.type === 'golfCourse').length;
                    const acresInLocation = this.state.clients.filter(c => c.locationId === loc.id).reduce((sum, c) => sum + c.currentAcres, 0);
                    if (golfCoursesInLocation < locationCapacity.maxGolfCourses && acresInLocation < locationCapacity.maxAcres) {
                        if (Math.random() < golf) newClientsList.push(this.createNewClient(month, 'golfCourse', loc.id));
                        if (Math.random() < other) newClientsList.push(this.createNewClient(month, 'other', loc.id));
                    }
                });
            }
        }

        const year = 2025 + Math.floor(month / 12);
        const { directToSaaSAcquisition } = this.assumptions.saas;
        if (directToSaaSAcquisition[year]) {
            const annualSaaSClients = directToSaaSAcquisition[year];
            const monthlySaaSClients = annualSaaSClients / 12;
            const startOfYearMonth = (year - 2025) * 12;
            const saasClientsAddedThisYear = this.state.clients.filter(c => c.type === 'saasOnly' && c.startMonth >= startOfYearMonth && c.startMonth < month).length;
            if ((month - startOfYearMonth + 1) * monthlySaaSClients > saasClientsAddedThisYear) {
                newClientsList.push(this.createSaaSClient(month, 'smallTeam'));
            }
        }
        return newClientsList;
    }

    createNewClient(month, clientType, locationId = null) {
        const profile = this.assumptions.clientProfile[clientType];
        const startsOnTrial = Math.random() < this.assumptions.saas.freemium.initialAdoptionRate;
        return {
            id: this.state.clients.length + this.projections.length + 1,
            type: clientType,
            startMonth: month,
            age: 0,
            maxAcres: profile.maxAcres,
            initialAcres: profile.initialAcres,
            currentAcres: profile.initialAcres,
            saas: { plan: startsOnTrial ? 'trial' : 'none', trialEndMonth: month + this.assumptions.saas.freemium.trialPeriodMonths, users: 1 },
            locationId: locationId || (Math.random() < 0.5 ? 1 : 2)
        };
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
            if (month >= 12 && client.currentAcres < client.maxAcres) {
                const clientAgeInYears = Math.floor(client.age / 12);
                const growthRateKey = `year${clientAgeInYears + 1}`;
                const growthRate = this.assumptions.clientAcreageGrowthCurve[growthRateKey] || 0;
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

        // Core installation/product revenue from new acres (existing logic)
        if (newAcresThisMonth > 0) {
            installationRevenue = newAcresThisMonth * this.assumptions.revenueStreams.installationPerAcre;
            productRevenue = newAcresThisMonth * this.assumptions.revenueStreams.productSalePerAcre;
        }

        // Add recurring product sales from existing clients (equipment replacements, upgrades, maintenance products)
        const existingClientsProductSales = this.calculateRecurringProductSales(month);
        productRevenue += existingClientsProductSales;

        const newSaaSOnlyClientsCount = this.state.clients.filter(c => c.age === 0 && c.type === 'saasOnly').length;
        if (newSaaSOnlyClientsCount > 0) {
            const saasClientsBuyingProduct = newSaaSOnlyClientsCount * this.assumptions.saas.saasProductSales.adoptionRate;
            productRevenue += saasClientsBuyingProduct * this.assumptions.saas.saasProductSales.averagePurchaseValue;
        }

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

    calculateRecurringProductSales(month) {
        // Realistic recurring product sales: equipment replacements, upgrades, maintenance products
        let recurringProductRevenue = 0;
        
        // Only start recurring sales after month 6 (business is established)
        if (month < 6) return 0;
        
        // Filter existing clients (not brand new this month)
        const existingClients = this.state.clients.filter(c => c.age > 0);
        
        existingClients.forEach(client => {
            if (client.type === 'saasOnly') return; // SaaS-only clients don't buy maintenance products
            
            // Base monthly purchase probability based on client age and acres
            let purchaseProbability = 0.02; // 2% base chance per month
            
            // Older clients more likely to need replacements
            if (client.age > 24) purchaseProbability += 0.01; // +1% for clients over 2 years
            if (client.age > 48) purchaseProbability += 0.01; // +1% for clients over 4 years
            
            // Larger clients more likely to need ongoing products
            if (client.currentAcres > 50) purchaseProbability += 0.005;
            if (client.currentAcres > 100) purchaseProbability += 0.005;
            
            // Seasonal adjustment (higher in spring/summer)
            const seasonalMultiplier = this.getSeasonalProductMultiplier(month);
            purchaseProbability *= seasonalMultiplier;
            
            // Random purchase decision
            if (Math.random() < purchaseProbability) {
                // Average recurring purchase value (lower than initial product sale)
                const averageRecurringPurchase = 800 + (client.currentAcres * 8); // $800 base + $8 per acre
                recurringProductRevenue += averageRecurringPurchase;
            }
        });
        
        return recurringProductRevenue;
    }
    
    getSeasonalProductMultiplier(month) {
        // Seasonal pattern for product sales (higher in spring/summer)
        const seasonalFactors = [
            0.8, 0.8, 1.0, 1.2, 1.3, 1.3, // Jan-Jun
            1.2, 1.2, 1.1, 1.0, 0.9, 0.8  // Jul-Dec
        ];
        return seasonalFactors[month % 12];
    }

    calculateCosts(revenues, month, newClientsThisMonthCount) {
        const totalAcres = this.state.clients.reduce((sum, c) => sum + c.currentAcres, 0);
        this.personnelModel.updateTeam({ totalAcres }, month);
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
        
        // Apply 2025 bootstrap scaling - use existing year variable
        const is2025 = year === 2025;
        
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
        const acquisitionCostMultiplier = is2025 ? 0.5 : 1.0; // 50% of normal acquisition costs for 2025
        
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

        // --- 2. OPERATIONAL COSTS ---
        let totalOperationalCosts = 0;

        // Apply 2025 bootstrap scaling to reduce operational costs
        const operationalCostMultiplier = is2025 ? 0.3 : 1.0; // 30% of normal operational costs for 2025
        
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

        // 2c. Location-Based Costs
        const locCosts = opAssumptions.per_location;
        const newLocationsThisMonth = this.state.locations.filter(loc => loc.startMonth === month).length;
        totalOperationalCosts += newLocationsThisMonth * locCosts.one_time_security_setup * operationalCostMultiplier;
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
        
        // Add enhanced territory operational costs
        const enhancedTerritoryCosts = enhancedCostAnalysis.totalCost || 0;
        
        // Ensure all values are numbers and not NaN
        const cleanUnallocatedSalaries = isNaN(unallocatedSalaries) ? 0 : unallocatedSalaries;
        const cleanAcquisitionCosts = isNaN(totalAcquisitionCosts) ? 0 : totalAcquisitionCosts;
        const cleanOperationalCosts = isNaN(totalOperationalCosts) ? 0 : totalOperationalCosts;
        const cleanEnhancedCosts = isNaN(enhancedTerritoryCosts) ? 0 : enhancedTerritoryCosts;
        
        const totalCosts = cleanUnallocatedSalaries + cleanAcquisitionCosts + cleanOperationalCosts + cleanEnhancedCosts;
        
        // Debug logging
        console.log(`Month ${month}: Salary: $${cleanUnallocatedSalaries}, Acquisition: $${cleanAcquisitionCosts}, Operational: $${cleanOperationalCosts}, Enhanced: $${cleanEnhancedCosts}, Total: $${totalCosts}`);
        console.log(`Month ${month}: Enhanced cost analysis:`, enhancedCostAnalysis);
        
        return { 
            totalCosts, 
            breakdown: { 
                salaryCosts: cleanUnallocatedSalaries, 
                totalAcquisitionCosts: cleanAcquisitionCosts, 
                totalOperationalCosts: cleanOperationalCosts,
                enhancedTerritoryCosts: cleanEnhancedCosts
            },
            enhancedCostAnalysis: enhancedCostAnalysis
        };
    }
}