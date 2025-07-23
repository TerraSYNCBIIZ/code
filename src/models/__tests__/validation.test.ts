// Unit tests for validation functions

import {
  validateEquipment,
  validateCostModel,
  validateMaintenanceSchedule,
  validateCostParameters,
  ValidationError,
  validateAndThrow
} from '../validation';
import {
  Equipment,
  CostModel,
  MaintenanceSchedule,
  CostParameters,
  EquipmentType,
  PowerSource,
  AutonomyLevel,
  MaintenanceType,
  DepreciationMethod,
  EquipmentStatus
} from '../types';

describe('Equipment Validation', () => {
  const validEquipment: Equipment = {
    id: 'eq-001',
    name: 'Autonomous Mower X1',
    type: EquipmentType.MOWER,
    manufacturer: 'RoboMow',
    model: 'X1-Pro',
    purchasePrice: 15000,
    purchaseDate: new Date('2024-01-15'),
    expectedLifespan: 8,
    maintenanceSchedule: [],
    specifications: {
      workingWidth: 1.2,
      powerSource: PowerSource.ELECTRIC,
      autonomyLevel: AutonomyLevel.FULLY_AUTONOMOUS,
      operatingSpeed: 5,
      batteryCapacity: 10,
      weight: 150,
      customSpecs: {}
    },
    status: EquipmentStatus.ACTIVE
  };

  test('should validate correct equipment', () => {
    const result = validateEquipment(validEquipment);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should reject equipment without required fields', () => {
    const invalidEquipment = { ...validEquipment };
    delete invalidEquipment.id;
    delete invalidEquipment.name;

    const result = validateEquipment(invalidEquipment);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Equipment ID is required');
    expect(result.errors).toContain('Equipment name is required');
  });

  test('should reject equipment with invalid numeric values', () => {
    const invalidEquipment = {
      ...validEquipment,
      purchasePrice: -1000,
      expectedLifespan: 0
    };

    const result = validateEquipment(invalidEquipment);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Purchase price must be a positive number');
    expect(result.errors).toContain('Expected lifespan must be a positive number');
  });

  test('should reject equipment with invalid specifications', () => {
    const invalidEquipment = {
      ...validEquipment,
      specifications: {
        ...validEquipment.specifications,
        powerSource: 'invalid' as PowerSource,
        workingWidth: -1
      }
    };

    const result = validateEquipment(invalidEquipment);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Valid power source is required');
    expect(result.errors).toContain('Working width must be a positive number');
  });
});

describe('Maintenance Schedule Validation', () => {
  const validSchedule: MaintenanceSchedule = {
    id: 'ms-001',
    equipmentId: 'eq-001',
    type: MaintenanceType.ROUTINE,
    intervalHours: 100,
    intervalMonths: 3,
    estimatedCost: 250,
    estimatedDuration: 2,
    description: 'Routine blade sharpening and cleaning',
    isActive: true
  };

  test('should validate correct maintenance schedule', () => {
    const result = validateMaintenanceSchedule(validSchedule);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should reject schedule with invalid values', () => {
    const invalidSchedule = {
      ...validSchedule,
      intervalHours: -50,
      estimatedCost: -100,
      estimatedDuration: 0
    };

    const result = validateMaintenanceSchedule(invalidSchedule);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Interval hours must be a positive number');
    expect(result.errors).toContain('Estimated cost must be a non-negative number');
    expect(result.errors).toContain('Estimated duration must be a positive number');
  });
});

describe('Cost Parameters Validation', () => {
  const validParams: CostParameters = {
    operatingHoursPerYear: 1000,
    fuelCostPerLiter: 1.5,
    electricityCostPerKwh: 0.12,
    laborCostPerHour: 25,
    insuranceCostPerYear: 500,
    depreciationMethod: DepreciationMethod.STRAIGHT_LINE,
    customParameters: {}
  };

  test('should validate correct cost parameters', () => {
    const errors = validateCostParameters(validParams);
    expect(errors).toHaveLength(0);
  });

  test('should reject invalid cost parameters', () => {
    const invalidParams = {
      ...validParams,
      operatingHoursPerYear: -100,
      fuelCostPerLiter: -1,
      laborCostPerHour: -25,
      depreciationMethod: 'invalid' as DepreciationMethod
    };

    const errors = validateCostParameters(invalidParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain('Operating hours per year must be a positive number');
    expect(errors).toContain('Fuel cost per liter must be a non-negative number');
    expect(errors).toContain('Labor cost per hour must be a non-negative number');
    expect(errors).toContain('Valid depreciation method is required');
  });
});

describe('ValidationError and validateAndThrow', () => {
  test('should throw ValidationError with multiple errors', () => {
    const invalidEquipment = { id: '', name: '', purchasePrice: -1000 };
    
    expect(() => {
      validateAndThrow(invalidEquipment, validateEquipment);
    }).toThrow(ValidationError);

    try {
      validateAndThrow(invalidEquipment, validateEquipment);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).errors.length).toBeGreaterThan(0);
    }
  });

  test('should not throw for valid data', () => {
    const validParams: CostParameters = {
      operatingHoursPerYear: 1000,
      laborCostPerHour: 25,
      insuranceCostPerYear: 500,
      depreciationMethod: DepreciationMethod.STRAIGHT_LINE,
      customParameters: {}
    };

    expect(() => {
      validateAndThrow(validParams, (data) => ({
        isValid: validateCostParameters(data as CostParameters).length === 0,
        errors: validateCostParameters(data as CostParameters)
      }));
    }).not.toThrow();
  });
});