import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import { useBusiness } from '../../../contexts/BusinessContext';
import format from 'date-fns/format';

const ReviewStep = () => {
  const { business } = useBusiness();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Format members for display
  const formatMembers = () => {
    if (business.llcType === 'single-member') {
      return '1 member (Single-Member LLC)';
    }
    if (business.llcType === 'multi-member') {
      return `${business.memberCount || 2} members (Multi-Member LLC)`;
    }
    return 'Not specified';
  };

  // Format fiscal year end for display
  const formatFiscalYear = () => {
    if (!business.fiscalYearEndMonth || !business.fiscalYearEndDay) return 'Not specified';
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[business.fiscalYearEndMonth - 1]} ${business.fiscalYearEndDay}`;
  };

  // Format tax classification for display
  const formatTaxClassification = () => {
    const classMap = {
      'disregarded': 'Disregarded Entity (Default for Single-Member LLC)',
      'partnership': 'Partnership (Default for Multi-Member LLC)',
      'c-corp': 'C Corporation (Form 8832)',
      's-corp': 'S Corporation (Form 2553)'
    };
    
    return classMap[business.taxClassification] || 'Not specified';
  };
  
  // Check for boolean values and display as Yes/No
  const booleanToYesNo = (value) => value ? 'Yes' : 'No';

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Review Your Information
      </Typography>
      
      <Typography variant="body1" paragraph>
        Please review the information below to ensure it's correct before we generate your compliance timeline.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Business Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.name || 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Formation Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatDate(business.formationDate)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Business Type
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.businessType === 'llc' ? 'Limited Liability Company (LLC)' : business.businessType || 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Industry
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {business.industry || 'Not specified'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Location Information */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Location Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.address || 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  City
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.city || 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  County
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.county || 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  State
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.state || 'TN'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  ZIP Code
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.zip || 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Location Type
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {business.locationType ? business.locationType.replace('-', ' ') : 'Not specified'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Business Details */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Business Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Employee Count
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.employeeCount !== undefined ? business.employeeCount : 'Not specified'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Annual Revenue Estimate
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.annualRevenue !== undefined ? `$${business.annualRevenue.toLocaleString()}` : 'Not specified'}
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              Business Activities
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {business.hasTangibleProducts && <Chip label="Sells physical products" color="primary" variant="outlined" />}
              {business.sellsFood && <Chip label="Sells/serves food" color="primary" variant="outlined" />}
              {business.sellsAlcohol && <Chip label="Sells alcohol" color="primary" variant="outlined" />}
              {business.isHomeOccupation && <Chip label="Home occupation business" color="primary" variant="outlined" />}
              {business.hasEmployees && <Chip label="Has/planning employees" color="primary" variant="outlined" />}
              {!business.hasTangibleProducts && !business.sellsFood && !business.sellsAlcohol && 
                !business.isHomeOccupation && !business.hasEmployees && 
                <Typography variant="body2" color="text.secondary">None specified</Typography>
              }
            </Stack>
          </Paper>
        </Grid>
        
        {/* LLC Specifics */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              LLC Specifics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  LLC Type
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatMembers()}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Tax Classification
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatTaxClassification()}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Fiscal Year End
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatFiscalYear()}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Registered Agent
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {business.registeredAgent || 'Not specified'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        After you click "Generate Timeline", we'll analyze your business details and create a personalized compliance timeline for your Tennessee LLC.
      </Typography>
    </Box>
  );
};

export default ReviewStep; 