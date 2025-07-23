// Validation utilities for cost modeling data types

import {
  Equipment,
  CostModel,
  CostParameters,
  MaintenanceSchedule,
  EquipmentType,
  PowerSource,
  AutonomyLevel,
  MaintenanceType,
  DepreciationMethod
} from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationError extends Error {
  constructor(public errors: string[]) {
    super(`Validation failed: ${errors.join(', ')}`);
    this.name = 'ValidationError';
  }
}

export function validateEquipment(equipment: Partial<Equipment>): ValidationResult {
  const errors: string[] = [];

  // Required fields
  if (!equipment.id?.trim()) {
    errors.push('Equipment ID is required');
  }
  
  if (!equipment.name?.trim()) {
    errors.push('Equipment name is required');
  }

  if (!equipment.type || !Object.values(EquipmentType).includes(equipment.type)) {
    errors.push('Valid equipment type is required');
  }

  if (!equipment.manufacturer?.trim()) {
    errors.push('Manufacturer is required');
  }

  if (!equipment.model?.trim()) {
    errors.push('Model is required');
  }

  // Numeric validations
  if (typeof equipment.purchasePrice !== 'number' || equipment.purchasePrice <= 0) {
    errors.push('Purchase price must be a positive number');
  }

  if (typeof equipment.expectedLifespan !== 'number' || equipment.expectedLifespan <= 0) {
    errors.push('Expected lifespan must be a positive number');
  }

  // Date validation
  if (!equipment.purchaseDate || !(equipment.purchaseDate instanceof Date)) {
    errors.push('Valid purchase date is required');
  }

  // Specifications validation
  if (equipment.specifications) {
    const specErrors = validateEquipmentSpecifications(equipment.specifications);
    errors.push(...specErrors);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateEquipmentSpecifications(specs: any): string[] {
  const errors: string[] = [];

  if (!specs.powerSource || !Object.values(PowerSource).includes(specs.powerSource)) {
    errors.push('Valid power source is required');
  }

  if (!specs.autonomyLevel || !Object.values(AutonomyLevel).includes(specs.autonomyLevel)) {
    errors.push('Valid autonomy level is required');
  }

  if (specs.workingWidth !== undefined && (typeof specs.workingWidth !== 'number' || specs.workingWidth <= 0)) {
    errors.push('Working width must be a positive number');
  }

  if (specs.operatingSpeed !== undefined && (typeof specs.operatingSpeed !== 'number' || specs.operatingSpeed <= 0)) {
    errors.push('Operating speed must be a positive number');
  }

  if (specs.batteryCapacity !== undefined && (typeof specs.batteryCapacity !== 'number' || specs.batteryCapacity <= 0)) {
    errors.push('Battery capacity must be a positive number');
  }

  if (specs.fuelCapacity !== undefined && (typeof specs.fuelCapacity !== 'number' || specs.fuelCapacity <= 0)) {
    errors.push('Fuel capacity must be a positive number');
  }

  return errors;
}

export function validateMaintenanceSchedule(schedule: Partial<MaintenanceSchedule>): ValidationResult {
  const errors: string[] = [];

  if (!schedule.id?.trim()) {
    errors.push('Maintenance schedule ID is required');
  }

  if (!schedule.equipmentId?.trim()) {
    errors.push('Equipment ID is required');
  }

  if (!schedule.type || !Object.values(MaintenanceType).includes(schedule.type)) {
    errors.push('Valid maintenance type is required');
  }

  if (typeof schedule.intervalHours !== 'number' || schedule.intervalHours <= 0) {
    errors.push('Interval hours must be a positive number');
  }

  if (typeof schedule.estimatedCost !== 'number' || schedule.estimatedCost < 0) {
    errors.push('Estimated cost must be a non-negative number');
  }

  if (typeof schedule.estimatedDuration !== 'number' || schedule.estimatedDuration <= 0) {
    errors.push('Estimated duration must be a positive number');
  }

  if (!schedule.description?.trim()) {
    errors.push('Description is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCostModel(model: Partial<CostModel>): ValidationResult {
  const errors: string[] = [];

  if (!model.id?.trim()) {
    errors.push('Cost model ID is required');
  }

  if (!model.name?.trim()) {
    errors.push('Cost model name is required');
  }

  if (!model.equipmentId?.trim()) {
    errors.push('Equipment ID is required');
  }

  if (model.parameters) {
    const paramErrors = validateCostParameters(model.parameters);
    errors.push(...paramErrors);
  } else {
    errors.push('Cost parameters are required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCostParameters(params: Partial<CostParameters>): string[] {
  const errors: string[] = [];

  if (typeof params.operatingHoursPerYear !== 'number' || params.operatingHoursPerYear <= 0) {
    errors.push('Operating hours per year must be a positive number');
  }

  if (params.fuelCostPerLiter !== undefined && (typeof params.fuelCostPerLiter !== 'number' || params.fuelCostPerLiter < 0)) {
    errors.push('Fuel cost per liter must be a non-negative number');
  }

  if (params.electricityCostPerKwh !== undefined && (typeof params.electricityCostPerKwh !== 'number' || params.electricityCostPerKwh < 0)) {
    errors.push('Electricity cost per kWh must be a non-negative number');
  }

  if (typeof params.laborCostPerHour !== 'number' || params.laborCostPerHour < 0) {
    errors.push('Labor cost per hour must be a non-negative number');
  }

  if (typeof params.insuranceCostPerYear !== 'number' || params.insuranceCostPerYear < 0) {
    errors.push('Insurance cost per year must be a non-negative number');
  }

  if (!params.depreciationMethod || !Object.values(DepreciationMethod).includes(params.depreciationMethod)) {
    errors.push('Valid depreciation method is required');
  }

  return errors;
}

// Utility function to throw validation errors
export function validateAndThrow<T>(data: Partial<T>, validator: (data: Partial<T>) => ValidationResult): void {
  const result = validator(data);
  if (!result.isValid) {
    throw new ValidationError(result.errors);
  }
}