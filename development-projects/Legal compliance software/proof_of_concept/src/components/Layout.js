import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TN LLC Compliance App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ my: 4 }}>
          <Outlet />
        </Box>
      </Container>
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto',
          py: 3, 
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Tennessee LLC Compliance Tool &copy; {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Layout; 