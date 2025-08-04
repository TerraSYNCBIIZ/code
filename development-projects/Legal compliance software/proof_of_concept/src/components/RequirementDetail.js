import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Badge,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRequirements } from '../contexts/RequirementContext';
import { useBusiness } from '../contexts/BusinessContext';
import format from 'date-fns/format';
import { differenceInDays } from 'date-fns';

const RequirementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRequirementById, getTimelineItemById, updateTimelineItemStatus } = useRequirements();
  const { business } = useBusiness();
  
  const [requirement, setRequirement] = useState(null);
  const [timelineItem, setTimelineItem] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  // Get current date for deadline calculations
  const today = new Date();
  
  useEffect(() => {
    // Redirect to questionnaire if not completed
    if (!business.questionnaireCompleted) {
      navigate('/questionnaire');
      return;
    }

    // Get requirement data
    const reqData = getRequirementById(id);
    const timeData = getTimelineItemById(id);
    
    if (reqData && timeData) {
      setRequirement(reqData);
      setTimelineItem(timeData);
    } else {
      setNotFound(true);
    }
  }, [id, business.questionnaireCompleted, getRequirementById, getTimelineItemById, navigate]);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Get days until due
  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    
    const dueDateObj = new Date(dueDate);
    return differenceInDays(dueDateObj, today);
  };
  
  // Get appropriate status color
  const getStatusColor = (status, daysUntilDue) => {
    if (status === 'completed') return 'success';
    if (status === 'in_progress') return 'info';
    
    if (daysUntilDue !== null) {
      if (daysUntilDue < 0) return 'error';
      if (daysUntilDue < 30) return 'warning';
    }
    
    return 'primary';
  };
  
  // Handle status update
  const handleStatusUpdate = (newStatus) => {
    updateTimelineItemStatus(id, newStatus);
    setTimelineItem(prev => ({ ...prev, status: newStatus }));
  };
  
  // If requirement not found, show error
  if (notFound) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Requirement not found
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/timeline')}
        >
          Back to Timeline
        </Button>
      </Container>
    );
  }
  
  // If data is still loading, show loading
  if (!requirement || !timelineItem) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Loading requirement details...</Typography>
      </Container>
    );
  }
  
  // Calculate days until due and status color
  const daysUntilDue = getDaysUntilDue(timelineItem.dueDate);
  const statusColor = getStatusColor(timelineItem.status, daysUntilDue);
  
  // Format deadline info text
  const getDeadlineText = () => {
    if (!timelineItem.dueDate) return 'No specific deadline';
    
    if (daysUntilDue < 0) {
      return `Overdue by ${Math.abs(daysUntilDue)} days`;
    }
    
    return `Due in ${daysUntilDue} days`;
  };
  
  // Get requirement steps (if available)
  const steps = requirement.steps || [];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton 
          aria-label="back to timeline" 
          onClick={() => navigate('/timeline')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Requirement Details
        </Typography>
      </Box>
      
      {/* Main content */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        {/* Requirement header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {requirement.title}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, my: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={requirement.category} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={requirement.jurisdiction} 
              color="secondary" 
              variant="outlined" 
            />
            <Chip 
              label={timelineItem.status.replace('_', ' ')} 
              color={statusColor}
            />
            {requirement.isInitialFiling && (
              <Chip label="Initial Filing" color="info" variant="outlined" />
            )}
            {requirement.isRecurring && (
              <Chip label="Recurring" color="warning" variant="outlined" />
            )}
          </Box>
          
          <Typography variant="body1" sx={{ my: 2 }}>
            {requirement.description}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Deadline and status section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon sx={{ mr: 1 }} /> Deadline
                </Typography>
                <Typography variant="h6" color={daysUntilDue < 0 ? 'error.main' : 'text.primary'}>
                  {formatDate(timelineItem.dueDate)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getDeadlineText()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessIcon sx={{ mr: 1 }} /> Agency
                </Typography>
                <Typography variant="h6">
                  {requirement.agency || 'Not specified'}
                </Typography>
                {requirement.fee > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5 }} /> Fee: ${requirement.fee}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Forms section */}
        {requirement.forms && requirement.forms.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <DescriptionIcon sx={{ mr: 1 }} /> Required Forms
            </Typography>
            <List>
              {requirement.forms.map((form) => (
                <ListItem key={`form-${form.replace(/\s+/g, '-').toLowerCase()}`}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={form} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {/* Required documents section */}
        {requirement.requiredDocuments && requirement.requiredDocuments.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Required Documents
            </Typography>
            <List>
              {requirement.requiredDocuments.map((doc) => (
                <ListItem key={`doc-${doc.replace(/\s+/g, '-').toLowerCase()}`}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {/* Steps section */}
        {steps.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Steps to Complete
            </Typography>
            <Stepper orientation="vertical" nonLinear>
              {steps.map((step, index) => (
                <Step key={`step-${index}-${step.substring(0, 20).replace(/\s+/g, '-').toLowerCase()}`} completed={timelineItem.status === 'completed'}>
                  <StepLabel>{`Step ${index + 1}`}</StepLabel>
                  <StepContent>
                    <Typography>{step}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
        
        {/* Additional information (if available) */}
        {(requirement.additionalInfo || requirement.recurrencePattern) && (
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Additional Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {requirement.recurrencePattern && (
                <Typography paragraph>
                  <strong>Recurrence:</strong> {requirement.recurrencePattern === 'yearly' ? 'Annual filing' : 
                    requirement.recurrencePattern === 'quarterly' ? 'Quarterly filing' : 
                    requirement.recurrencePattern === 'monthly' ? 'Monthly filing' : 
                    'Recurring filing'}
                </Typography>
              )}
              {requirement.additionalInfo && (
                <Typography>
                  {requirement.additionalInfo}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        )}
        
        <Divider sx={{ my: 3 }} />
        
        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/timeline')}
          >
            Back to Timeline
          </Button>
          
          <Box>
            {timelineItem.status !== 'completed' && (
              <Button 
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleStatusUpdate('completed')}
                sx={{ mr: 1 }}
              >
                Mark as Complete
              </Button>
            )}
            
            {timelineItem.status !== 'in_progress' && timelineItem.status !== 'completed' && (
              <Button 
                variant="outlined"
                color="info"
                onClick={() => handleStatusUpdate('in_progress')}
              >
                Start Working
              </Button>
            )}
            
            {timelineItem.status === 'completed' && (
              <Button 
                variant="text"
                color="primary"
                onClick={() => handleStatusUpdate('not_started')}
              >
                Mark as Not Started
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RequirementDetail; 