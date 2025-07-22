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

        // --- Dynamic Hiring Logic ---
        const requiredTechs = Math.floor(metrics.totalAcres / 200);
        const currentTechs = this.team.filter(e => e.role === 'Field Service Tech').length;
        if (requiredTechs > currentTechs) {
            this.team.push({ role: 'Field Service Tech', salary: this.assumptions.salaries.fieldServiceTech, location: 'New Hire', startMonth: month });
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
}