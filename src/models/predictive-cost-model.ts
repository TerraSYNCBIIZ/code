// Predictive Cost Modeling with Seasonal Variations
// Advanced forecasting system that considers weather, demand patterns, and equipment lifecycles

import { Equipment, CostParameters } from './types';
import { DynamicCostParameters, HistoricalData } from './dynamic-cost-parameters';

export interface SeasonalPattern {
  month: number;
  demandMultiplier: number;
  maintenanceMultiplier: number;
  fuelEfficiencyMultiplier: number;
  laborRequirementMultiplier: number;
  weatherImpactFactor: number;
}

export interface WeatherData {
  month: number;
  avgTemperature: number;
  rainfall: number;
  humidityPercent: number;
  windSpeed: number;
  extremeWeatherDays: number;
}

export interface CostPrediction {
  month: number;
  predictedCost: number;
  confidenceInterval: { lower: number; upper: number };
  seasonalFactor: number;
  weatherImpact: number;
  trendComponent: number;
  cyclicalComponent: number;
  breakdown: {
    equipment: number;
    labor: number;
    fuel: number;
    maintenance: number;
    weather: number;
  };
}

export interface PredictiveModelConfig {
  forecastHorizon: number; // months
  seasonalSmoothingFactor: number; // 0-1
  trendSmoothingFactor: number; // 0-1
  weatherImpactWeight: number; // 0-1
  confidenceLevel: number; // 0.8, 0.9, 0.95
}

export class PredictiveCostModel {
  private config: PredictiveModelConfig;
  private seasonalPatterns: SeasonalPattern[] = [];
  private weatherHistory: WeatherData[] = [];
  private costHistory: HistoricalData[] = [];
  private dynamicParams: DynamicCostParameters;
  
  constructor(
    dynamicParams: DynamicCostParameters,
    config: Partial<PredictiveModelConfig> = {}
  ) {
    this.dynamicParams = dynamicParams;
    this.config = {
      forecastHorizon: 12,
      seasonalSmoothingFactor: 0.3,
      trendSmoothingFactor: 0.2,
      weatherImpactWeight: 0.15,
      confidenceLevel: 0.9,
      ...config
    };
    
    this.initializeSeasonalPatterns();
  }
  
  private initializeSeasonalPatterns(): void {
    // Default seasonal patterns for lawn care industry
    this.seasonalPatterns = [
      { month: 0, demandMultiplier: 0.6, maintenanceMultiplier: 1.2, fuelEfficiencyMultiplier: 0.9, laborRequirementMultiplier: 0.7, weatherImpactFactor: 0.8 }, // Jan
      { month: 1, demandMultiplier: 0.7, maintenanceMultiplier: 1.1, fuelEfficiencyMultiplier: 0.9, laborRequirementMultiplier: 0.8, weatherImpactFactor: 0.8 }, // Feb
      { month: 2, demandMultiplier: 0.9, maintenanceMultiplier: 1.0, fuelEfficiencyMultiplier: 1.0, laborRequirementMultiplier: 1.0, weatherImpactFactor: 0.9 }, // Mar
      { month: 3, demandMultiplier: 1.2, maintenanceMultiplier: 0.9, fuelEfficiencyMultiplier: 1.1, laborRequirementMultiplier: 1.2, weatherImpactFactor: 1.0 }, // Apr
      { month: 4, demandMultiplier: 1.4, maintenanceMultiplier: 0.8, fuelEfficiencyMultiplier: 1.1, laborRequirementMultiplier: 1.3, weatherImpactFactor: 1.1 }, // May
      { month: 5, demandMultiplier: 1.3, maintenanceMultiplier: 0.9, fuelEfficiencyMultiplier: 1.0, laborRequirementMultiplier: 1.3, weatherImpactFactor: 1.2 }, // Jun
      { month: 6, demandMultiplier: 1.3, maintenanceMultiplier: 1.0, fuelEfficiencyMultiplier: 0.9, laborRequirementMultiplier: 1.3, weatherImpactFactor: 1.3 }, // Jul
      { month: 7, demandMultiplier: 1.2, maintenanceMultiplier: 1.1, fuelEfficiencyMultiplier: 0.9, laborRequirementMultiplier: 1.2, weatherImpactFactor: 1.2 }, // Aug
      { month: 8, demandMultiplier: 1.1, maintenanceMultiplier: 1.0, fuelEfficiencyMultiplier: 1.0, laborRequirementMultiplier: 1.1, weatherImpactFactor: 1.1 }, // Sep
      { month: 9, demandMultiplier: 1.0, maintenanceMultiplier: 0.9, fuelEfficiencyMultiplier: 1.0, laborRequirementMultiplier: 1.0, weatherImpactFactor: 1.0 }, // Oct
      { month: 10, demandMultiplier: 0.8, maintenanceMultiplier: 1.1, fuelEfficiencyMultiplier: 0.9, laborRequirementMultiplier: 0.9, weatherImpactFactor: 0.9 }, // Nov
      { month: 11, demandMultiplier: 0.6, maintenanceMultiplier: 1.3, fuelEfficiencyMultiplier: 0.8, laborRequirementMultiplier: 0.8, weatherImpactFactor: 0.8 }  // Dec
    ];
  }
  
  // Add historical cost data for training
  addHistoricalCostData(data: HistoricalData): void {
    this.costHistory.push(data);
    this.dynamicParams.addHistoricalDataPoint(data);
    
    // Keep only last 36 months
    if (this.costHistory.length > 36) {
      this.costHistory = this.costHistory.slice(-36);
    }
    
    this.updateSeasonalPatterns();
  }
  
  // Add weather data for weather-based predictions
  addWeatherData(weatherData: WeatherData): void {
    this.weatherHistory.push(weatherData);
    
    // Keep only last 24 months
    if (this.weatherHistory.length > 24) {
      this.weatherHistory = this.weatherHistory.slice(-24);
    }
  }
  
  // Update seasonal patterns based on historical data
  private updateSeasonalPatterns(): void {
    if (this.costHistory.length < 12) return;
    
    // Group costs by month
    const monthlyAverages: Record<number, number[]> = {};
    
    this.costHistory.forEach(data => {
      const month = data.month % 12;
      if (!monthlyAverages[month]) {
        monthlyAverages[month] = [];
      }
      monthlyAverages[month].push(data.actualCosts);
    });
    
    // Update seasonal patterns based on actual data
    this.seasonalPatterns.forEach(pattern => {
      const monthData = monthlyAverages[pattern.month];
      if (monthData && monthData.length > 0) {
        const avgCost = monthData.reduce((sum, cost) => sum + cost, 0) / monthData.length;
        const overallAvg = this.costHistory.reduce((sum, data) => sum + data.actualCosts, 0) / this.costHistory.length;
        
        const actualSeasonalFactor = avgCost / overallAvg;
        
        // Smooth the adjustment using exponential smoothing
        const smoothingFactor = this.config.seasonalSmoothingFactor;
        pattern.demandMultiplier = (1 - smoothingFactor) * pattern.demandMultiplier + smoothingFactor * actualSeasonalFactor;
      }
    });
  }
  
  // Calculate weather impact on costs
  private calculateWeatherImpact(month: number): number {
    const currentMonthIndex = month % 12;
    const weatherData = this.weatherHistory.find(w => w.month === currentMonthIndex);
    
    if (!weatherData) return 1.0; // No weather data, assume normal impact
    
    let weatherImpact = 1.0;
    
    // Temperature impact (extreme temperatures increase costs)
    if (weatherData.avgTemperature > 35 || weatherData.avgTemperature < -5) {
      weatherImpact *= 1.1;
    }
    
    // Rainfall impact (heavy rain increases maintenance, reduces efficiency)
    if (weatherData.rainfall > 200) {
      weatherImpact *= 1.15;
    } else if (weatherData.rainfall < 20) {
      weatherImpact *= 1.05; // Dry conditions require more irrigation
    }
    
    // Extreme weather days (significantly increase costs)
    if (weatherData.extremeWeatherDays > 5) {
      weatherImpact *= 1.2;
    }
    
    // Wind speed impact (affects spraying and precision work)
    if (weatherData.windSpeed > 25) {
      weatherImpact *= 1.08;
    }
    
    return weatherImpact;
  }
  
  // Detect cost trends using linear regression
  private detectCostTrend(): { slope: number; intercept: number; r2: number } {
    if (this.costHistory.length < 6) {
      return { slope: 0, intercept: 0, r2: 0 };
    }
    
    const n = this.costHistory.length;
    const sumX = this.costHistory.reduce((sum, _, index) => sum + index, 0);
    const sumY = this.costHistory.reduce((sum, data) => sum + data.actualCosts, 0);
    const sumXY = this.costHistory.reduce((sum, data, index) => sum + index * data.actualCosts, 0);
    const sumXX = this.costHistory.reduce((sum, _, index) => sum + index * index, 0);
    const sumYY = this.costHistory.reduce((sum, data) => sum + data.actualCosts * data.actualCosts, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Calculate R-squared
    const avgY = sumY / n;
    const totalSS = sumYY - n * avgY * avgY;
    const residualSS = this.costHistory.reduce((sum, data, index) => {
      const predicted = slope * index + intercept;
      return sum + Math.pow(data.actualCosts - predicted, 2);
    }, 0);
    
    const r2 = 1 - residualSS / totalSS;
    
    return { slope, intercept, r2 };
  }
  
  // Generate cost prediction for a specific month
  predictCost(month: number, acres: number, territoryId: string): CostPrediction {
    const seasonalPattern = this.seasonalPatterns[month % 12];
    const weatherImpact = this.calculateWeatherImpact(month);
    const trend = this.detectCostTrend();
    
    // Base cost calculation using current parameters
    const baseParams = this.dynamicParams.getCurrentAdjustedParameters();
    const baseCost = this.calculateBaseCost(acres, baseParams);
    
    // Apply seasonal adjustments
    const seasonalFactor = seasonalPattern.demandMultiplier * seasonalPattern.maintenanceMultiplier;
    const seasonalCost = baseCost * seasonalFactor;
    
    // Apply weather impact
    const weatherAdjustedCost = seasonalCost * weatherImpact;
    
    // Apply trend component
    const trendComponent = trend.slope * month;
    const trendAdjustedCost = weatherAdjustedCost + trendComponent;
    
    // Calculate cyclical component (business cycle effects)
    const cyclicalComponent = this.calculateCyclicalComponent(month);
    const finalPredictedCost = trendAdjustedCost * (1 + cyclicalComponent);
    
    // Calculate confidence interval
    const confidenceInterval = this.calculateConfidenceInterval(finalPredictedCost, month);
    
    // Break down cost components
    const breakdown = {
      equipment: finalPredictedCost * 0.4,
      labor: finalPredictedCost * 0.3,
      fuel: finalPredictedCost * 0.15,
      maintenance: finalPredictedCost * 0.1,
      weather: finalPredictedCost * (weatherImpact - 1)
    };
    
    return {
      month,
      predictedCost: finalPredictedCost,
      confidenceInterval,
      seasonalFactor,
      weatherImpact,
      trendComponent,
      cyclicalComponent,
      breakdown
    };
  }
  
  // Calculate base cost without seasonal/weather adjustments
  private calculateBaseCost(acres: number, params: CostParameters): number {
    // Simplified base cost calculation
    const hoursRequired = acres * 0.5; // 0.5 hours per acre average
    const laborCost = hoursRequired * params.laborCostPerHour;
    const fuelCost = hoursRequired * 2 * (params.fuelCostPerLiter || 1.5);
    const maintenanceCost = acres * 2; // $2 per acre maintenance
    const equipmentCost = acres * 3; // $3 per acre equipment costs
    
    return laborCost + fuelCost + maintenanceCost + equipmentCost;
  }
  
  // Calculate cyclical component (economic cycles)
  private calculateCyclicalComponent(month: number): number {
    // Simple sine wave for business cycle (7-year cycle)
    const cycleLength = 84; // 7 years * 12 months
    const phase = (month % cycleLength) / cycleLength * 2 * Math.PI;
    return Math.sin(phase) * 0.05; // ±5% cyclical variation
  }
  
  // Calculate confidence interval for prediction
  private calculateConfidenceInterval(predictedCost: number, month: number): { lower: number; upper: number } {
    let standardError = predictedCost * 0.1; // Base 10% error
    
    // Increase error for future months
    const futureMonthsPenalty = Math.min(month * 0.01, 0.2); // Up to 20% additional error
    standardError *= (1 + futureMonthsPenalty);
    
    // Adjust based on historical accuracy
    if (this.costHistory.length > 6) {
      const historicalErrors = this.costHistory.map(data => 
        Math.abs(data.actualCosts - data.projectedCosts) / data.actualCosts
      );
      const avgError = historicalErrors.reduce((sum, error) => sum + error, 0) / historicalErrors.length;
      standardError = predictedCost * avgError;
    }
    
    // Calculate confidence multiplier based on confidence level
    const confidenceMultiplier = this.config.confidenceLevel === 0.95 ? 1.96 : 
                                this.config.confidenceLevel === 0.9 ? 1.64 : 1.28;
    
    const margin = standardError * confidenceMultiplier;
    
    return {
      lower: Math.max(0, predictedCost - margin),
      upper: predictedCost + margin
    };
  }
  
  // Generate forecast for multiple months
  generateForecast(startMonth: number, acres: number, territoryId: string): CostPrediction[] {
    const forecast: CostPrediction[] = [];
    
    for (let month = startMonth; month < startMonth + this.config.forecastHorizon; month++) {
      const prediction = this.predictCost(month, acres, territoryId);
      forecast.push(prediction);
    }
    
    return forecast;
  }
  
  // Get prediction accuracy metrics
  getPredictionAccuracy(): {
    meanAbsoluteError: number;
    meanAbsolutePercentageError: number;
    rootMeanSquareError: number;
    r2: number;
  } {
    if (this.costHistory.length < 3) {
      return {
        meanAbsoluteError: 0,
        meanAbsolutePercentageError: 0,
        rootMeanSquareError: 0,
        r2: 0
      };
    }
    
    const errors = this.costHistory.map(data => data.actualCosts - data.projectedCosts);
    const absoluteErrors = errors.map(e => Math.abs(e));
    const percentageErrors = this.costHistory.map(data => 
      Math.abs(data.actualCosts - data.projectedCosts) / data.actualCosts * 100
    );
    const squaredErrors = errors.map(e => e * e);
    
    const meanAbsoluteError = absoluteErrors.reduce((sum, error) => sum + error, 0) / absoluteErrors.length;
    const meanAbsolutePercentageError = percentageErrors.reduce((sum, error) => sum + error, 0) / percentageErrors.length;
    const rootMeanSquareError = Math.sqrt(squaredErrors.reduce((sum, error) => sum + error, 0) / squaredErrors.length);
    
    // Calculate R-squared
    const actualMean = this.costHistory.reduce((sum, data) => sum + data.actualCosts, 0) / this.costHistory.length;
    const totalSumSquares = this.costHistory.reduce((sum, data) => sum + Math.pow(data.actualCosts - actualMean, 2), 0);
    const residualSumSquares = squaredErrors.reduce((sum, error) => sum + error, 0);
    const r2 = 1 - residualSumSquares / totalSumSquares;
    
    return {
      meanAbsoluteError,
      meanAbsolutePercentageError,
      rootMeanSquareError,
      r2
    };
  }
  
  // Get seasonal cost insights
  getSeasonalInsights(): Array<{
    month: string;
    costMultiplier: number;
    primaryFactors: string[];
    recommendations: string[];
  }> {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return this.seasonalPatterns.map(pattern => {
      const costMultiplier = pattern.demandMultiplier * pattern.maintenanceMultiplier;
      const primaryFactors = [];
      const recommendations = [];
      
      if (pattern.demandMultiplier > 1.2) {
        primaryFactors.push('High demand period');
        recommendations.push('Consider premium pricing');
      }
      
      if (pattern.maintenanceMultiplier > 1.1) {
        primaryFactors.push('Increased maintenance needs');
        recommendations.push('Schedule preventive maintenance');
      }
      
      if (pattern.weatherImpactFactor > 1.1) {
        primaryFactors.push('Weather-sensitive period');
        recommendations.push('Build weather contingency buffer');
      }
      
      if (pattern.fuelEfficiencyMultiplier < 0.9) {
        primaryFactors.push('Reduced fuel efficiency');
        recommendations.push('Consider electric equipment');
      }
      
      return {
        month: monthNames[pattern.month],
        costMultiplier,
        primaryFactors,
        recommendations
      };
    });
  }
}

// Export for use in other modules
export { PredictiveCostModel, SeasonalPattern, WeatherData, CostPrediction, PredictiveModelConfig };