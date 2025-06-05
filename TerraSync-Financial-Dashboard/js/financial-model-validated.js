// TERRASYNC VALIDATED FINANCIAL MODEL
// Based on actual business data provided by Wesley

class ValidatedTerrasyncModel {
    constructor() {
        // ACTUAL CURRENT STATE (Wesley's real data)
        this.currentState = {
            knoxvilleAcres: 50,     // 45-60 range actual
            westPalmAcres: 12,      // 10-15 range actual  
            totalAcres: 62,         // REAL current acres
            territories: 2,         // Knoxville + West Palm
            currentRevenue: 5000    // ~$5K/month actual
        };
        
        // MARKET SIZE (Wesley's data)
        this.market = {
            knoxvilleAddressable: 3000,     // "thousands" addressable
            westPalmAddressable: 20000,     // 20,000+ acres
            totalAddressable: 23000         // Total opportunity
        };
        
        // VALIDATED REVENUE STREAMS
        this.revenue = {
            servicePerAcre: 59,             // CONFIRMED: $59/acre/month
            installationPerAcre: 700,       // One-time per new acre
            productSalesPerAcre: 1800,      // One-time per new acre  
            saasPerUser: 50,                // $50/user/month
            saasAdoptionRate: 0.05,         // 5% during beta
            saasAdoptionFuture: 0.20        // 20% post-launch
        };
        
        // TERRITORY ECONOMICS (Wesley's actual model)
        this.territory = {
            initialInvestment: 100000,      // $100K per territory
            profitShareTerritory: 0.40,     // 40% to territory owner
            profitShareCompany: 0.60,       // 60% to TerraSync
            maxCapacity: 1500,              // 1,500 acres max per territory
            yearOneTarget: 200,             // 200 acres in first year
            employeeThreshold: 300          // Need employee over 300 acres
        };
        
        // TERRITORY COSTS (Wesley's actual data)
        this.territoryCosts = {
            baseCosts: 650,                 // $600-700 average monthly
            employeeCost: 3250,             // $3,000-3,500 when needed
            opsSpecialistCapacity: 300      // 300 acres per operations specialist
        };
        
        // GROWTH MODEL (Wesley's timeline)
        this.growth = {
            newTerritoriesPerYear: 6,       // 6-8 territories per year after 2026
            acresGrowthYear1: 200,          // 200 acres in year 1
            acresGrowthMature: 8,           // 8-10 acres/month when mature
            customerAcquisition: {
                residential: 300,            // Few hundred CAC
                commercial: 2000,            // $2K CAC
                closeTimeCommercial: 6,      // 6 months
                closeTimeResidential: 2      // 2 months
            },
            churnRate: 0.004,               // <10% annually = 0.4% monthly
            expansionTimeline: {
                identification: 2,           // 2 months to identify territory
                setup: 4,                   // 3-4 months setup
                firstCustomers: 12          // Within first year to 200 acres
            }
        };
        
        // PROFIT MARGINS
        this.margins = {
            service: 0.70,                  // 70% on service
            installation: 0.60,             // 60% on installation  
            product: 0.20,                  // 20% on products
            saas: 0.85                      // 85% on SaaS
        };
        
        // TERRITORY MATURITY CURVE (based on Wesley's growth timeline)
        this.maturityCurve = {
            0: 0,       // Start
            3: 30,      // 3 months: 30 acres 
            6: 80,      // 6 months: 80 acres
            12: 200,    // 12 months: 200 acres (target)
            18: 350,    // 18 months: 350 acres
            24: 550,    // 24 months: 550 acres
            36: 900,    // 36 months: 900 acres
            48: 1200,   // 48 months: 1,200 acres
            60: 1500    // 60 months: 1,500 acres (capacity)
        };
        
        // TERRITORY EXPANSION SCHEDULE
        this.expansionSchedule = [
            { month: 0, territories: 2 },   // Start with current 2
            { month: 12, territories: 3 },  // 2026: Add 1 more
            { month: 18, territories: 4 },  // 2026: 4 total
            { month: 24, territories: 6 },  // 2027: 6 total (2 added)
            { month: 30, territories: 8 },  // 2027: 8 total
            { month: 36, territories: 10 }, // 2028: 10 total
            { month: 42, territories: 12 }, // 2028: 12 total
            { month: 48, territories: 15 }, // 2029: 15 total
            { month: 54, territories: 18 }, // 2029: 18 total
            { month: 60, territories: 22 }  // 2030: 22 total
        ];
    }
    
    // Get number of territories at given month
    getTerritoryCount(month) {
        for (let i = this.expansionSchedule.length - 1; i >= 0; i--) {
            if (month >= this.expansionSchedule[i].month) {
                return this.expansionSchedule[i].territories;
            }
        }
        return 2; // Default to current 2 territories
    }
    
    // Calculate acres for territory based on age
    calculateTerritoryAcres(territoryAge) {
        if (territoryAge < 0) return 0;
        
        const maturityKeys = Object.keys(this.maturityCurve)
            .map(k => parseInt(k))
            .sort((a, b) => a - b);
        
        for (const months of maturityKeys) {
            if (territoryAge <= months) {
                return this.maturityCurve[months];
            }
        }
        
        return this.maturityCurve[60]; // Max capacity
    }
    
    // Calculate total acres across all territories
    calculateTotalAcres(month) {
        if (month === 0) {
            return this.currentState.totalAcres; // Start with actual 62 acres
        }
        
        const territoryCount = this.getTerritoryCount(month);
        let totalAcres = 0;
        
        // Calculate acres for each territory based on when it was added
        for (let i = 0; i < territoryCount; i++) {
            let territoryStartMonth = 0;
            
            // Determine when this territory was added
            if (i < 2) {
                territoryStartMonth = 0; // Original territories
            } else {
                // Find when this territory was added
                for (const expansion of this.expansionSchedule) {
                    if (i < expansion.territories) {
                        territoryStartMonth = expansion.month;
                        break;
                    }
                }
            }
            
            const territoryAge = month - territoryStartMonth;
            const territoryAcres = this.calculateTerritoryAcres(territoryAge);
            totalAcres += territoryAcres;
        }
        
        // Apply churn
        totalAcres *= (1 - (this.growth.churnRate * month));
        
        // Never go below current state for existing territories
        return Math.max(this.currentState.totalAcres, totalAcres);
    }
    
    // Calculate monthly revenue streams
    calculateMonthlyRevenue(month) {
        const totalAcres = this.calculateTotalAcres(month);
        const territoryCount = this.getTerritoryCount(month);
        
        // 1. Service Revenue (recurring)
        const serviceRevenue = totalAcres * this.revenue.servicePerAcre;
        
        // 2. New Acre Revenue (transaction-based)
        const newAcres = month === 0 ? 0 : this.calculateNewAcresThisMonth(month);
        const installationRevenue = newAcres * this.revenue.installationPerAcre;
        const productRevenue = newAcres * this.revenue.productSalesPerAcre;
        
        // 3. SaaS Revenue
        const saasAdoption = month < 12 ? this.revenue.saasAdoptionRate : this.revenue.saasAdoptionFuture;
        const saasUsers = totalAcres * saasAdoption;
        const saasRevenue = saasUsers * this.revenue.saasPerUser;
        
        return {
            service: serviceRevenue,
            installation: installationRevenue,
            product: productRevenue,
            saas: saasRevenue,
            total: serviceRevenue + installationRevenue + productRevenue + saasRevenue,
            totalAcres: totalAcres,
            newAcres: newAcres,
            territoryCount: territoryCount
        };
    }
    
    // Calculate new acres added this month
    calculateNewAcresThisMonth(month) {
        const territoryCount = this.getTerritoryCount(month);
        let newAcres = 0;
        
        for (let i = 0; i < territoryCount; i++) {
            let territoryStartMonth = 0;
            
            if (i < 2) {
                territoryStartMonth = 0;
            } else {
                for (const expansion of this.expansionSchedule) {
                    if (i < expansion.territories) {
                        territoryStartMonth = expansion.month;
                        break;
                    }
                }
            }
            
            const territoryAge = month - territoryStartMonth;
            
            if (territoryAge >= 0 && territoryAge <= 12) {
                newAcres += 15; // 200 acres / 12 months = ~17 acres/month
            } else if (territoryAge > 12 && territoryAge <= 24) {
                newAcres += 10; // Slower growth
            } else if (territoryAge > 24) {
                newAcres += 5;  // Maintenance growth
            }
        }
        
        return newAcres;
    }
    
    // Calculate territory costs
    calculateTerritoryCosts(month) {
        const territoryCount = this.getTerritoryCount(month);
        const totalAcres = this.calculateTotalAcres(month);
        
        let totalCosts = 0;
        
        for (let i = 0; i < territoryCount; i++) {
            let territoryStartMonth = 0;
            
            if (i < 2) {
                territoryStartMonth = 0;
            } else {
                for (const expansion of this.expansionSchedule) {
                    if (i < expansion.territories) {
                        territoryStartMonth = expansion.month;
                        break;
                    }
                }
            }
            
            const territoryAge = month - territoryStartMonth;
            const territoryAcres = this.calculateTerritoryAcres(territoryAge);
            
            // Base costs for all territories
            let territoryCost = this.territoryCosts.baseCosts;
            
            // Add employee cost if over threshold
            if (territoryAcres > this.territory.employeeThreshold) {
                territoryCost += this.territoryCosts.employeeCost;
            }
            
            totalCosts += territoryCost;
        }
        
        return totalCosts;
    }
    
    // Calculate gross profit
    calculateGrossProfit(revenue) {
        return {
            service: revenue.service * this.margins.service,
            installation: revenue.installation * this.margins.installation,
            product: revenue.product * this.margins.product,
            saas: revenue.saas * this.margins.saas,
            total: (revenue.service * this.margins.service) +
                   (revenue.installation * this.margins.installation) +
                   (revenue.product * this.margins.product) +
                   (revenue.saas * this.margins.saas)
        };
    }
    
    // Calculate company share (60% of gross profit)
    calculateCompanyShare(grossProfit) {
        return grossProfit.total * this.territory.profitShareCompany;
    }
    
    // Calculate net cash flow to TerraSync
    calculateNetCashFlow(month) {
        const revenue = this.calculateMonthlyRevenue(month);
        const grossProfit = this.calculateGrossProfit(revenue);
        const companyShare = this.calculateCompanyShare(grossProfit);
        const territoryCosts = this.calculateTerritoryCosts(month);
        
        // Add corporate overhead (minimal for now)
        const corporateOverhead = 2000; // $2K/month corporate costs
        
        const netCashFlow = companyShare - territoryCosts - corporateOverhead;
        
        return {
            revenue: revenue,
            grossProfit: grossProfit,
            companyShare: companyShare,
            territoryCosts: territoryCosts,
            corporateOverhead: corporateOverhead,
            netCashFlow: netCashFlow
        };
    }
    
    // Generate full projection
    generateProjection(months = 60) {
        const projection = [];
        
        for (let month = 0; month <= months; month++) {
            const cashFlow = this.calculateNetCashFlow(month);
            
            projection.push({
                month: month,
                year: Math.floor(month / 12) + 1,
                ...cashFlow
            });
        }
        
        return projection;
    }
    
    // Validate current state
    validateCurrentState() {
        const currentCashFlow = this.calculateNetCashFlow(0);
        
        return {
            modelRevenue: currentCashFlow.revenue.total,
            actualRevenue: this.currentState.currentRevenue,
            variance: Math.abs(currentCashFlow.revenue.total - this.currentState.currentRevenue),
            variancePercent: Math.abs(currentCashFlow.revenue.total - this.currentState.currentRevenue) / this.currentState.currentRevenue * 100,
            isValidated: Math.abs(currentCashFlow.revenue.total - this.currentState.currentRevenue) < 1000
        };
    }
    
    // Get key metrics summary
    getKeyMetrics() {
        const currentCashFlow = this.calculateNetCashFlow(0);
        const year1CashFlow = this.calculateNetCashFlow(12);
        const year3CashFlow = this.calculateNetCashFlow(36);
        
        return {
            current: {
                revenue: currentCashFlow.revenue.total,
                acres: currentCashFlow.revenue.totalAcres,
                territories: currentCashFlow.revenue.territoryCount,
                netCashFlow: currentCashFlow.netCashFlow,
                marketPenetration: (currentCashFlow.revenue.totalAcres / this.market.totalAddressable) * 100
            },
            year1: {
                revenue: year1CashFlow.revenue.total,
                acres: year1CashFlow.revenue.totalAcres,
                territories: year1CashFlow.revenue.territoryCount,
                netCashFlow: year1CashFlow.netCashFlow
            },
            year3: {
                revenue: year3CashFlow.revenue.total,
                acres: year3CashFlow.revenue.totalAcres,
                territories: year3CashFlow.revenue.territoryCount,
                netCashFlow: year3CashFlow.netCashFlow
            },
            marketOpportunity: {
                totalAddressable: this.market.totalAddressable,
                currentPenetration: (currentCashFlow.revenue.totalAcres / this.market.totalAddressable) * 100,
                growthMultiple: this.market.totalAddressable / currentCashFlow.revenue.totalAcres
            }
        };
    }
}

// Export for dashboard use
window.ValidatedTerrasyncModel = ValidatedTerrasyncModel; 