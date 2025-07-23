// Core data types for dynamic cost modeling system

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  manufacturer: string;
  model: string;
  purchasePrice: number;
  purchaseDate: Date;
  expectedLifespan: number; // in years
  maintenanceSchedule: MaintenanceSchedule[];
  specifications: EquipmentSpecifications;
  status: EquipmentStatus;
}

export interface EquipmentSpecifications {
  workingWidth?: number; // in meters
  powerSource: PowerSource;
  autonomyLevel: AutonomyLevel;
  operatingSpeed?: number; // in km/h
  batteryCapacity?: number; // in kWh
  fuelCapacity?: number; // in liters
  weight?: number; // in kg
  customSpecs: Record<string, any>;
}

export interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  intervalHours: number;
  intervalMonths?: number;
  estimatedCost: number;
  estimatedDuration: number; // in hours
  description: string;
  isActive: boolean;
}

export interface CostModel {
  id: string;
  name: string;
  equipmentId: string;
  parameters: CostParameters;
  scenarios: CostScenario[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CostParameters {
  operatingHoursPerYear: number;
  fuelCostPerLiter?: number;
  electricityCostPerKwh?: number;
  laborCostPerHour: number;
  insuranceCostPerYear: number;
  depreciationMethod: DepreciationMethod;
  customParameters: Record<string, number>;
}

export interface CostScenario {
  id: string;
  name: string;
  description: string;
  parameters: CostParameters;
  results?: CostCalculationResult;
}

export interface CostCalculationResult {
  totalAnnualCost: number;
  costPerHour: number;
  costPerAcre: number;
  breakdown: CostBreakdown;
  calculatedAt: Date;
}

export interface CostBreakdown {
  depreciation: number;
  fuel: number;
  electricity: number;
  maintenance: number;
  labor: number;
  insurance: number;
  other: number;
}

// Enums
export enum EquipmentType {
  MOWER = 'mower',
  TRIMMER = 'trimmer',
  BLOWER = 'blower',
  SPREADER = 'spreader',
  AERATOR = 'aerator',
  OTHER = 'other'
}

export enum EquipmentStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  RETIRED = 'retired',
  SOLD = 'sold'
}

export enum PowerSource {
  ELECTRIC = 'electric',
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  MANUAL = 'manual'
}

export enum AutonomyLevel {
  MANUAL = 'manual',
  SEMI_AUTONOMOUS = 'semi_autonomous',
  FULLY_AUTONOMOUS = 'fully_autonomous'
}

export enum MaintenanceType {
  ROUTINE = 'routine',
  PREVENTIVE = 'preventive',
  CORRECTIVE = 'corrective',
  OVERHAUL = 'overhaul'
}

export enum DepreciationMethod {
  STRAIGHT_LINE = 'straight_line',
  DECLINING_BALANCE = 'declining_balance',
  UNITS_OF_PRODUCTION = 'units_of_production'
}