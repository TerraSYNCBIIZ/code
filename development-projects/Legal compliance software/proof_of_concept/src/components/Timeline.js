import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  IconButton,
  CircularProgress
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import FlagIcon from '@mui/icons-material/Flag';
import InfoIcon from '@mui/icons-material/Info';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useBusiness } from '../contexts/BusinessContext';
import { useRequirements } from '../contexts/RequirementContext';
import format from 'date-fns/format';
import { isBefore, differenceInDays, addDays } from 'date-fns';

const TimelineDashboard = () => {
  const navigate = useNavigate();
  const { business } = useBusiness();
  const { timeline, updateTimelineItemStatus } = useRequirements();
  
  // State for filtering and tabs
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  
  // Check if questionnaire is completed
  useEffect(() => {
    if (!business.questionnaireCompleted) {
      navigate('/questionnaire');
    } else {
      // Simulate loading time
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [business.questionnaireCompleted, navigate]);
  
  // Get current date for timeline calculations
  const today = new Date();
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Get days until due for a timeline item
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
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  // Handle status update
  const handleStatusUpdate = (itemId, newStatus) => {
    updateTimelineItemStatus(itemId, newStatus);
  };
  
  // Filter and sort timeline items
  const filteredItems = timeline.filter(item => {
    // Category filter
    if (filter !== 'all' && item.category !== filter) return false;
    
    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    
    // Tab filters
    if (currentTab === 'upcoming') {
      // Show non-completed items with future due dates or no due date
      return item.status !== 'completed' && 
            (!item.dueDate || new Date(item.dueDate) >= today);
    }
    
    if (currentTab === 'past') {
      // Show items with past due dates
      return item.dueDate && new Date(item.dueDate) < today;
    }
    
    if (currentTab === 'completed') {
      // Show completed items
      return item.status === 'completed';
    }
    
    if (currentTab === 'initial') {
      // Show initial filing requirements
      return item.isInitialFiling === true;
    }
    
    if (currentTab === 'recurring') {
      // Show recurring requirements
      return item.isRecurring === true;
    }
    
    return true;
  });
  
  // Sort timeline items by due date
  const sortedItems = [...filteredItems].sort((a, b) => {
    // Always put items without due dates at the end
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    // Sort by due date
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
  
  // Derive timeline stages
  const getTimelineStages = () => {
    if (sortedItems.length === 0) return [];
    
    let currentDate = today;
    const stages = [];
    
    // Add "Today" marker
    stages.push({
      type: 'marker',
      date: new Date(),
      label: 'Today'
    });
    
    // Add items as stages
    for (const item of sortedItems) {
      if (item.dueDate) {
        const dueDate = new Date(item.dueDate);
        
        // If there's a gap of more than 30 days, add a marker
        const daysDiff = differenceInDays(dueDate, currentDate);
        if (daysDiff > 30) {
          stages.push({
            type: 'marker',
            date: addDays(currentDate, Math.floor(daysDiff / 2)),
            label: `${Math.floor(daysDiff / 2)} days later`
          });
        }
        
        // Add the item
        stages.push({
          type: 'item',
          ...item
        });
        
        currentDate = dueDate;
      }
    }
    
    return stages;
  };
  
  const timelineStages = getTimelineStages();
  
  // Render loading state if still loading
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6">
          Generating your compliance timeline...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Analyzing your business details and applicable requirements
        </Typography>
      </Box>
    );
  }

  // Render timeline UI
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Compliance Timeline
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage all compliance requirements for {business.name}
        </Typography>
      </Box>
      
      {/* Filters */}
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterListIcon sx={{ mr: 1 }} /> Filters:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={filter}
                label="Category"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="formation">Formation</MenuItem>
                <MenuItem value="tax">Tax</MenuItem>
                <MenuItem value="license">Licenses & Permits</MenuItem>
                <MenuItem value="compliance">Compliance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="not_started">Not Started</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="timeline tabs"
        >
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Past Due" value="past" />
          <Tab label="Completed" value="completed" />
          <Tab label="Initial Filings" value="initial" />
          <Tab label="Recurring" value="recurring" />
          <Tab label="All" value="all" />
        </Tabs>
      </Box>
      
      {/* Empty state */}
      {sortedItems.length === 0 && (
        <Alert severity="info" sx={{ mb: 4 }}>
          No requirements match your current filters. Try adjusting your filters or view all requirements.
        </Alert>
      )}
      
      {/* Timeline */}
      <Timeline position="alternate">
        {timelineStages.map((stage) => {
          if (stage.type === 'marker') {
            // Render date marker
            return (
              <TimelineItem key={`marker-${stage.date.getTime()}`}>
                <TimelineOppositeContent color="text.secondary">
                  {format(stage.date, 'MMM d, yyyy')}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="secondary" variant="outlined">
                    <EventIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    {stage.label}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          }
          
          // Render item
          const item = stage;
          const daysUntilDue = getDaysUntilDue(item.dueDate);
          const statusColor = getStatusColor(item.status, daysUntilDue);
          
          return (
            <TimelineItem key={item.id}>
              <TimelineOppositeContent color="text.secondary">
                {item.dueDate ? (
                  <>
                    {formatDate(item.dueDate)}
                    <Box sx={{ mt: 1 }}>
                      {daysUntilDue !== null && (
                        <Chip 
                          label={daysUntilDue < 0 
                            ? `${Math.abs(daysUntilDue)} days overdue` 
                            : `${daysUntilDue} days left`
                          } 
                          size="small" 
                          color={daysUntilDue < 0 ? 'error' : 'primary'} 
                        />
                      )}
                    </Box>
                  </>
                ) : (
                  'No deadline'
                )}
              </TimelineOppositeContent>
              
              <TimelineSeparator>
                <TimelineDot color={statusColor}>
                  {item.status === 'completed' ? (
                    <AssignmentTurnedInIcon />
                  ) : (
                    <DescriptionIcon />
                  )}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              
              <TimelineContent>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 2,
                    borderLeft: 4,
                    borderLeftColor: `${statusColor}.main`,
                    bgcolor: item.status === 'completed' ? 'action.hover' : 'background.paper'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={item.jurisdiction} 
                        size="small" 
                        color="secondary" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={item.status.replace('_', ' ')} 
                        size="small" 
                        color={statusColor}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {item.description}
                    </Typography>
                    
                    {item.agency && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Agency:</strong> {item.agency}
                      </Typography>
                    )}
                    
                    {item.fee > 0 && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Fee:</strong> ${item.fee}
                      </Typography>
                    )}
                    
                    {item.forms && item.forms.length > 0 && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Forms:</strong> {item.forms.join(', ')}
                      </Typography>
                    )}
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Button 
                      size="small" 
                      variant="outlined"
                      startIcon={<InfoIcon />}
                      onClick={() => navigate(`/requirement/${item.id}`)}
                    >
                      Details
                    </Button>
                    
                    <Box>
                      {item.status !== 'completed' && (
                        <Button 
                          size="small" 
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusUpdate(item.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                      
                      {item.status !== 'in_progress' && item.status !== 'completed' && (
                        <Button 
                          size="small" 
                          sx={{ ml: 1 }}
                          variant="outlined"
                          color="info"
                          onClick={() => handleStatusUpdate(item.id, 'in_progress')}
                        >
                          Start
                        </Button>
                      )}
                      
                      {item.status === 'completed' && (
                        <Button 
                          size="small" 
                          variant="text"
                          color="primary"
                          onClick={() => handleStatusUpdate(item.id, 'not_started')}
                        >
                          Undo
                        </Button>
                      )}
                    </Box>
                  </CardActions>
                </Card>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Container>
  );
};

export default TimelineDashboard; 