import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText,
  Divider
} from '@mui/material';
import { useBusiness } from '../../../contexts/BusinessContext';

const LLCSpecificsStep = () => {
  const { business, updateBusinessData } = useBusiness();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBusinessData({ [name]: value });
  };

  // Handle special case for member count
  const handleLLCTypeChange = (e) => {
    const { value } = e.target;
    
    const updates = { llcType: value };
    
    // Set appropriate member count and tax classification based on LLC type
    if (value === 'single-member') {
      updates.memberCount = 1;
      updates.taxClassification = 'disregarded';
    } else if (value === 'multi-member') {
      updates.memberCount = business.memberCount || 2;
      updates.taxClassification = 'partnership';
    }
    
    updateBusinessData(updates);
  };

  // Generate days 1-31 for fiscal year end day selection
  const fiscalYearEndDays = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`
  }));

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        LLC Specifics
      </Typography>
      
      <Box sx={{ '& .MuiFormControl-root': { mb: 3 } }}>
        {/* LLC Type */}
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">LLC Type</FormLabel>
          <RadioGroup
            name="llcType"
            value={business.llcType || ''}
            onChange={handleLLCTypeChange}
            row
          >
            <FormControlLabel 
              value="single-member" 
              control={<Radio />} 
              label="Single-Member LLC" 
            />
            <FormControlLabel 
              value="multi-member" 
              control={<Radio />} 
              label="Multi-Member LLC" 
            />
          </RadioGroup>
          <FormHelperText>
            Select whether your LLC has one owner (single-member) or multiple owners (multi-member)
          </FormHelperText>
        </FormControl>
        
        {/* If multi-member, ask for member count */}
        {business.llcType === 'multi-member' && (
          <FormControl fullWidth>
            <InputLabel id="member-count-label">Number of Members</InputLabel>
            <Select
              labelId="member-count-label"
              id="memberCount"
              name="memberCount"
              value={business.memberCount || 2}
              label="Number of Members"
              onChange={handleChange}
            >
              <MenuItem value={2}>2 members</MenuItem>
              <MenuItem value={3}>3 members</MenuItem>
              <MenuItem value={4}>4 members</MenuItem>
              <MenuItem value={5}>5 members</MenuItem>
              <MenuItem value={6}>6-10 members</MenuItem>
              <MenuItem value={11}>11+ members</MenuItem>
            </Select>
          </FormControl>
        )}
        
        <Divider sx={{ my: 3 }} />
        
        {/* Tax Classification */}
        <FormControl fullWidth>
          <InputLabel id="tax-classification-label">Tax Classification</InputLabel>
          <Select
            labelId="tax-classification-label"
            id="taxClassification"
            name="taxClassification"
            value={business.taxClassification || (business.llcType === 'single-member' ? 'disregarded' : 'partnership')}
            label="Tax Classification"
            onChange={handleChange}
          >
            {business.llcType === 'single-member' ? (
              <>
                <MenuItem value="disregarded">Disregarded Entity (Default)</MenuItem>
                <MenuItem value="c-corp">C Corporation (Form 8832)</MenuItem>
                <MenuItem value="s-corp">S Corporation (Form 2553)</MenuItem>
              </>
            ) : (
              <>
                <MenuItem value="partnership">Partnership (Default)</MenuItem>
                <MenuItem value="c-corp">C Corporation (Form 8832)</MenuItem>
                <MenuItem value="s-corp">S Corporation (Form 2553)</MenuItem>
              </>
            )}
          </Select>
          <FormHelperText>
            This affects how your LLC is taxed by the IRS. Most LLCs keep the default classification.
          </FormHelperText>
        </FormControl>
        
        {/* Fiscal Year */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="fiscal-year-end-month-label">Fiscal Year End Month</InputLabel>
              <Select
                labelId="fiscal-year-end-month-label"
                id="fiscalYearEndMonth"
                name="fiscalYearEndMonth"
                value={business.fiscalYearEndMonth || 12}
                label="Fiscal Year End Month"
                onChange={handleChange}
              >
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="fiscal-year-end-day-label">Fiscal Year End Day</InputLabel>
              <Select
                labelId="fiscal-year-end-day-label"
                id="fiscalYearEndDay"
                name="fiscalYearEndDay"
                value={business.fiscalYearEndDay || 31}
                label="Fiscal Year End Day"
                onChange={handleChange}
              >
                {fiscalYearEndDays.map(day => (
                  <MenuItem key={`day-${day.value}`} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <TextField
          fullWidth
          id="registeredAgent"
          name="registeredAgent"
          label="Registered Agent"
          value={business.registeredAgent || ''}
          onChange={handleChange}
          placeholder="Name of registered agent in Tennessee"
          helperText="The person or entity designated to receive legal documents for your LLC"
        />
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Your LLC structure affects tax filings, compliance requirements, and legal obligations.
      </Typography>
    </Box>
  );
};

export default LLCSpecificsStep; 