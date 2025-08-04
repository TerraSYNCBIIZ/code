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
  Switch,
  Slider,
  Divider
} from '@mui/material';
import { useBusiness } from '../../../contexts/BusinessContext';

const BusinessDetailsStep = () => {
  const { business, updateBusinessData } = useBusiness();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBusinessData({ [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    updateBusinessData({ [name]: checked });
  };

  const handleSliderChange = (name) => (e, value) => {
    updateBusinessData({ [name]: value });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Business Details
      </Typography>
      
      <Box sx={{ '& .MuiFormControl-root': { mb: 3 } }}>
        {/* Business Size */}
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Business Size
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="employee-count-label">Employee Count</InputLabel>
              <Select
                labelId="employee-count-label"
                id="employeeCount"
                name="employeeCount"
                value={business.employeeCount || 0}
                label="Employee Count"
                onChange={handleChange}
              >
                <MenuItem value={0}>0 (No employees yet)</MenuItem>
                <MenuItem value={1}>1 employee</MenuItem>
                <MenuItem value={2}>2-5 employees</MenuItem>
                <MenuItem value={10}>6-15 employees</MenuItem>
                <MenuItem value={25}>16-50 employees</MenuItem>
                <MenuItem value={75}>50+ employees</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={business.hasEmployees || false}
                  onChange={handleSwitchChange}
                  name="hasEmployees"
                  color="primary"
                />
              }
              label="Planning to hire employees"
            />
          </Grid>
        </Grid>
        
        <Typography variant="subtitle2" gutterBottom>
          Annual Revenue Estimate
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={business.annualRevenue || 0}
            onChange={handleSliderChange('annualRevenue')}
            valueLabelDisplay="auto"
            step={25000}
            marks={[
              { value: 0, label: '$0' },
              { value: 100000, label: '$100K' },
              { value: 250000, label: '$250K' },
              { value: 500000, label: '$500K' },
              { value: 1000000, label: '$1M+' }
            ]}
            min={0}
            max={1000000}
          />
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Business Activities */}
        <Typography variant="subtitle1" gutterBottom>
          Business Activities
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={business.hasTangibleProducts || false}
                  onChange={handleSwitchChange}
                  name="hasTangibleProducts"
                  color="primary"
                />
              }
              label="Sells physical products"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={business.sellsFood || false}
                  onChange={handleSwitchChange}
                  name="sellsFood"
                  color="primary"
                />
              }
              label="Sells/serves food"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={business.sellsAlcohol || false}
                  onChange={handleSwitchChange}
                  name="sellsAlcohol"
                  color="primary"
                />
              }
              label="Sells alcohol"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={business.isHomeOccupation || false}
                  onChange={handleSwitchChange}
                  name="isHomeOccupation"
                  color="primary"
                />
              }
              label="Home occupation business"
            />
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Industry */}
        <FormControl fullWidth>
          <InputLabel id="industry-label">Primary Industry</InputLabel>
          <Select
            labelId="industry-label"
            id="industry"
            name="industry"
            value={business.industry || ''}
            label="Primary Industry"
            onChange={handleChange}
          >
            <MenuItem value="retail">Retail</MenuItem>
            <MenuItem value="food">Food Service/Restaurant</MenuItem>
            <MenuItem value="professional">Professional Services</MenuItem>
            <MenuItem value="construction">Construction/Contracting</MenuItem>
            <MenuItem value="technology">Technology/Software</MenuItem>
            <MenuItem value="healthcare">Healthcare/Medical</MenuItem>
            <MenuItem value="manufacturing">Manufacturing</MenuItem>
            <MenuItem value="real-estate">Real Estate</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        These details help us identify specific industry regulations and tax requirements that apply to your business.
      </Typography>
    </Box>
  );
};

export default BusinessDetailsStep; 