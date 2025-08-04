import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';

// Import main components
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QuestionnaireFlow from './pages/QuestionnaireFlow';
import TimelineDashboard from './pages/TimelineDashboard';
import RequirementDetails from './pages/RequirementDetails';

// Import context providers
import { BusinessContextProvider } from './contexts/BusinessContext';
import { RequirementContextProvider } from './contexts/RequirementContext';

function App() {
  return (
    <BusinessContextProvider>
      <RequirementContextProvider>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="questionnaire" element={<QuestionnaireFlow />} />
              <Route path="timeline" element={<TimelineDashboard />} />
              <Route path="requirement/:id" element={<RequirementDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Box>
      </RequirementContextProvider>
    </BusinessContextProvider>
  );
}

export default App; 