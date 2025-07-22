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
            // Knoxville team
            { role: 'Sales Ops', salary: this.assumptions.salaries.salesOps, locationId: 1, startMonth: 0 },
            { role: 'Executive Assistant', salary: this.assumptions.salaries.executiveAssistant, locationId: 1, startMonth: 0 },
            
            // West Palm team (2 people)
            { role: 'Field Service Tech', salary: this.assumptions.salaries.fieldServiceTech, locationId: 2, startMonth: 0 },
            { role: 'Sales Ops', salary: this.assumptions.salaries.salesOps, locationId: 2, startMonth: 0 },
            
            // Developers (3 starting now)
            { role: 'Developer', salary: this.assumptions.salaries.developer, locationId: 1, startMonth: 0 },
            { role: 'Developer', salary: this.assumptions.salaries.developer, locationId: 1, startMonth: 0 },
            { role: 'Developer', salary: this.assumptions.salaries.developer, locationId: 1, startMonth: 0 },
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
        // No scheduled hires - developers start immediately

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

        // --- Account Manager Hiring Logic ---
        // Hire account managers based on client count and ARR thresholds
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
        const clientCount = metrics.clientCount || 0;
        
        // Developer scaling logic:
        // - Start with 3 (already initialized)
        // - 4th developer when SaaS revenue > $25K/month OR 100+ clients
        // - 5th developer when SaaS revenue > $50K/month OR 200+ clients  
        // - 6th developer when SaaS revenue > $75K/month OR 300+ clients
        // - 7th+ developers for scale (1 per $40K SaaS revenue, max 10 total)
        
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

        // Field Service Tech scaling: Ensure adequate coverage per location
        // Base rule: 1 tech per 200 acres, but minimum 1 per location after it has 5+ clients
        const clientsPerLocation = Math.floor(clientCount / locationCount);
        if (clientsPerLocation >= 5) {
            const minTechsByLocation = locationCount; // At least 1 tech per established location
            const minTechsByAcres = Math.floor(metrics.totalAcres / 200);
            const requiredTechsTotal = Math.max(minTechsByLocation, minTechsByAcres);
            
            if (requiredTechsTotal > currentTechs) {
                console.log(`Month ${month}: Hiring Field Service Tech for location coverage. Locations: ${locationCount}, Required: ${requiredTechsTotal}, Current: ${currentTechs}`);
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
            const requiredAMs = Math.max(requiredAMsByLocation, requiredAccountManagers);
            
            if (requiredAMs > currentAccountManagers) {
                this.team.push({ role: 'Account Manager', salary: this.assumptions.salaries.accountManager, location: `Regional - ${requiredAMs}`, startMonth: month });
            }
        }

        // Executive Assistant scaling: Add operations coordinator for multi-location management
        if (locationCount >= 8 && currentExecAssistants < 3) {
            this.team.push({ role: 'Executive Assistant', salary: this.assumptions.salaries.executiveAssistant, location: 'Operations Coordinator', startMonth: month });
        }

        // --- CORPORATE INFRASTRUCTURE SCALING ---
        // Transition from outsourced to in-house as we scale
        
        // Accountant - transition from outsourced accounting at $500K ARR
        const currentAccountants = this.team.filter(e => e.role === 'Accountant').length;
        if (currentAccountants === 0 && currentARR >= 500000) {
            this.team.push({ role: 'Accountant', salary: this.assumptions.salaries.accountant, location: 'HQ', startMonth: month });
        }
        
        // HR Manager - hire when team reaches 20+ people
        const currentHRManagers = this.team.filter(e => e.role === 'HR Manager').length;
        if (currentHRManagers === 0 && totalTeamSize >= 20) {
            this.team.push({ role: 'HR Manager', salary: this.assumptions.salaries.hrManager, location: 'HQ', startMonth: month });
        }
        
        // Operations Manager - regional ops management at 6+ locations
        const currentOpsManagers = this.team.filter(e => e.role === 'Operations Manager').length;
        const requiredOpsManagers = Math.floor(locationCount / 6); // 1 per 6 locations
        if (requiredOpsManagers > currentOpsManagers && locationCount >= 6) {
            this.team.push({ role: 'Operations Manager', salary: this.assumptions.salaries.operationsManager, location: `Regional Ops`, startMonth: month });
        }
        
        // Marketing Manager - dedicated marketing at $500K ARR
        const currentMarketingManagers = this.team.filter(e => e.role === 'Marketing Manager').length;
        if (currentMarketingManagers === 0 && currentARR >= 500000) {
            this.team.push({ role: 'Marketing Manager', salary: this.assumptions.salaries.marketingManager, location: 'HQ', startMonth: month });
        }
        
        // Customer Success Manager - client retention focus at $750K ARR and 150+ clients
        const currentCSManagers = this.team.filter(e => e.role === 'Customer Success Manager').length;
        const requiredCSManagers = Math.floor(clientCount / 150); // 1 per 150 clients
        if (requiredCSManagers > currentCSManagers && currentARR >= 750000 && clientCount >= 150) {
            this.team.push({ role: 'Customer Success Manager', salary: this.assumptions.salaries.customerSuccessManager, location: 'HQ', startMonth: month });
        }
        
        // IT Manager - internal IT support when team reaches 25+ people
        const currentITManagers = this.team.filter(e => e.role === 'IT Manager').length;
        if (currentITManagers === 0 && totalTeamSize >= 25) {
            this.team.push({ role: 'IT Manager', salary: this.assumptions.salaries.itManager, location: 'HQ', startMonth: month });
        }
        
        // COO - Chief Operating Officer at $2M ARR and 8+ locations
        const currentCOOs = this.team.filter(e => e.role === 'COO').length;
        if (currentCOOs === 0 && currentARR >= 2000000 && locationCount >= 8) {
            this.team.push({ role: 'COO', salary: this.assumptions.salaries.coo, location: 'HQ', startMonth: month });
        }
        
        // CFO - Chief Financial Officer at $3M ARR
        const currentCFOs = this.team.filter(e => e.role === 'CFO').length;
        if (currentCFOs === 0 && currentARR >= 3000000) {
            this.team.push({ role: 'CFO', salary: this.assumptions.salaries.cfo, location: 'HQ', startMonth: month });
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
            'Account Manager': 'accountManager',
            // Corporate Infrastructure Role Mappings
            'Accountant': 'accountant',
            'HR Manager': 'hrManager',
            'Operations Manager': 'operationsManager',
            'Marketing Manager': 'marketingManager',
            'Customer Success Manager': 'customerSuccessManager',
            'IT Manager': 'itManager',
            'COO': 'coo',
            'CFO': 'cfo'
        };
        
        return roleMapping[role] || role.toLowerCase().replace(/\s+/g, '');
    }

    getNewHires(month) {
        return this.team.filter(e => e.startMonth === month);
    }
}