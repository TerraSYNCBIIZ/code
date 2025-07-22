
// TERRASYNC CLIENT-CENTRIC FINANCIAL MODEL
// Version 1.0 - Foundation
// This model shifts from a territory-based forecast to a client-driven, bottom-up forecast.

class ClientCentricFinancialModel {
    constructor() {
        // --- PART 1: THE SERVICE ENGINE (Client & Acreage Acquisition) ---

        // 1.1. Client Acquisition Schedule (How many new clients we sign each month)
        // This replaces the old `territorySchedule`. We can make this more dynamic later.
        this.clientAcquisitionSchedule = {
            // Example: 2 new clients per month for the first year, then 3, etc.
            year1: { newClientsPerMonth: 2 },
            year2: { newClientsPerMonth: 3 },
            year3: { newClientsPerMonth: 5 },
            year4: { newClientsPerMonth: 8 },
            year5: { newClientsPerMonth: 10 }
        };

        // 1.2. Client Mix (The 70/30 split)
        this.clientMix = {
            golfCourse: 0.70, // 70% of new clients are Golf Courses
            other: 0.30       // 30% are other commercial clients
        };

        // 1.3. Initial Acreage & Max Capacity per Client
        // Defines the starting size and growth potential of a single client location.
        this.clientProfile = {
            golfCourse: { initialAcres: 100, maxAcres: 250 },
            other:      { initialAcres: 20,  maxAcres: 50 }
        };

        // 1.4. Client Acreage Growth Curve (How quickly we expand within a single client location)
        // This defines the percentage of maxAcres reached over time.
        this.clientAcreageGrowthCurve = {
            month1:  0.40, // Start at 40% of max potential (e.g., 100 acres for a golf course)
            month6:  0.60, // 60% by month 6
            month12: 0.75, // 75% by month 12
            month24: 0.90, // 90% by month 24
            month36: 1.00  // 100% of max acres by year 3
        };

        // --- PART 2: THE SOFTWARE ENGINE (SaaS Conversion) ---

        // 2.1. SaaS Platform Release Date
        this.saasReleaseMonth = 18; // Corresponds to month 18 of the simulation (mid-2026)

        // 2.2. SaaS Conversion Curve (How many GOLF COURSE clients adopt the software)
        // This is the percentage of *existing* golf course clients that convert.
        this.saasConversionCurve = {
            // Months relative to SaaS release (month 18)
            q1_2026: { startMonth: 18, endMonth: 21, conversionRate: 0.05 }, // 5%
            q2_2026: { startMonth: 22, endMonth: 24, conversionRate: 0.10 }, // 10%
            h1_2027: { startMonth: 25, endMonth: 30, conversionRate: 0.25 }, // 25%
            h2_2027: { startMonth: 31, endMonth: 36, conversionRate: 0.40 }, // 40%
            year_2028: { startMonth: 37, endMonth: 48, conversionRate: 0.60 }, // 60%
            year_2029: { startMonth: 49, endMonth: 60, conversionRate: 0.75 }  // 75%
        };


        // --- PART 3: REVENUE & COST PARAMETERS (The Numbers) ---

        // 3.1. Revenue Parameters
        this.revenue = {
            // Service Revenue
            servicePerAcre: 59,
            // Installation & Product Sales (per NEW ACRE)
            installationPerNewAcre: 700,
            productSalePerNewAcre: 1800,
            // SaaS Revenue
            saasPerGolfCourseClient: 500 // Simplified to a flat fee per converted golf course per month
        };

        // 3.2. Profit Margins
        this.margins = {
            service: 0.70,
            installation: 0.60,
            product: 0.20,
            saas: 0.90 // Higher margin for software
        };

        // 3.3. Cost Parameters (Can be refined later)
        this.costs = {
            // We can tie costs to # of clients and total acres instead of territories
            baseOverhead: 10000,
            costPerClient: 250,      // Monthly support cost per active client
            costPerAcre: 5           // Monthly operational cost per acre managed
        };

        // --- PART 4: SIMULATION STATE (Internal Memory) ---
        this.simulationState = {
            clients: [], // Array to hold all active client objects
            monthlyProjections: [] // Array to store the results of each month's simulation
        };
    }

    // --- MODEL CALCULATION METHODS ---

    /**
     * Main simulation runner.
     * This function loops through each month, orchestrating the acquisition of clients,
     * updating their state, and calculating financials.
     * @param {number} months - The total number of months to simulate.
     */
    runSimulation(months = 60) {
        console.log("Starting client-centric simulation...");
        this.simulationState.clients = []; // Reset state
        this.simulationState.monthlyProjections = [];

        for (let month = 0; month < months; month++) {
            // 1. Acquire new clients for the current month
            this.acquireNewClients(month);

            // 2. Update the state of all existing clients (age, acreage)
            this.updateClientStates(month);

            // 3. Calculate financials for the current month
            const monthlyFinancials = this.calculateMonthlyFinancials(month);

            // 4. Store the results for this month
            this.simulationState.monthlyProjections.push({
                month: month,
                ...monthlyFinancials
            });
        }
        console.log("Simulation complete. Projections generated:", this.simulationState.monthlyProjections);
    }

    /**
     * Acquires new clients for a given month based on the schedule.
     * @param {number} month - The current simulation month.
     */
    acquireNewClients(month) {
        const year = Math.floor(month / 12) + 1;
        const schedule = this.clientAcquisitionSchedule[`year${year}`] || { newClientsPerMonth: 0 };
        const newClientsThisMonth = schedule.newClientsPerMonth;

        for (let i = 0; i < newClientsThisMonth; i++) {
            const isGolfCourse = Math.random() < this.clientMix.golfCourse;
            const clientType = isGolfCourse ? 'golfCourse' : 'other';
            const profile = this.clientProfile[clientType];
            
            this.simulationState.clients.push({
                id: this.simulationState.clients.length + 1,
                type: clientType,
                startMonth: month,
                age: 0,
                initialAcres: profile.initialAcres,
                maxAcres: profile.maxAcres,
                currentAcres: profile.initialAcres,
            });
        }
    }

    /**
     * Updates the age and acreage for all active clients.
     * @param {number} month - The current simulation month.
     */
    updateClientStates(month) {
        this.simulationState.clients.forEach(client => {
            client.age = month - client.startMonth;

            // Find the correct growth percentage from the curve based on age
            let growthPercent = 0;
            for (const key in this.clientAcreageGrowthCurve) {
                const curveMonth = parseInt(key.replace('month', ''));
                if (client.age >= curveMonth) {
                    growthPercent = this.clientAcreageGrowthCurve[key];
                }
            }
            // If age is 0, it should be the initial state from the curve
             if (client.age === 0) {
                growthPercent = this.clientAcreageGrowthCurve.month1;
            }


            client.currentAcres = client.maxAcres * growthPercent;
        });
    }

    /**
     * Calculates all financial metrics for a given month.
     * @param {number} month - The current simulation month.
     * @returns {object} - An object containing detailed financial calculations.
     */
    calculateMonthlyFinancials(month) {
        // --- Revenue Calculation ---
        const totalAcres = this.simulationState.clients.reduce((sum, c) => sum + c.currentAcres, 0);
        const newAcresThisMonth = this.simulationState.clients
            .filter(c => c.age === 0)
            .reduce((sum, c) => sum + c.initialAcres, 0);

        const serviceRevenue = totalAcres * this.revenue.servicePerAcre;
        const installationRevenue = newAcresThisMonth * this.revenue.installationPerNewAcre;
        const productRevenue = newAcresThisMonth * this.revenue.productSalePerNewAcre;

        // SaaS Revenue Calculation
        let saasRevenue = 0;
        if (month >= this.saasReleaseMonth) {
            const golfCourseClients = this.simulationState.clients.filter(c => c.type === 'golfCourse');
            let conversionRate = 0;
            for (const key in this.saasConversionCurve) {
                const period = this.saasConversionCurve[key];
                if (month >= period.startMonth && month <= period.endMonth) {
                    conversionRate = period.conversionRate;
                    break;
                }
            }
            const convertedClients = golfCourseClients.length * conversionRate;
            saasRevenue = convertedClients * this.revenue.saasPerGolfCourseClient;
        }

        const totalRevenue = serviceRevenue + installationRevenue + productRevenue + saasRevenue;

        // --- Gross Profit Calculation ---
        const serviceGP = serviceRevenue * this.margins.service;
        const installationGP = installationRevenue * this.margins.installation;
        const productGP = productRevenue * this.margins.product;
        const saasGP = saasRevenue * this.margins.saas;
        const totalGrossProfit = serviceGP + installationGP + productGP + saasGP;

        // --- Cost Calculation ---
        const totalClients = this.simulationState.clients.length;
        const overheadCosts = this.costs.baseOverhead;
        const clientSupportCosts = totalClients * this.costs.costPerClient;
        const operationalCosts = totalAcres * this.costs.costPerAcre;
        const totalCosts = overheadCosts + clientSupportCosts + operationalCosts;

        // --- Final Metrics ---
        const netCashFlow = totalGrossProfit - totalCosts;

        return {
            totalClients,
            totalAcres,
            totalRevenue,
            serviceRevenue,
            saasRevenue,
            totalCosts,
            totalGrossProfit,
            netCashFlow,
            clients: [...this.simulationState.clients] // Snapshot for debugging
        };
    }

    // ... Financial calculation methods will be added here in the next step ...

}

// Log to confirm the file is created and the class is defined
console.log("Client-Centric Financial Model (client-centric-model.js) loaded.");
const newModel = new ClientCentricFinancialModel();
console.log("New model instance created:", newModel);

