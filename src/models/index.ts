// Export all cost modeling types and utilities

export * from './types';
export * from './validation';

// Re-export commonly used types for convenience
export type {
  Equipment,
  CostModel,
  CostParameters,
  CostScenario,
  CostCalculationResult,
  CostBreakdown,
  MaintenanceSchedule,
  EquipmentSpecifications
} from './types';

export {
  EquipmentType,
  EquipmentStatus,
  PowerSource,
  AutonomyLevel,
  MaintenanceType,
  DepreciationMethod
} from './types';

export {
  validateEquipment,
  validateCostModel,
  validateMaintenanceSchedule,
  validateCostParameters,
  ValidationError,
  validateAndThrow
} from './validation';