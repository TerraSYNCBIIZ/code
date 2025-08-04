import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  Container,
  Paper,
  LinearProgress
} from '@mui/material';
import { useBusiness } from '../../contexts/BusinessContext';

// Import step components
import BasicInfoStep from './steps/BasicInfoStep';
import LocationStep from './steps/LocationStep';
import BusinessDetailsStep from './steps/BusinessDetailsStep';
import LLCSpecificsStep from './steps/LLCSpecificsStep';
import ReviewStep from './steps/ReviewStep';

const steps = [
  'Basic Information',
  'Location Information',
  'Business Details',
  'LLC Specifics',
  'Review'
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const { 
    business, 
    updateBusinessData, 
    resetBusiness, 
    setCurrentStep, 
    markQuestionnaireComplete 
  } = useBusiness();
  
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  // Update context's currentStep when activeStep changes
  useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep, setCurrentStep]);

  // Set step validation based on business data
  useEffect(() => {
    const validateCurrentStep = () => {
      switch (activeStep) {
        case 0: // Basic Information
          setIsStepValid(
            !!business.name && 
            !!business.formationDate && 
            !!business.businessType
          );
          break;
        case 1: // Location Information
          setIsStepValid(
            !!business.address && 
            !!business.city && 
            !!business.county && 
            !!business.state && 
            !!business.zip
          );
          break;
        case 2: // Business Details
          setIsStepValid(true); // All fields optional or have defaults
          break;
        case 3: // LLC Specifics
          setIsStepValid(!!business.llcType);
          break;
        case 4: // Review
          setIsStepValid(true); // Review is always valid
          break;
        default:
          setIsStepValid(false);
      }
    };
    
    validateCurrentStep();
  }, [business, activeStep]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Last step - complete questionnaire
      markQuestionnaireComplete();
      navigate('/timeline');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    resetBusiness();
    setActiveStep(0);
  };

  // Get the content for the current step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <LocationStep />;
      case 2:
        return <BusinessDetailsStep />;
      case 3:
        return <LLCSpecificsStep />;
      case 4:
        return <ReviewStep />;
      default:
        return 'Unknown step';
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          mt: 4, 
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Progress bar */}
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage} 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: 6,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2
          }}
        />
        
        <Box sx={{ pt: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mt: 2 }}>
            Business Questionnaire
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Please provide details about your Tennessee LLC to receive a customized compliance timeline.
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            
            <Box>
              {activeStep !== 0 && (
                <Button 
                  variant="text" 
                  onClick={handleReset} 
                  sx={{ mr: 2 }}
                >
                  Reset
                </Button>
              )}
              
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid}
              >
                {activeStep === steps.length - 1 ? 'Generate Timeline' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Questionnaire; 