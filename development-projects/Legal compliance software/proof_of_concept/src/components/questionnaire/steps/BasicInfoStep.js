import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useBusiness } from '../../../contexts/BusinessContext';

const BasicInfoStep = () => {
  const { business, updateBusinessData } = useBusiness();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBusinessData({ [name]: value });
  };

  const handleDateChange = (date) => {
    updateBusinessData({ formationDate: date ? date.toISOString() : null });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Basic Business Information
      </Typography>
      
      <Box sx={{ '& .MuiTextField-root': { mb: 3 } }}>
        <TextField
          fullWidth
          required
          id="name"
          name="name"
          label="Business Name"
          value={business.name || ''}
          onChange={handleChange}
          placeholder="Your LLC name"
          helperText="Enter the full legal name of your LLC including 'LLC' suffix"
        />
        
        <FormControl fullWidth required sx={{ mb: 3 }}>
          <InputLabel id="business-type-label">Business Type</InputLabel>
          <Select
            labelId="business-type-label"
            id="businessType"
            name="businessType"
            value={business.businessType || ''}
            label="Business Type"
            onChange={handleChange}
          >
            <MenuItem value="llc">Limited Liability Company (LLC)</MenuItem>
          </Select>
        </FormControl>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Formation Date"
            value={business.formationDate ? new Date(business.formationDate) : null}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                fullWidth
                name="formationDate"
                helperText="When did or will you officially form your LLC?"
              />
            )}
          />
        </LocalizationProvider>
        
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Business Description"
          multiline
          rows={3}
          value={business.description || ''}
          onChange={handleChange}
          placeholder="Describe your business activities"
          helperText="Brief description of your primary business activities"
        />
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        This information helps us understand your business and identify applicable compliance requirements.
      </Typography>
    </Box>
  );
};

export default BasicInfoStep; 