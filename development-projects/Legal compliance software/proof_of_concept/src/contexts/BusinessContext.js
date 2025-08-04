import React, { createContext, useContext, useState } from 'react';

// Initial state for business data
const initialBusinessState = {
  // Basic information
  name: '',
  formationDate: null,
  businessType: 'llc',

  // Location
  address: '',
  city: '',
  county: '',
  state: 'TN',
  zip: '',

  // Business details
  industry: '',
  employeeCount: 0,
  annualRevenue: '',
  hasEmployees: false,
  
  // LLC specifics
  llcType: '', // single-member or multi-member
  managementType: '', // member-managed or manager-managed

  // Application state
  currentStep: 0,
  questionnaireCompleted: false
};

// Create the context
const BusinessContext = createContext();

export const BusinessContextProvider = ({ children }) => {
  const [business, setBusiness] = useState(initialBusinessState);

  // Update business data
  const updateBusinessData = (data) => {
    setBusiness(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Reset business data
  const resetBusiness = () => {
    setBusiness(initialBusinessState);
  };

  // Set current step in the questionnaire
  const setCurrentStep = (step) => {
    setBusiness(prevData => ({
      ...prevData,
      currentStep: step
    }));
  };

  // Mark questionnaire as complete
  const markQuestionnaireComplete = () => {
    setBusiness(prevData => ({
      ...prevData,
      questionnaireCompleted: true
    }));
  };

  return (
    <BusinessContext.Provider 
      value={{ 
        business, 
        updateBusinessData, 
        resetBusiness, 
        setCurrentStep,
        markQuestionnaireComplete
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

// Custom hook to use the context
export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessContextProvider');
  }
  return context;
}; 