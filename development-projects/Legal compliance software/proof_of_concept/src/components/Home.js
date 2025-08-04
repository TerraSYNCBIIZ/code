import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Container,
  Divider
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Home = () => {
  const navigate = useNavigate();

  const startQuestionnaire = () => {
    navigate('/questionnaire');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: theme => `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Tennessee LLC Compliance
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Simplify your business compliance journey with our guided process
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={startQuestionnaire}
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontSize: '1.1rem',
              boxShadow: 3
            }}
          >
            Start Your Compliance Journey
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}>
          Our application guides you through the process of identifying and managing compliance requirements for your Tennessee LLC.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 } }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <BusinessIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h3">
                  1. Tell Us About Your Business
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete our questionnaire to help us understand your business structure, location, and activities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 } }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <AssignmentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h3">
                  2. Receive Custom Requirements
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Based on your answers, we generate a personalized list of all compliance requirements applicable to your business.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 } }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <TimelineIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h3">
                  3. Track Your Timeline
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View a visual timeline of all your compliance deadlines and track your progress as you complete each requirement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 2,
              background: theme => `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to simplify your compliance journey?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
              Get started now and transform your business compliance process with our guided timeline approach.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={startQuestionnaire}
              sx={{ py: 1.5, px: 4 }}
            >
              Start Questionnaire
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          About Our Solution
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="body1" paragraph>
          Our Tennessee LLC Compliance Application is designed to help small business owners navigate the complex landscape of legal requirements with ease and confidence.
        </Typography>
        <Typography variant="body1" paragraph>
          We focus on the most critical aspects of compliance for businesses in Tennessee, with special attention to Knox County and Knoxville city requirements.
        </Typography>
        <Typography variant="body1" paragraph>
          From federal tax obligations to local permits and licenses, our application provides a comprehensive timeline view of all your compliance needs, transforming complexity into a simple, step-by-step process.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home; 