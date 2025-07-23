// Enhanced Dynamic Cost Modeling System
// Integrates equipment-specific costs with territory financial projections

import { Equipment, CostModel, CostParameters, CostBreakdown, DepreciationMethod } from './types';

export interface TerritoryConfiguration {
  id: string;
  name: string;
  startDate: Date;
  targetAcres: number;
  currentAcres: number;
  equipmentIds: string[];
  territoryType: 'residential' | 'commercial' | 'mixed';
  regionModifier: number; // Cost adjustment factor for region (0.8-1.2)
  seasonalityFactor: number; // Seasonal cost variation (0.9-1.1)
}

export interface EnhancedCostBreakdown extends CostBreakdown {
  // Equipment-specific costs
  equipmentDepreciation: Record<string, number>;
  equipmentMaintenance: Record<string, number>;
  equipmentOperating: Record<string, number>;
  
  // Territory-specific costs
  territoryOverhead: number;
  laborByEquipment: Record<string, number>;
  
  // Dynamic adjustments
  seasonalAdjustment: number;
  regionAdjustment: number;
  maturityAdjustment: number;
}

export interface CostProjection {
  month: number;
  territoryId: string;
  acres: number;
  totalCost: number;
  costPerAcre: number;
  breakdown: EnhancedCostBreakdown;
  confidence: number; // 0-1 confidence level
}

export class EnhancedCostModel {
  private equipment: Map<string, Equipment> = new Map();
  private territories: Map<string, TerritoryConfiguration> = new Map();
  private costParameters: CostParameters;
  
  constructor(costParameters: CostParameters) {
    this.costParameters = costParameters;
  }
  
  // Equipment Management
  addEquipment(equipment: Equipment): void {
    this.equipment.set(equipment.id, equipment);
  }
  
  addTerritory(territory: TerritoryConfiguration): void {
    this.territories.set(territory.id, territory);
  }
  
  // Core Cost Calculation Methods
  calculateEquipmentDepreciation(equipmentId: string, month: number): number {
    const equipment = this.equipment.get(equipmentId);
    if (!equipment) return 0;
    
    const ageInMonths = month;
    const lifespanMonths = equipment.expectedLifespan * 12;
    
    switch (this.costParameters.depreciationMethod) {
      case DepreciationMethod.STRAIGHT_LINE:
        return (equipment.purchasePrice / lifespanMonths);
        
      case DepreciationMethod.DECLINING_BALANCE:
        const rate = 2 / equipment.expectedLifespan;
        const bookValue = equipment.purchasePrice * Math.pow(1 - rate, ageInMonths / 12);
        return bookValue * rate / 12;
        
      case DepreciationMethod.UNITS_OF_PRODUCTION:
        // Based on acres serviced vs total expected acres
        const expectedTotalAcres = equipment.expectedLifespan * this.costParameters.operatingHoursPerYear * 10; // Assume 10 acres/hour
        const acresThisMonth = 100; // Would be calculated from territory data
        return (equipment.purchasePrice / expectedTotalAcres) * acresThisMonth;
        
      default:
        return equipment.purchasePrice / lifespanMonths;
    }
  }
  
  calculateEquipmentMaintenance(equipmentId: string, month: number): number {
    const equipment = this.equipment.get(equipmentId);
    if (!equipment) return 0;
    
    let totalMaintenanceCost = 0;
    
    equipment.maintenanceSchedule.forEach(schedule => {
      if (!schedule.isActive) return;
      
      // Calculate if maintenance is due this month
      const monthsSinceStart = month;
      const intervalMonths = schedule.intervalMonths || (schedule.intervalHours / (this.costParameters.operatingHoursPerYear / 12));
      
      if (monthsSinceStart % intervalMonths === 0) {
        totalMaintenanceCost += schedule.estimatedCost;
      }
    });
    
    return totalMaintenanceCost;
  }
  
  calculateEquipmentOperating(equipmentId: string, acresServiced: number): number {
    const equipment = this.equipment.get(equipmentId);
    if (!equipment) return 0;
    
    let operatingCost = 0;
    
    // Fuel/Electricity costs
    const hoursOperated = acresServiced / (equipment.specifications.operatingSpeed || 5); // 5 acres/hour default
    
    switch (equipment.specifications.powerSource) {
      case 'electric':
        const kwUsed = hoursOperated * (equipment.specifications.batteryCapacity || 50) * 0.8; // 80% efficiency
        operatingCost += kwUsed * (this.costParameters.electricityCostPerKwh || 0.12);
        break;
        
      case 'gasoline':
      case 'diesel':
        const litersUsed = hoursOperated * 2; // 2L/hour average
        operatingCost += litersUsed * (this.costParameters.fuelCostPerLiter || 1.5);
        break;
        
      case 'hybrid':
        // 50% electric, 50% fuel
        const kwUsedHybrid = hoursOperated * 25 * 0.8;
        const litersUsedHybrid = hoursOperated * 1;
        operatingCost += (kwUsedHybrid * 0.12) + (litersUsedHybrid * 1.5);
        break;
    }
    
    // Labor costs (varies by autonomy level)
    const laborMultiplier = equipment.specifications.autonomyLevel === 'fully_autonomous' ? 0.2 : 
                           equipment.specifications.autonomyLevel === 'semi_autonomous' ? 0.6 : 1.0;
    
    operatingCost += hoursOperated * this.costParameters.laborCostPerHour * laborMultiplier;
    
    return operatingCost;
  }
  
  // Territory-Specific Cost Calculations
  calculateTerritoryOverhead(territoryId: string, month: number): number {
    const territory = this.territories.get(territoryId);
    if (!territory) return 0;
    
    const baseOverhead = 500; // $500/month base
    const maturityBonus = Math.min(month * 10, 200); // Up to $200 bonus for mature territories
    
    return baseOverhead + maturityBonus;
  }
  
  calculateSeasonalAdjustment(month: number): number {
    // Higher costs in growing season (March-October)
    const seasonalFactors = [0.9, 0.9, 1.0, 1.1, 1.2, 1.2, 1.2, 1.2, 1.1, 1.0, 0.9, 0.9];
    return seasonalFactors[month % 12];
  }
  
  calculateMaturityAdjustment(territoryId: string, month: number): number {
    const territory = this.territories.get(territoryId);
    if (!territory) return 1.0;
    
    // Newer territories have higher costs due to setup and learning curve
    if (month < 6) return 1.3;
    if (month < 12) return 1.1;
    if (month < 24) return 1.0;
    return 0.95; // Mature territories more efficient
  }
  
  // Main Cost Projection Method
  calculateTerritoryProjection(territoryId: string, month: number, projectedAcres: number): CostProjection {
    const territory = this.territories.get(territoryId);
    if (!territory) {
      throw new Error(`Territory ${territoryId} not found`);
    }
    
    const breakdown: EnhancedCostBreakdown = {
      depreciation: 0,
      fuel: 0,
      electricity: 0,
      maintenance: 0,
      labor: 0,
      insurance: 0,
      other: 0,
      equipmentDepreciation: {},
      equipmentMaintenance: {},
      equipmentOperating: {},
      territoryOverhead: 0,
      laborByEquipment: {},
      seasonalAdjustment: 0,
      regionAdjustment: 0,
      maturityAdjustment: 0
    };
    
    // Calculate costs for each piece of equipment
    territory.equipmentIds.forEach(equipmentId => {
      const equipment = this.equipment.get(equipmentId);
      if (!equipment) return;
      
      const equipmentAcres = projectedAcres / territory.equipmentIds.length; // Distribute acres evenly
      
      // Equipment-specific costs
      const depreciation = this.calculateEquipmentDepreciation(equipmentId, month);
      const maintenance = this.calculateEquipmentMaintenance(equipmentId, month);
      const operating = this.calculateEquipmentOperating(equipmentId, equipmentAcres);
      
      breakdown.equipmentDepreciation[equipmentId] = depreciation;
      breakdown.equipmentMaintenance[equipmentId] = maintenance;
      breakdown.equipmentOperating[equipmentId] = operating;
      
      // Aggregate into main categories
      breakdown.depreciation += depreciation;
      breakdown.maintenance += maintenance;
      
      // Break down operating costs
      if (equipment.specifications.powerSource === 'electric') {
        breakdown.electricity += operating * 0.3; // 30% of operating is electricity
        breakdown.labor += operating * 0.7; // 70% is labor
      } else {
        breakdown.fuel += operating * 0.4; // 40% of operating is fuel
        breakdown.labor += operating * 0.6; // 60% is labor
      }
      
      breakdown.laborByEquipment[equipmentId] = operating * 0.6;
    });
    
    // Territory overhead
    breakdown.territoryOverhead = this.calculateTerritoryOverhead(territoryId, month);
    breakdown.other = breakdown.territoryOverhead;
    
    // Insurance (annual cost divided by 12)
    breakdown.insurance = this.costParameters.insuranceCostPerYear / 12;
    
    // Calculate adjustment factors
    const seasonalFactor = this.calculateSeasonalAdjustment(month);
    const maturityFactor = this.calculateMaturityAdjustment(territoryId, month);
    const regionFactor = territory.regionModifier;
    
    breakdown.seasonalAdjustment = seasonalFactor;
    breakdown.regionAdjustment = regionFactor;
    breakdown.maturityAdjustment = maturityFactor;
    
    // Apply adjustments
    const adjustmentFactor = seasonalFactor * maturityFactor * regionFactor;
    
    const totalCost = (breakdown.depreciation + breakdown.fuel + breakdown.electricity + 
                      breakdown.maintenance + breakdown.labor + breakdown.insurance + 
                      breakdown.other) * adjustmentFactor;
    
    const costPerAcre = projectedAcres > 0 ? totalCost / projectedAcres : 0;
    
    // Calculate confidence level based on data quality
    const confidence = this.calculateConfidenceLevel(territoryId, month);
    
    return {
      month,
      territoryId,
      acres: projectedAcres,
      totalCost,
      costPerAcre,
      breakdown,
      confidence
    };
  }
  
  calculateConfidenceLevel(territoryId: string, month: number): number {
    // Higher confidence for established territories and recent months
    let confidence = 0.8; // Base confidence
    
    // Reduce confidence for future projections
    if (month > 12) confidence *= 0.9;
    if (month > 24) confidence *= 0.8;
    
    // Increase confidence for mature territories
    if (month > 6) confidence *= 1.1;
    
    return Math.min(confidence, 1.0);
  }
  
  // Batch calculation for multiple territories/months
  calculateMultiTerritoryProjection(territoryIds: string[], months: number[], acresProjections: Record<string, Record<number, number>>): CostProjection[] {
    const projections: CostProjection[] = [];
    
    territoryIds.forEach(territoryId => {
      months.forEach(month => {
        const acres = acresProjections[territoryId]?.[month] || 0;
        if (acres > 0) {
          const projection = this.calculateTerritoryProjection(territoryId, month, acres);
          projections.push(projection);
        }
      });
    });
    
    return projections;
  }
  
  // Summary methods for financial dashboard integration
  getTerritoryMonthlySummary(territoryId: string, month: number, acres: number): { totalCost: number, costPerAcre: number, breakdown: EnhancedCostBreakdown } {
    const projection = this.calculateTerritoryProjection(territoryId, month, acres);
    return {
      totalCost: projection.totalCost,
      costPerAcre: projection.costPerAcre,
      breakdown: projection.breakdown
    };
  }
  
  getAggregatedCosts(territoryIds: string[], month: number, acresProjections: Record<string, number>): { totalCost: number, avgCostPerAcre: number } {
    let totalCost = 0;
    let totalAcres = 0;
    
    territoryIds.forEach(territoryId => {
      const acres = acresProjections[territoryId] || 0;
      if (acres > 0) {
        const projection = this.calculateTerritoryProjection(territoryId, month, acres);
        totalCost += projection.totalCost;
        totalAcres += acres;
      }
    });
    
    return {
      totalCost,
      avgCostPerAcre: totalAcres > 0 ? totalCost / totalAcres : 0
    };
  }
}

// Export for dashboard integration
export { EnhancedCostModel, TerritoryConfiguration, EnhancedCostBreakdown, CostProjection };