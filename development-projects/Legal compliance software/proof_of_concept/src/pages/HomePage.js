import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimelineIcon from '@mui/icons-material/Timeline';
import GavelIcon from '@mui/icons-material/Gavel';
import { useBusiness } from '../contexts/BusinessContext';

const HomePage = () => {
  const { business } = useBusiness();
  const questionnaireCompleted = business.questionnaireCompleted;

  return (
    <Box sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          borderRadius: 2,
          mb: 4,
          background: 'linear-gradient(45deg, #3f51b5 30%, #5677fc 90%)',
          color: 'white'
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Tennessee LLC Compliance Tool
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Simplify your business compliance journey with our easy-to-use timeline and guidance
        </Typography>
        <Button 
          component={RouterLink} 
          to={questionnaireCompleted ? "/timeline" : "/questionnaire"}
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: 'white', 
            color: '#3f51b5', 
            '&:hover': { 
              backgroundColor: '#f5f5f5',
            } 
          }}
        >
          {questionnaireCompleted ? "View Your Timeline" : "Get Started"}
        </Button>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <GavelIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom align="center">
                Understand Requirements
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get clarity on all federal, state, and local filing requirements for your Tennessee LLC.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <TimelineIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom align="center">
                Personalized Timeline
              </Typography>
              <Typography variant="body1" color="text.secondary">
                See all your deadlines and requirements in one visual timeline, personalized to your business.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <AssignmentIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom align="center">
                Step-by-Step Guidance
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Follow clear instructions for each filing requirement with links to forms and resources.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage; 