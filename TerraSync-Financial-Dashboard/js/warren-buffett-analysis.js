// WARREN BUFFETT STYLE INVESTMENT ANALYSIS
// Focus: Intrinsic Value, Economic Moats, Long-term Competitive Advantages

class WarrenBuffettAnalysis {
    constructor(financialModel) {
        this.model = financialModel;
        
        // Buffett's Key Investment Criteria
        this.buffettCriteria = {
            minimumROIC: 0.15,        // 15% minimum return on invested capital
            marginOfSafety: 0.25,     // 25% margin of safety requirement
            paybackPeriod: 10,        // Maximum 10-year payback period
            sustainableGrowth: 0.10,  // 10% sustainable growth rate
            debtToEquity: 0.30       // Maximum 30% debt-to-equity ratio
        };
    }

    // INTRINSIC VALUE CALCULATION (Discounted Cash Flow)
    calculateIntrinsicValue(scenario, discountRate = 0.10) {
        const scenarioData = this.model.generateScenario(scenario);
        const projectionYears = 10; // 10-year DCF analysis
        const terminalGrowthRate = 0.03; // 3% terminal growth
        
        let intrinsicValue = 0;
        let previousCashFlow = 0;
        const annualCashFlows = [];
        
        // Calculate annual free cash flows
        for (let year = 1; year <= projectionYears; year++) {
            const endOfYearMonth = year * 12 - 1;
            const territories = this.getCurrentTerritories(scenarioData.territorySchedule, endOfYearMonth);
            const acres = this.calculateTotalAcres(territories, endOfYearMonth);
            const saasUsers = Math.floor(acres * 0.20);
            
            // Calculate annual metrics
            let annualRevenue = 0;
            let annualGrossProfit = 0;
            let annualOpex = 0;
            let territoryInvestments = 0;
            
            for (let month = (year - 1) * 12; month < year * 12; month++) {
                const monthTerritories = this.getCurrentTerritories(scenarioData.territorySchedule, month);
                const monthAcres = this.calculateTotalAcres(monthTerritories, month);
                const monthSaasUsers = Math.floor(monthAcres * 0.20);
                
                const revenue = this.model.calculateMonthlyRevenue(monthAcres, monthTerritories, monthSaasUsers, month);
                const grossProfit = this.model.calculateGrossProfit(revenue);
                const opex = this.model.calculateOpex(monthTerritories);
                
                annualRevenue += revenue.total;
                annualGrossProfit += grossProfit.total * this.model.assumptions.territoryPartnershipSplit;
                annualOpex += opex.total;
                
                // Track territory investments
                const prevMonthTerritories = month > 0 ? this.getCurrentTerritories(scenarioData.territorySchedule, month - 1) : 0;
                if (monthTerritories > prevMonthTerritories) {
                    territoryInvestments += (monthTerritories - prevMonthTerritories) * this.model.assumptions.territoryInvestment;
                }
            }
            
            const operatingCashFlow = annualGrossProfit - annualOpex;
            const maintenanceCapex = territories * 24000; // $24K per territory per year
            const freeCashFlow = operatingCashFlow - territoryInvestments - maintenanceCapex;
            
            annualCashFlows.push({
                year: year,
                revenue: annualRevenue,
                operatingCashFlow: operatingCashFlow,
                freeCashFlow: freeCashFlow,
                territories: territories,
                acres: acres,
                roic: territories > 0 ? operatingCashFlow / (territories * this.model.assumptions.territoryInvestment) : 0
            });
            
            // Discount cash flow to present value
            const discountedCashFlow = freeCashFlow / Math.pow(1 + discountRate, year);
            intrinsicValue += discountedCashFlow;
            
            previousCashFlow = freeCashFlow;
        }
        
        // Terminal Value (Gordon Growth Model)
        const terminalValue = (previousCashFlow * (1 + terminalGrowthRate)) / (discountRate - terminalGrowthRate);
        const discountedTerminalValue = terminalValue / Math.pow(1 + discountRate, projectionYears);
        
        intrinsicValue += discountedTerminalValue;
        
        return {
            intrinsicValue: intrinsicValue,
            terminalValue: discountedTerminalValue,
            cashFlowValue: intrinsicValue - discountedTerminalValue,
            annualCashFlows: annualCashFlows,
            averageROIC: this.calculateAverageROIC(annualCashFlows),
            totalInvestment: this.calculateTotalInvestment(scenarioData)
        };
    }

    // ECONOMIC MOAT ANALYSIS
    analyzeEconomicMoats(scenario) {
        const moats = {
            // 1. Network Effects
            networkEffects: {
                strength: 8, // 1-10 scale
                description: "Territory density creates regional network effects. More territories = better coverage, customer referrals, operational efficiency.",
                defensibility: "Strong - competitors need similar density to compete effectively",
                sustainability: "High - increases with scale"
            },
            
            // 2. Switching Costs  
            switchingCosts: {
                strength: 7,
                description: "Custom terracing solutions, established relationships, seasonal contracts create high switching costs.",
                defensibility: "Moderate - new competitors can offer incentives to switch",
                sustainability: "Medium - requires ongoing relationship management"
            },
            
            // 3. Economies of Scale
            economiesOfScale: {
                strength: 9,
                description: "Fixed OpEx spreads across territories. Bulk purchasing, shared infrastructure, management efficiency.",
                defensibility: "Very Strong - smaller competitors cannot match unit economics",
                sustainability: "Very High - scale advantages compound over time"
            },
            
            // 4. Brand Recognition
            brandRecognition: {
                strength: 6,
                description: "Local brand recognition in golf course/landscaping industry. Word-of-mouth referrals.",
                defensibility: "Moderate - takes time to build but can be replicated",
                sustainability: "Medium - requires ongoing marketing investment"
            },
            
            // 5. Regulatory Barriers
            regulatoryBarriers: {
                strength: 4,
                description: "Limited regulatory barriers. Some environmental/landscaping licenses required.",
                defensibility: "Low - barriers exist but not prohibitive",
                sustainability: "Low - regulations could change"
            }
        };
        
        // Calculate Overall Moat Score
        const moatScores = Object.values(moats).map(moat => moat.strength);
        const averageMoatStrength = moatScores.reduce((a, b) => a + b, 0) / moatScores.length;
        
        return {
            individualMoats: moats,
            overallStrength: averageMoatStrength,
            primaryMoats: ["economiesOfScale", "networkEffects"],
            competitiveAdvantage: averageMoatStrength >= 7 ? "Strong" : averageMoatStrength >= 5 ? "Moderate" : "Weak"
        };
    }

    // BUFFETT SCORECARD
    generateBuffettScorecard(scenario) {
        const valuation = this.calculateIntrinsicValue(scenario);
        const moats = this.analyzeEconomicMoats(scenario);
        const totalInvestment = valuation.totalInvestment;
        
        const scorecard = {
            // 1. Understandable Business
            businessUnderstanding: {
                score: 9,
                reasoning: "Clear revenue model (recurring service + one-time sales). Predictable territory expansion. Simple unit economics."
            },
            
            // 2. Favorable Long-term Prospects  
            longTermProspects: {
                score: 8,
                reasoning: "Golf course market stable. Climate change may increase terracing demand. Recurring revenue model provides stability."
            },
            
            // 3. Management Quality
            managementQuality: {
                score: 7, // Assume competent based on model sophistication
                reasoning: "Financial model shows sophisticated understanding of unit economics and scaling challenges."
            },
            
            // 4. Attractive Valuation
            attractiveValuation: {
                score: this.calculateValuationScore(valuation.intrinsicValue, totalInvestment),
                reasoning: `Intrinsic Value: $${(valuation.intrinsicValue/1000000).toFixed(1)}M vs Investment: $${(totalInvestment/1000000).toFixed(1)}M`
            },
            
            // 5. Return on Invested Capital
            roicQuality: {
                score: this.calculateROICScore(valuation.averageROIC),
                reasoning: `Average ROIC: ${(valuation.averageROIC * 100).toFixed(1)}% (Target: ${this.buffettCriteria.minimumROIC * 100}%+)`
            },
            
            // 6. Economic Moats
            economicMoats: {
                score: moats.overallStrength,
                reasoning: `${moats.competitiveAdvantage} competitive position. Primary moats: economies of scale, network effects.`
            },
            
            // 7. Margin of Safety
            marginOfSafety: {
                score: this.calculateMarginOfSafetyScore(valuation.intrinsicValue, totalInvestment),
                reasoning: `${((valuation.intrinsicValue - totalInvestment) / totalInvestment * 100).toFixed(1)}% margin of safety`
            }
        };
        
        // Calculate Overall Score
        const scores = Object.values(scorecard).map(criteria => criteria.score);
        const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        return {
            criteria: scorecard,
            overallScore: overallScore,
            investmentRecommendation: this.generateInvestmentRecommendation(overallScore, valuation),
            keyRisks: this.identifyKeyRisks(),
            keyOpportunities: this.identifyKeyOpportunities()
        };
    }

    // CONSERVATIVE SCENARIO STRESS TESTING
    stressTestScenarios() {
        const baseScenario = 'realistic';
        const stressTests = {
            // Economic Recession Impact
            recession: {
                revenueReduction: 0.25,    // 25% revenue reduction
                territoryDelays: 6,         // 6-month delays in expansion
                description: "Economic recession reduces golf course spending"
            },
            
            // Competitive Pressure
            competition: {
                marginCompression: 0.15,    // 15% margin compression
                acquisitionSlowdown: 0.30,  // 30% slower acre acquisition
                description: "New competitors enter market"
            },
            
            // Operational Challenges
            operational: {
                opexIncrease: 0.20,        // 20% higher OpEx
                customerChurn: 0.10,       // 10% annual churn
                description: "Operational scaling challenges"
            },
            
            // Regulatory Changes
            regulatory: {
                complianceCosts: 50000,    // $50K annual compliance per territory
                growthRestrictions: 0.50,  // 50% slower expansion
                description: "New environmental regulations"
            }
        };
        
        const results = {};
        
        Object.keys(stressTests).forEach(testName => {
            const test = stressTests[testName];
            const stressedValuation = this.calculateStressedValuation(baseScenario, test);
            
            results[testName] = {
                ...test,
                stressedIntrinsicValue: stressedValuation.intrinsicValue,
                valueImpact: (stressedValuation.intrinsicValue / this.calculateIntrinsicValue(baseScenario).intrinsicValue) - 1,
                investmentViability: stressedValuation.intrinsicValue > this.calculateTotalInvestment(this.model.generateScenario(baseScenario))
            };
        });
        
        return results;
    }

    // UTILITY METHODS
    calculateValuationScore(intrinsicValue, investment) {
        const ratio = intrinsicValue / investment;
        if (ratio >= 2.0) return 10;  // 100% return
        if (ratio >= 1.5) return 8;   // 50% return
        if (ratio >= 1.25) return 6;  // 25% return
        if (ratio >= 1.0) return 4;   // Break even
        return 2; // Loss
    }

    calculateROICScore(roic) {
        if (roic >= 0.25) return 10;  // 25%+ ROIC
        if (roic >= 0.20) return 8;   // 20%+ ROIC
        if (roic >= 0.15) return 6;   // 15%+ ROIC (Buffett minimum)
        if (roic >= 0.10) return 4;   // 10%+ ROIC
        return 2; // Below 10%
    }

    calculateMarginOfSafetyScore(intrinsicValue, investment) {
        const marginOfSafety = (intrinsicValue - investment) / investment;
        if (marginOfSafety >= 0.50) return 10;  // 50%+ margin
        if (marginOfSafety >= 0.25) return 8;   // 25%+ margin (Buffett target)
        if (marginOfSafety >= 0.15) return 6;   // 15%+ margin
        if (marginOfSafety >= 0.05) return 4;   // 5%+ margin
        return 2; // Insufficient margin
    }

    generateInvestmentRecommendation(score, valuation) {
        if (score >= 8) {
            return {
                recommendation: "STRONG BUY",
                reasoning: "Exceeds Warren Buffett investment criteria. Strong economic moats, attractive valuation, predictable cash flows.",
                confidence: "High"
            };
        } else if (score >= 6.5) {
            return {
                recommendation: "BUY", 
                reasoning: "Solid investment opportunity. Good fundamentals with some areas for improvement.",
                confidence: "Medium-High"
            };
        } else if (score >= 5) {
            return {
                recommendation: "HOLD/CONDITIONAL",
                reasoning: "Adequate investment but not compelling. Consider only with significant margin of safety.",
                confidence: "Medium"
            };
        } else {
            return {
                recommendation: "AVOID",
                reasoning: "Does not meet Buffett investment criteria. High risk relative to potential returns.",
                confidence: "High"
            };
        }
    }

    identifyKeyRisks() {
        return [
            "Golf course industry consolidation could reduce customer base",
            "Economic recession could delay territory expansion plans",
            "Seasonal weather patterns could impact revenue predictability",
            "Competition from landscaping companies with existing relationships",
            "Regulatory changes affecting terracing/landscaping industry"
        ];
    }

    identifyKeyOpportunities() {
        return [
            "Climate change increasing demand for erosion control solutions",
            "Golf course sustainability trends favor terracing solutions",
            "SaaS platform could expand beyond terracing to full course management",
            "Acquisition opportunities in fragmented landscaping market",
            "International expansion to countries with golf course markets"
        ];
    }

    // Helper methods
    getCurrentTerritories(schedule, month) {
        let territories = 2;
        for (const milestone of schedule) {
            if (month >= milestone.month) {
                territories = milestone.territories;
            }
        }
        return territories;
    }

    calculateTotalAcres(territories, month) {
        let totalAcres = 0;
        for (let i = 0; i < territories; i++) {
            const territoryAge = Math.max(0, month - (i * 3));
            totalAcres += this.model.calculateAcresForTerritory(territoryAge);
        }
        return totalAcres;
    }

    calculateAverageROIC(cashFlows) {
        const roics = cashFlows.filter(cf => cf.roic > 0).map(cf => cf.roic);
        return roics.length > 0 ? roics.reduce((a, b) => a + b, 0) / roics.length : 0;
    }

    calculateTotalInvestment(scenarioData) {
        return scenarioData.capitalInjection.amount;
    }

    calculateStressedValuation(scenario, stressTest) {
        // Simplified stress testing - would implement full stressed DCF in production
        const baseValuation = this.calculateIntrinsicValue(scenario);
        let stressedValue = baseValuation.intrinsicValue;
        
        if (stressTest.revenueReduction) {
            stressedValue *= (1 - stressTest.revenueReduction);
        }
        if (stressTest.marginCompression) {
            stressedValue *= (1 - stressTest.marginCompression);
        }
        if (stressTest.opexIncrease) {
            stressedValue *= (1 - stressTest.opexIncrease * 0.5); // Assume 50% flow-through
        }
        
        return { intrinsicValue: stressedValue };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarrenBuffettAnalysis;
} 