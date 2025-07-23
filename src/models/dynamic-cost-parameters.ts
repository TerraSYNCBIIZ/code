// Dynamic Cost Parameter Adjustment System
// Allows real-time cost parameter updates based on market conditions and historical data

import { CostParameters } from './types';

export interface MarketCondition {
  fuelPriceIndex: number; // 0.8-1.2 multiplier
  electricityPriceIndex: number; // 0.8-1.2 multiplier
  laborMarketTightness: number; // 0.9-1.3 multiplier
  insuranceMarketCondition: number; // 0.8-1.4 multiplier
  equipmentAvailability: number; // 0.9-1.2 multiplier (affects depreciation)
  seasonalDemand: number; // 0.8-1.3 multiplier
  regionIndex: number; // 0.7-1.4 multiplier for regional cost variations
}

export interface HistoricalData {
  month: number;
  actualCosts: number;
  projectedCosts: number;
  variance: number;
  acresServiced: number;
  equipmentUtilization: number;
}

export interface CostParameterAdjustment {
  parameterId: string;
  originalValue: number;
  adjustedValue: number;
  adjustmentFactor: number;
  reason: string;
  confidence: number;
  effectiveDate: Date;
}

export class DynamicCostParameters {
  private baseCostParameters: CostParameters;
  private marketConditions: MarketCondition;
  private historicalData: HistoricalData[] = [];
  private adjustmentHistory: CostParameterAdjustment[] = [];
  
  constructor(baseCostParameters: CostParameters) {
    this.baseCostParameters = { ...baseCostParameters };
    this.marketConditions = this.getDefaultMarketConditions();
  }
  
  private getDefaultMarketConditions(): MarketCondition {
    return {
      fuelPriceIndex: 1.0,
      electricityPriceIndex: 1.0,
      laborMarketTightness: 1.0,
      insuranceMarketCondition: 1.0,
      equipmentAvailability: 1.0,
      seasonalDemand: 1.0,
      regionIndex: 1.0
    };
  }
  
  // Update market conditions from external data sources
  updateMarketConditions(newConditions: Partial<MarketCondition>): void {
    this.marketConditions = { ...this.marketConditions, ...newConditions };
    this.recalculateAdjustments();
  }
  
  // Add historical data point for learning
  addHistoricalDataPoint(data: HistoricalData): void {
    this.historicalData.push(data);
    
    // Keep only last 24 months of data
    if (this.historicalData.length > 24) {
      this.historicalData = this.historicalData.slice(-24);
    }
    
    this.learnFromHistoricalData();
  }
  
  // Machine learning-inspired adjustment based on historical variance
  private learnFromHistoricalData(): void {
    if (this.historicalData.length < 3) return;
    
    const recentData = this.historicalData.slice(-6); // Last 6 months
    const avgVariance = recentData.reduce((sum, data) => sum + data.variance, 0) / recentData.length;
    
    // If we're consistently under/over-estimating, adjust parameters
    if (Math.abs(avgVariance) > 0.1) {
      const adjustmentFactor = 1 + (avgVariance * 0.1); // 10% of variance
      
      // Adjust labor costs if utilization is consistently different
      const avgUtilization = recentData.reduce((sum, data) => sum + data.equipmentUtilization, 0) / recentData.length;
      if (avgUtilization > 0.8) {
        this.addParameterAdjustment('laborCostPerHour', adjustmentFactor * 1.1, 'High equipment utilization detected');
      } else if (avgUtilization < 0.5) {
        this.addParameterAdjustment('laborCostPerHour', adjustmentFactor * 0.9, 'Low equipment utilization detected');
      }
    }
  }
  
  // Add a parameter adjustment
  private addParameterAdjustment(parameterId: string, adjustmentFactor: number, reason: string): void {
    const originalValue = this.baseCostParameters[parameterId as keyof CostParameters] as number;
    const adjustedValue = originalValue * adjustmentFactor;
    
    const adjustment: CostParameterAdjustment = {
      parameterId,
      originalValue,
      adjustedValue,
      adjustmentFactor,
      reason,
      confidence: this.calculateAdjustmentConfidence(parameterId),
      effectiveDate: new Date()
    };
    
    this.adjustmentHistory.push(adjustment);
    
    // Keep only last 12 adjustments per parameter
    const parameterAdjustments = this.adjustmentHistory.filter(adj => adj.parameterId === parameterId);
    if (parameterAdjustments.length > 12) {
      this.adjustmentHistory = this.adjustmentHistory.filter(adj => 
        adj.parameterId !== parameterId || parameterAdjustments.slice(-12).includes(adj)
      );
    }
  }
  
  // Calculate confidence level for parameter adjustment
  private calculateAdjustmentConfidence(parameterId: string): number {
    const relevantData = this.historicalData.filter(data => 
      Math.abs(data.variance) < 0.5 // Only consider data with reasonable variance
    );
    
    if (relevantData.length < 3) return 0.3;
    if (relevantData.length < 6) return 0.6;
    if (relevantData.length < 12) return 0.8;
    return 0.9;
  }
  
  // Recalculate all adjustments based on current market conditions
  private recalculateAdjustments(): void {
    const now = new Date();
    
    // Fuel cost adjustments
    if (this.marketConditions.fuelPriceIndex !== 1.0) {
      this.addParameterAdjustment(
        'fuelCostPerLiter', 
        this.marketConditions.fuelPriceIndex,
        `Market fuel price index: ${this.marketConditions.fuelPriceIndex}`
      );
    }
    
    // Electricity cost adjustments
    if (this.marketConditions.electricityPriceIndex !== 1.0) {
      this.addParameterAdjustment(
        'electricityCostPerKwh',
        this.marketConditions.electricityPriceIndex,
        `Market electricity price index: ${this.marketConditions.electricityPriceIndex}`
      );
    }
    
    // Labor cost adjustments
    if (this.marketConditions.laborMarketTightness !== 1.0) {
      this.addParameterAdjustment(
        'laborCostPerHour',
        this.marketConditions.laborMarketTightness * this.marketConditions.seasonalDemand,
        `Labor market tightness: ${this.marketConditions.laborMarketTightness}, Seasonal demand: ${this.marketConditions.seasonalDemand}`
      );
    }
    
    // Insurance cost adjustments
    if (this.marketConditions.insuranceMarketCondition !== 1.0) {
      this.addParameterAdjustment(
        'insuranceCostPerYear',
        this.marketConditions.insuranceMarketCondition,
        `Insurance market condition: ${this.marketConditions.insuranceMarketCondition}`
      );
    }
  }
  
  // Get current adjusted parameters
  getCurrentAdjustedParameters(): CostParameters {
    const adjustedParams = { ...this.baseCostParameters };
    
    // Apply most recent adjustments for each parameter
    Object.keys(adjustedParams).forEach(paramKey => {
      const recentAdjustment = this.adjustmentHistory
        .filter(adj => adj.parameterId === paramKey)
        .sort((a, b) => b.effectiveDate.getTime() - a.effectiveDate.getTime())[0];
      
      if (recentAdjustment) {
        (adjustedParams as any)[paramKey] = recentAdjustment.adjustedValue;
      }
    });
    
    return adjustedParams;
  }
  
  // Get parameter with confidence level
  getParameterWithConfidence(parameterId: string): { value: number; confidence: number; adjustments: CostParameterAdjustment[] } {
    const currentParams = this.getCurrentAdjustedParameters();
    const value = (currentParams as any)[parameterId] || 0;
    
    const parameterAdjustments = this.adjustmentHistory
      .filter(adj => adj.parameterId === parameterId)
      .sort((a, b) => b.effectiveDate.getTime() - a.effectiveDate.getTime());
    
    const confidence = parameterAdjustments.length > 0 ? 
      parameterAdjustments[0].confidence : 0.5;
    
    return {
      value,
      confidence,
      adjustments: parameterAdjustments.slice(0, 5) // Last 5 adjustments
    };
  }
  
  // Simulate parameter changes for scenario analysis
  simulateParameterChange(parameterId: string, changePercent: number): CostParameters {
    const currentParams = this.getCurrentAdjustedParameters();
    const simulatedParams = { ...currentParams };
    
    const currentValue = (currentParams as any)[parameterId] || 0;
    (simulatedParams as any)[parameterId] = currentValue * (1 + changePercent / 100);
    
    return simulatedParams;
  }
  
  // Get sensitivity analysis for all parameters
  getSensitivityAnalysis(): Record<string, { low: number; base: number; high: number }> {
    const baseParams = this.getCurrentAdjustedParameters();
    const sensitivity: Record<string, { low: number; base: number; high: number }> = {};
    
    Object.keys(baseParams).forEach(paramKey => {
      const baseValue = (baseParams as any)[paramKey];
      if (typeof baseValue === 'number') {
        sensitivity[paramKey] = {
          low: baseValue * 0.8,
          base: baseValue,
          high: baseValue * 1.2
        };
      }
    });
    
    return sensitivity;
  }
  
  // Get adjustment recommendations based on trends
  getRecommendations(): Array<{ parameter: string; recommendation: string; confidence: number }> {
    const recommendations: Array<{ parameter: string; recommendation: string; confidence: number }> = [];
    
    // Analyze historical trends
    if (this.historicalData.length > 6) {
      const recentData = this.historicalData.slice(-6);
      const avgVariance = recentData.reduce((sum, data) => sum + data.variance, 0) / recentData.length;
      
      if (avgVariance > 0.2) {
        recommendations.push({
          parameter: 'general',
          recommendation: 'Costs are consistently higher than projected. Consider updating base parameters.',
          confidence: 0.8
        });
      } else if (avgVariance < -0.2) {
        recommendations.push({
          parameter: 'general',
          recommendation: 'Costs are consistently lower than projected. Parameters may be too conservative.',
          confidence: 0.8
        });
      }
    }
    
    // Market condition recommendations
    if (this.marketConditions.fuelPriceIndex > 1.1) {
      recommendations.push({
        parameter: 'fuelCostPerLiter',
        recommendation: 'Fuel prices are elevated. Consider fuel-efficient equipment or electric alternatives.',
        confidence: 0.9
      });
    }
    
    if (this.marketConditions.laborMarketTightness > 1.2) {
      recommendations.push({
        parameter: 'laborCostPerHour',
        recommendation: 'Labor market is tight. Consider increasing automation or adjusting pricing.',
        confidence: 0.8
      });
    }
    
    return recommendations;
  }
  
  // Export current state for persistence
  exportState(): {
    baseCostParameters: CostParameters;
    marketConditions: MarketCondition;
    historicalData: HistoricalData[];
    adjustmentHistory: CostParameterAdjustment[];
  } {
    return {
      baseCostParameters: this.baseCostParameters,
      marketConditions: this.marketConditions,
      historicalData: this.historicalData,
      adjustmentHistory: this.adjustmentHistory
    };
  }
  
  // Import previously saved state
  importState(state: {
    baseCostParameters: CostParameters;
    marketConditions: MarketCondition;
    historicalData: HistoricalData[];
    adjustmentHistory: CostParameterAdjustment[];
  }): void {
    this.baseCostParameters = state.baseCostParameters;
    this.marketConditions = state.marketConditions;
    this.historicalData = state.historicalData;
    this.adjustmentHistory = state.adjustmentHistory;
  }
  
  // Reset to base parameters
  resetToBaseParameters(): void {
    this.adjustmentHistory = [];
    this.marketConditions = this.getDefaultMarketConditions();
  }
}

// Export for use in other modules
export { DynamicCostParameters, MarketCondition, HistoricalData, CostParameterAdjustment };