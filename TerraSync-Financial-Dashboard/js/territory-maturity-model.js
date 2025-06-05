// SOPHISTICATED TERRITORY MATURITY MODEL
// Handles realistic territory additions and maturity curves

class TerritoryMaturityModel {
    constructor() {
        // Territory maturity curve - how acres grow over time in each territory
        this.maturityCurve = {
            month1: 25,     // Start with 25 acres
            month3: 75,     // 75 acres by month 3
            month6: 150,    // 150 acres by month 6
            month12: 300,   // 300 acres by month 12
            month18: 500,   // 500 acres by month 18
            month24: 750,   // 750 acres by month 24
            month36: 1200,  // 1,200 acres by month 36
            month48: 1800,  // 1,800 acres at full maturity
            mature: 2000    // Maximum capacity
        };
        
        // Territory addition schedule - consistent throughout years
        this.territorySchedule = [
            // Year 1 (Months 0-11): Start with 2, add 2 more
            { month: 0, action: 'start', territories: 2 },
            { month: 6, action: 'add', count: 1 },     // Month 6: 3rd territory
            { month: 11, action: 'add', count: 1 },    // Month 11: 4th territory
            
            // Year 2 (Months 12-23): Add 4 territories
            { month: 14, action: 'add', count: 1 },    // Month 14: 5th territory
            { month: 17, action: 'add', count: 1 },    // Month 17: 6th territory
            { month: 20, action: 'add', count: 1 },    // Month 20: 7th territory
            { month: 23, action: 'add', count: 1 },    // Month 23: 8th territory
            
            // Year 3 (Months 24-35): Add 6 territories
            { month: 26, action: 'add', count: 1 },    // Month 26: 9th territory
            { month: 28, action: 'add', count: 1 },    // Month 28: 10th territory
            { month: 30, action: 'add', count: 1 },    // Month 30: 11th territory
            { month: 32, action: 'add', count: 1 },    // Month 32: 12th territory
            { month: 34, action: 'add', count: 1 },    // Month 34: 13th territory
            { month: 35, action: 'add', count: 1 },    // Month 35: 14th territory
            
            // Year 4 (Months 36-47): Add 8 territories
            { month: 37, action: 'add', count: 1 },    // Month 37: 15th territory
            { month: 39, action: 'add', count: 1 },    // Month 39: 16th territory
            { month: 41, action: 'add', count: 1 },    // Month 41: 17th territory
            { month: 42, action: 'add', count: 1 },    // Month 42: 18th territory
            { month: 44, action: 'add', count: 1 },    // Month 44: 19th territory
            { month: 45, action: 'add', count: 1 },    // Month 45: 20th territory
            { month: 46, action: 'add', count: 1 },    // Month 46: 21st territory
            { month: 47, action: 'add', count: 1 },    // Month 47: 22nd territory
            
            // Year 5 (Month 48+): Add 10+ territories to reach 30+
            { month: 49, action: 'add', count: 2 },    // Month 49: 24th territory
            { month: 51, action: 'add', count: 2 },    // Month 51: 26th territory
            { month: 53, action: 'add', count: 2 },    // Month 53: 28th territory
            { month: 55, action: 'add', count: 2 },    // Month 55: 30th territory
            { month: 57, action: 'add', count: 2 },    // Month 57: 32nd territory
        ];
        
        // Revenue assumptions (calibrated)
        this.revenue = {
            servicePerAcre: 59,
            saasPerUser: 50,
            saasAdoption: 0.20,
            additionalPerTerritory: 12000,  // Calibrated additional services
            productSalePerAcre: 1800,
            installationPerAcre: 700,
            productPenetration: 0.15,
            installationPenetration: 0.15
        };
        
        // Cost assumptions (calibrated)
        this.costs = {
            baseEmployees: 4,
            avgSalary: 45000,
            employeesPerTerritory: 0.75,    // 0.75 employees per territory after base
            baseOverhead: 8000,
            overheadPerTerritory: 800,      // Additional overhead per territory
            territorySupport: 1000,         // Per territory monthly
        };
        
        // Margins
        this.margins = {
            service: 0.70,
            saas: 0.85,
            product: 0.20,
            installation: 0.60,
            additional: 0.60,
            terrasyncShare: 0.60
        };
        
        // Churn rate
        this.churnRate = 0.005; // 0.5% monthly churn
    }
    
    // Get number of territories at any given month
    getTerritoryCount(month) {
        let totalTerritories = 0;
        
        for (const event of this.territorySchedule) {
            if (event.month <= month) {
                if (event.action === 'start') {
                    totalTerritories = event.territories;
                } else if (event.action === 'add') {
                    totalTerritories += event.count;
                }
            }
        }
        
        return totalTerritories;
    }
    
    // Get list of territories with their start months
    getTerritoryList(currentMonth) {
        const territories = [];
        let territoryId = 1;
        
        for (const event of this.territorySchedule) {
            if (event.month <= currentMonth) {
                if (event.action === 'start') {
                    // Add initial territories
                    for (let i = 0; i < event.territories; i++) {
                        territories.push({
                            id: territoryId++,
                            startMonth: 0,
                            age: currentMonth
                        });
                    }
                } else if (event.action === 'add') {
                    // Add new territories
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
    
    // Calculate acres for a territory based on its age
    calculateTerritoryAcres(territoryAge) {
        if (territoryAge < 0) return 0;
        if (territoryAge <= 1) return this.maturityCurve.month1;
        if (territoryAge <= 3) return this.maturityCurve.month3;
        if (territoryAge <= 6) return this.maturityCurve.month6;
        if (territoryAge <= 12) return this.maturityCurve.month12;
        if (territoryAge <= 18) return this.maturityCurve.month18;
        if (territoryAge <= 24) return this.maturityCurve.month24;
        if (territoryAge <= 36) return this.maturityCurve.month36;
        if (territoryAge <= 48) return this.maturityCurve.month48;
        return this.maturityCurve.mature;
    }
    
    // Calculate new acres added in a specific month for a territory
    calculateNewAcresForTerritory(territoryAge) {
        if (territoryAge < 0) return 0;
        
        // New acres decline as territory matures
        if (territoryAge <= 3) return 25;   // High growth in first 3 months
        if (territoryAge <= 6) return 20;   // Good growth months 3-6
        if (territoryAge <= 12) return 15;  // Steady growth months 6-12
        if (territoryAge <= 24) return 12;  // Slower growth months 12-24
        if (territoryAge <= 36) return 8;   // Mature growth months 24-36
        return 5;                           // Maintenance growth 36+
    }
    
    // Calculate total acres across all territories for a given month
    calculateTotalAcres(month) {
        const territories = this.getTerritoryList(month);
        let totalAcres = 0;
        
        for (const territory of territories) {
            totalAcres += this.calculateTerritoryAcres(territory.age);
        }
        
        // Apply churn
        if (month > 0) {
            const churnLoss = totalAcres * this.churnRate;
            totalAcres = Math.max(0, totalAcres - churnLoss);
        }
        
        return totalAcres;
    }
    
    // Calculate new acres added in a specific month
    calculateNewAcresThisMonth(month) {
        const territories = this.getTerritoryList(month);
        let newAcres = 0;
        
        for (const territory of territories) {
            newAcres += this.calculateNewAcresForTerritory(territory.age);
        }
        
        return newAcres;
    }
    
    // Calculate monthly revenue for a given month
    calculateMonthlyRevenue(month) {
        const territories = this.getTerritoryList(month);
        const territoryCount = territories.length;
        const totalAcres = this.calculateTotalAcres(month);
        const newAcres = this.calculateNewAcresThisMonth(month);
        const saasUsers = Math.floor(totalAcres * this.revenue.saasAdoption);
        
        // Seasonal multiplier
        const seasonalMultiplier = this.getSeasonalMultiplier(month);
        
        // Revenue streams
        const serviceRevenue = totalAcres * this.revenue.servicePerAcre;
        const saasRevenue = saasUsers * this.revenue.saasPerUser;
        const additionalRevenue = territoryCount * this.revenue.additionalPerTerritory;
        
        // One-time revenue (seasonal and penetration adjusted)
        const productRevenue = newAcres * this.revenue.productSalePerAcre * 
                              this.revenue.productPenetration * seasonalMultiplier;
        const installationRevenue = newAcres * this.revenue.installationPerAcre * 
                                   this.revenue.installationPenetration * seasonalMultiplier;
        
        const totalRevenue = serviceRevenue + saasRevenue + additionalRevenue + 
                           productRevenue + installationRevenue;
        
        return {
            service: serviceRevenue,
            saas: saasRevenue,
            additional: additionalRevenue,
            product: productRevenue,
            installation: installationRevenue,
            total: totalRevenue,
            recurring: serviceRevenue + saasRevenue,
            breakdown: {
                totalAcres: totalAcres,
                newAcres: newAcres,
                territoryCount: territoryCount,
                saasUsers: saasUsers
            }
        };
    }
    
    // Calculate gross profit
    calculateGrossProfit(revenue) {
        const serviceGP = revenue.service * this.margins.service;
        const saasGP = revenue.saas * this.margins.saas;
        const additionalGP = revenue.additional * this.margins.additional;
        const productGP = revenue.product * this.margins.product;
        const installationGP = revenue.installation * this.margins.installation;
        
        const totalGP = serviceGP + saasGP + additionalGP + productGP + installationGP;
        const terrasyncGP = totalGP * this.margins.terrasyncShare;
        
        return {
            service: serviceGP,
            saas: saasGP,
            additional: additionalGP,
            product: productGP,
            installation: installationGP,
            total: totalGP,
            terrasyncShare: terrasyncGP
        };
    }
    
    // Calculate monthly costs
    calculateMonthlyCosts(month) {
        const territoryCount = this.getTerritoryCount(month);
        
        // Employee scaling
        const totalEmployees = Math.max(
            this.costs.baseEmployees,
            this.costs.baseEmployees + (territoryCount - 2) * this.costs.employeesPerTerritory
        );
        const monthlySalaries = (totalEmployees * this.costs.avgSalary) / 12;
        
        // Overhead scaling
        const overhead = this.costs.baseOverhead + (territoryCount - 2) * this.costs.overheadPerTerritory;
        
        // Territory support
        const territorySupport = territoryCount * this.costs.territorySupport;
        
        const totalCosts = monthlySalaries + overhead + territorySupport;
        
        return {
            salaries: monthlySalaries,
            overhead: overhead,
            territorySupport: territorySupport,
            total: totalCosts,
            employees: Math.round(totalEmployees)
        };
    }
    
    // Calculate net cash flow
    calculateNetCashFlow(month) {
        const revenue = this.calculateMonthlyRevenue(month);
        const grossProfit = this.calculateGrossProfit(revenue);
        const costs = this.calculateMonthlyCosts(month);
        
        const netCashFlow = grossProfit.terrasyncShare - costs.total;
        
        return {
            revenue: revenue,
            grossProfit: grossProfit,
            costs: costs,
            netCashFlow: netCashFlow
        };
    }
    
    // Get seasonal multiplier
    getSeasonalMultiplier(month) {
        const monthInYear = month % 12;
        if (monthInYear >= 0 && monthInYear <= 1) return 0.4;  // Dec-Jan (Winter)
        if (monthInYear >= 2 && monthInYear <= 4) return 1.4;  // Feb-Apr (Spring)
        if (monthInYear >= 5 && monthInYear <= 7) return 1.0;  // May-Jul (Summer)
        return 1.2; // Aug-Nov (Fall)
    }
    
    // Generate complete 60-month projection (to reach 30+ territories)
    generateProjection(months = 60) {
        const projection = [];
        
        for (let month = 0; month < months; month++) {
            const monthlyData = this.calculateNetCashFlow(month);
            
            projection.push({
                month: month,
                territories: this.getTerritoryCount(month),
                acres: Math.round(monthlyData.revenue.breakdown.totalAcres),
                employees: monthlyData.costs.employees,
                totalRevenue: Math.round(monthlyData.revenue.total),
                recurringRevenue: Math.round(monthlyData.revenue.recurring),
                additionalRevenue: Math.round(monthlyData.revenue.additional),
                totalCosts: Math.round(monthlyData.costs.total),
                netCashFlow: Math.round(monthlyData.netCashFlow),
                newAcres: Math.round(monthlyData.revenue.breakdown.newAcres)
            });
        }
        
        return projection;
    }
    
    // Validate current state (month 0)
    validateCurrentState() {
        const currentData = this.calculateNetCashFlow(0);
        
        return {
            territories: this.getTerritoryCount(0),
            acres: Math.round(currentData.revenue.breakdown.totalAcres),
            totalRevenue: Math.round(currentData.revenue.total),
            recurringRevenue: Math.round(currentData.revenue.recurring),
            totalCosts: Math.round(currentData.costs.total),
            netCashFlow: Math.round(currentData.netCashFlow),
            employees: currentData.costs.employees
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerritoryMaturityModel;
} 