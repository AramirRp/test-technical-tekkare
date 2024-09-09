import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Header from '../atoms/Header';
import { DashboardTemplate } from '../template/DashboardTemplate';
import Footer from '../atoms/Footer';
import FloatingLanguageSwitch from '../atoms/FloatingLanguageSwitch';
import ErrorBoundary from '../ErrorBoundary';
import theme from '../../theme'; 
import { Helmet } from 'react-helmet'; 

const LandingPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Your Dashboard Title</title>
        <meta name="description" content="Description of your dashboard" />
      </Helmet>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
            <ErrorBoundary>
              <DashboardTemplate />
            </ErrorBoundary>
          </Box>
        </Box>
        <Footer />
        <FloatingLanguageSwitch />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;