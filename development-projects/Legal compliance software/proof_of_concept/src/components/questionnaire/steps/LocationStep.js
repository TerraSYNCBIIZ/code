import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid
} from '@mui/material';
import { useBusiness } from '../../../contexts/BusinessContext';

const LocationStep = () => {
  const { business, updateBusinessData } = useBusiness();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for county selection when city is selected
    if (name === 'city' && value === 'Knoxville') {
      updateBusinessData({ 
        [name]: value,
        county: 'Knox' // Auto-set county when Knoxville is selected
      });
    } else {
      updateBusinessData({ [name]: value });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Business Location Information
      </Typography>
      
      <Box sx={{ '& .MuiTextField-root': { mb: 3 } }}>
        <TextField
          fullWidth
          required
          id="address"
          name="address"
          label="Street Address"
          value={business.address || ''}
          onChange={handleChange}
          placeholder="123 Main St"
          helperText="Primary business/registered agent address"
        />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ mb: 3 }}>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                name="city"
                value={business.city || ''}
                label="City"
                onChange={handleChange}
              >
                <MenuItem value="Knoxville">Knoxville</MenuItem>
                <MenuItem value="Farragut">Farragut</MenuItem>
                <MenuItem value="Powell">Powell</MenuItem>
                <MenuItem value="Other">Other Tennessee City</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ mb: 3 }}>
              <InputLabel id="county-label">County</InputLabel>
              <Select
                labelId="county-label"
                id="county"
                name="county"
                value={business.county || ''}
                label="County"
                onChange={handleChange}
                disabled={business.city === 'Knoxville'} // Disabled if Knoxville is selected
              >
                <MenuItem value="Knox">Knox</MenuItem>
                <MenuItem value="Other">Other Tennessee County</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ mb: 3 }}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                name="state"
                value={business.state || 'TN'}
                label="State"
                onChange={handleChange}
                disabled // We're focusing on Tennessee only
              >
                <MenuItem value="TN">Tennessee</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="ZIP Code"
              value={business.zip || ''}
              onChange={handleChange}
              fullWidth
              placeholder="37902"
              helperText="5-digit ZIP code"
            />
          </Grid>
        </Grid>
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="location-type-label">Location Type</InputLabel>
          <Select
            labelId="location-type-label"
            id="locationType"
            name="locationType"
            value={business.locationType || ''}
            label="Location Type"
            onChange={handleChange}
          >
            <MenuItem value="commercial">Commercial Location</MenuItem>
            <MenuItem value="home">Home-Based Business</MenuItem>
            <MenuItem value="virtual">Virtual Office / Remote Only</MenuItem>
          </Select>
        </FormControl>
        
        {business.locationType === 'home' && (
          <Typography variant="body2" color="warning.main" sx={{ mb: 2 }}>
            Note: Home-based businesses may require special zoning permits in Knox County and Knoxville.
          </Typography>
        )}
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Your business location determines which local requirements apply, including city and county licenses, permits, and taxes.
      </Typography>
    </Box>
  );
};

export default LocationStep; 