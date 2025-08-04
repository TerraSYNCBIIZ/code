import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBusiness } from './BusinessContext';
import { initialRequirements } from '../data/requirements';

// Create the context
const RequirementContext = createContext();

export const RequirementContextProvider = ({ children }) => {
  const { business } = useBusiness();
  const [timeline, setTimeline] = useState([]);

  // Generate timeline based on business details
  useEffect(() => {
    if (business.questionnaireCompleted) {
      // Filter requirements based on business type
      const filteredRequirements = initialRequirements.filter(req => {
        // Check business type match
        if (req.applicableBusinessTypes && 
            !req.applicableBusinessTypes.includes(business.businessType)) {
          return false;
        }
        
        // Check LLC type match
        if (req.applicableLLCTypes && 
            !req.applicableLLCTypes.includes(business.llcType)) {
          return false;
        }
        
        // Check employee condition
        if (req.requiresEmployees === true && !business.hasEmployees) {
          return false;
        }
        
        return true;
      });
      
      // Generate due dates based on business formation date
      const timelineWithDates = filteredRequirements.map(req => {
        let dueDate = null;
        
        // If the requirement has a due date formula, calculate it
        if (req.dueDateFormula && business.formationDate) {
          const formationDate = new Date(business.formationDate);
          
          // Different formulas for calculating due dates
          if (req.dueDateFormula.type === 'days_after_formation') {
            dueDate = new Date(formationDate);
            dueDate.setDate(dueDate.getDate() + req.dueDateFormula.days);
          } else if (req.dueDateFormula.type === 'months_after_formation') {
            dueDate = new Date(formationDate);
            dueDate.setMonth(dueDate.getMonth() + req.dueDateFormula.months);
          } else if (req.dueDateFormula.type === 'annual') {
            // Annual filings
            dueDate = new Date(formationDate);
            dueDate.setFullYear(dueDate.getFullYear() + 1);
          }
        }
        
        return {
          ...req,
          dueDate: dueDate ? dueDate.toISOString().split('T')[0] : null,
          status: 'not_started' // Default status
        };
      });
      
      setTimeline(timelineWithDates);
    }
  }, [business]);

  // Update the status of a timeline item
  const updateTimelineItemStatus = (itemId, newStatus) => {
    setTimeline(prevTimeline => 
      prevTimeline.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  // Get a specific timeline item by ID
  const getTimelineItem = (itemId) => {
    return timeline.find(item => item.id === itemId);
  };

  return (
    <RequirementContext.Provider 
      value={{ 
        timeline, 
        updateTimelineItemStatus,
        getTimelineItem 
      }}
    >
      {children}
    </RequirementContext.Provider>
  );
};

// Custom hook to use the context
export const useRequirements = () => {
  const context = useContext(RequirementContext);
  if (!context) {
    throw new Error('useRequirements must be used within a RequirementContextProvider');
  }
  return context;
};

export default RequirementContext; 