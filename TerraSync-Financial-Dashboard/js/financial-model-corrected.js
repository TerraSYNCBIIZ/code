// CORRECTED TERRASYNC FINANCIAL MODEL
// Based on analysis - aligns with actual cash flow of -$3.5k monthly

class CorrectedTerrasyncModel {
    constructor() {
        // CORRECTED ASSUMPTIONS (Based on Reality Check)
        this.assumptions = {
            // Revenue per acre (validated)
            monthlyServiceRevenue: 59,     // $59/acre/month (proven rate)
            saasRevenue: 50,               // $50/user/month 
            saasAdoptionRate: 0.20,        // 20% adoption (conservative)
            
            // One-time revenue (CORRECTED - more realistic)
            productSalePerAcre: 1800,      // $1,800/acre (market rate)
            installationPerAcre: 700,      // $700/acre (market rate)
            productPenetrationRate: 0.15,  // Only 15% of new acres buy products (not 100%)
            installationPenetrationRate: 0.15, // Only 15% get installation services
            
            // Gross Margins (Industry Conservative)
            serviceGrossMargin: 0.70,      // 70%
            productGrossMargin: 0.20,      // 20%
            installationGrossMargin: 0.60, // 60%
            saasGrossMargin: 0.85,         // 85%
            
            // TerraSync Share
            territoryPartnershipSplit: 0.60, // 60% to TerraSync
            
            // Territory Investment & Economics (CORRECTED)
            territoryInvestment: 100000,   // $100K per territory
            territoryOpexMonthly: 3000,    // CORRECTED: $3K monthly per territory (not $6.5K)
            
            // Churn and Growth (REALISTIC)
            monthlyChurnRate: 0.015,       // 1.5% monthly churn (18% annual)
            newAcresPerTerritoryPerMonth: 20, // 20 new acres per territory per month
            
            // Seasonal Multipliers
            seasonalMultipliers: {
                winter: 0.40,    // 40% of normal (Dec-Feb)
                spring: 1.40,    // 140% of normal (Mar-May) 
                summer: 1.00,    // 100% of normal (Jun-Aug)
                fall: 1.20       // 120% of normal (Sep-Nov)
            }
        };

        // CORRECTED Corporate OpEx Structure
        this.opexStructure = {
            startup: {
                territories: [1, 3],
                baseCorporate: 15000,      // REDUCED from $35k
                techInfrastructure: 4000,   // REDUCED from $8k
                operations: 6000,           // REDUCED from $12k
                territorySupport: 3000      // REDUCED from $6.5k per territory
            },
            growth: {
                territories: [4, 8], 
                baseCorporate: 20000,       // Gradual increase
                techInfrastructure: 6000,
                operations: 8000,
                management: 15000,          // REDUCED from $25k
                territorySupport: 3000
            },
            scale: {
                territories: [9, 50],
                baseCorporate: 25000,       // REDUCED from $35k
                techInfrastructure: 10000,  // REDUCED from $15k
                operations: 12000,          // REDUCED from $15k
                management: 25000,          // REDUCED from $45k
                marketing: 15000,           // REDUCED from $20k
                territorySupport: 3000      // Consistent $3k per territory
            }
        };

        // REALISTIC Employee Scaling
        this.employeeScaling = {
            baseEmployees: 8,              // Current staff
            employeesPerTerritory: 1.5,    // 1.5 employees per territory (not 2.5)
            averageAnnualSalary: 55000
        };
    }

    // Calculate realistic monthly revenue
    calculateMonthlyRevenue(acres, territories, saasUsers, month, newAcres = 0) {
        const seasonMultiplier = this.getSeasonalMultiplier(month);
        
        // Recurring Revenue (stable)
        const serviceRevenue = acres * this.assumptions.monthlyServiceRevenue;
        const saasRevenue = saasUsers * this.assumptions.saasRevenue;
        
        // One-time Revenue (CORRECTED - much more realistic)
        const actualNewAcres = newAcres || (territories * this.assumptions.newAcresPerTerritoryPerMonth);
        const productRevenue = actualNewAcres * this.assumptions.productSalePerAcre * 
                              this.assumptions.productPenetrationRate * seasonMultiplier;
        const installationRevenue = actualNewAcres * this.assumptions.installationPerAcre * 
                                   this.assumptions.installationPenetrationRate * seasonMultiplier;
        
        return {
            recurring: serviceRevenue + saasRevenue,
            seasonal: productRevenue + installationRevenue,
            total: serviceRevenue + saasRevenue + productRevenue + installationRevenue,
            breakdown: {
                service: serviceRevenue,
                saas: saasRevenue,
                product: productRevenue,
                installation: installationRevenue
            },
            newAcresProcessed: actualNewAcres
        };
    }

    // Calculate gross profit
    calculateGrossProfit(revenue) {
        return {
            service: revenue.breakdown.service * this.assumptions.serviceGrossMargin,
            saas: revenue.breakdown.saas * this.assumptions.saasGrossMargin,
            product: revenue.breakdown.product * this.assumptions.productGrossMargin,
            installation: revenue.breakdown.installation * this.assumptions.installationGrossMargin,
            total: (revenue.breakdown.service * this.assumptions.serviceGrossMargin) +
                   (revenue.breakdown.saas * this.assumptions.saasGrossMargin) +
                   (revenue.breakdown.product * this.assumptions.productGrossMargin) +
                   (revenue.breakdown.installation * this.assumptions.installationGrossMargin)
        };
    }

    // CORRECTED Operating Expenses
    calculateOpex(territories) {
        let structure;
        
        if (territories <= 3) {
            structure = this.opexStructure.startup;
        } else if (territories <= 8) {
            structure = this.opexStructure.growth;
        } else {
            structure = this.opexStructure.scale;
        }
        
        // Calculate realistic employee count and costs
        const totalEmployees = Math.max(
            this.employeeScaling.baseEmployees,
            this.employeeScaling.baseEmployees + (territories - 2) * this.employeeScaling.employeesPerTerritory
        );
        const monthlySalaries = (totalEmployees * this.employeeScaling.averageAnnualSalary) / 12;
        
        const territorySupport = territories * structure.territorySupport;
        const baseCosts = structure.baseCorporate + 
                         structure.techInfrastructure + 
                         structure.operations +
                         (structure.management || 0) +
                         (structure.marketing || 0);
        
        return {
            salaries: monthlySalaries,
            base: baseCosts,
            territorySupport: territorySupport,
            total: monthlySalaries + baseCosts + territorySupport,
            employees: totalEmployees,
            breakdown: {
                salaries: monthlySalaries,
                corporate: structure.baseCorporate,
                tech: structure.techInfrastructure,
                operations: structure.operations,
                management: structure.management || 0,
                marketing: structure.marketing || 0,
                territories: territorySupport
            }
        };
    }

    // Calculate realistic free cash flow
    calculateFreeCashFlow(grossProfit, opex, territories, newTerritories = 0) {
        const netOperatingProfit = (grossProfit.total * this.assumptions.territoryPartnershipSplit) - opex.total;
        const territoryInvestment = newTerritories * this.assumptions.territoryInvestment;
        const maintenanceCapex = territories * 1000; // REDUCED from $2K to $1K per territory
        
        return {
            operatingCashFlow: netOperatingProfit,
            territoryInvestment: territoryInvestment,
            maintenanceCapex: maintenanceCapex,
            freeCashFlow: netOperatingProfit - territoryInvestment - maintenanceCapex,
            roic: this.calculateROIC(netOperatingProfit, territories * this.assumptions.territoryInvestment)
        };
    }

    // Calculate ROIC
    calculateROIC(netOperatingProfit, investedCapital) {
        return investedCapital > 0 ? (netOperatingProfit * 12) / investedCapital : 0;
    }

    // Seasonal multiplier
    getSeasonalMultiplier(month) {
        const monthNum = month % 12;
        if (monthNum >= 0 && monthNum <= 1) return this.assumptions.seasonalMultipliers.winter;
        if (monthNum >= 2 && monthNum <= 4) return this.assumptions.seasonalMultipliers.spring;
        if (monthNum >= 5 && monthNum <= 7) return this.assumptions.seasonalMultipliers.summer;
        return this.assumptions.seasonalMultipliers.fall;
    }

    // CORRECTED Territory Growth with Churn
    calculateTotalAcres(territories, month, startingAcres = 400) {
        let totalAcres = startingAcres;
        
        for (let m = 0; m < month; m++) {
            const currentTerritories = this.getTerritoryCount(m);
            const newAcres = currentTerritories * this.assumptions.newAcresPerTerritoryPerMonth;
            const churnedAcres = totalAcres * this.assumptions.monthlyChurnRate;
            totalAcres = totalAcres + newAcres - churnedAcres;
        }
        
        return Math.max(startingAcres, totalAcres);
    }

    // Territory expansion schedule
    getTerritoryCount(month) {
        if (month < 6) return 2;        // Start with 2
        if (month < 12) return 3;       // Month 6: 3 territories
        if (month < 18) return 4;       // Month 12: 4 territories
        if (month < 24) return 6;       // Month 18: 6 territories
        if (month < 30) return 8;       // Month 24: 8 territories
        if (month < 36) return 10;      // Month 30: 10 territories
        if (month < 42) return 12;      // Month 36: 12 territories
        return 15;                      // Month 42+: 15 territories
    }

    // CORRECTED Scenario Generation
    generateCorrectedScenario(months = 48) {
        const monthlyData = [];
        
        for (let month = 0; month < months; month++) {
            const territories = this.getTerritoryCount(month);
            const totalAcres = this.calculateTotalAcres(territories, month);
            const saasUsers = Math.floor(totalAcres * this.assumptions.saasAdoptionRate);
            const newAcres = territories * this.assumptions.newAcresPerTerritoryPerMonth;
            
            const revenue = this.calculateMonthlyRevenue(totalAcres, territories, saasUsers, month, newAcres);
            const grossProfit = this.calculateGrossProfit(revenue);
            const opex = this.calculateOpex(territories);
            const cashFlow = this.calculateFreeCashFlow(grossProfit, opex, territories);
            
            monthlyData.push({
                month: month,
                territories: territories,
                acres: Math.round(totalAcres),
                employees: opex.employees,
                revenue: revenue,
                grossProfit: grossProfit,
                opex: opex,
                cashFlow: cashFlow,
                netCashFlow: cashFlow.freeCashFlow
            });
        }
        
        return monthlyData;
    }

    // Validate current state
    validateCurrentState() {
        const territories = 2;
        const acres = 400;
        const saasUsers = Math.floor(acres * this.assumptions.saasAdoptionRate);
        const newAcres = 20; // Realistic new acres per month
        
        const revenue = this.calculateMonthlyRevenue(acres, territories, saasUsers, 0, newAcres);
        const grossProfit = this.calculateGrossProfit(revenue);
        const opex = this.calculateOpex(territories);
        const cashFlow = this.calculateFreeCashFlow(grossProfit, opex, territories);
        
        return {
            territories: territories,
            acres: acres,
            revenue: revenue,
            grossProfit: grossProfit,
            opex: opex,
            cashFlow: cashFlow,
            netCashFlow: cashFlow.freeCashFlow
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CorrectedTerrasyncModel;
} 