import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h5" component="h2" gutterBottom>
        {t('landingPageDescription')}
      </Typography>
      <Button component={Link} to="/dashboard" variant="contained" color="primary" size="large">
        {t('goToDashboard')}
      </Button>
    </Box>
  );
};

export default LandingPage;