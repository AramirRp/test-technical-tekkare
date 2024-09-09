import React from 'react';
import { Box, Typography } from '@mui/material';

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
      <Typography variant="h4" component="h1">Dashboard</Typography>
      {children}
    </Box>
  );
};

export default DashboardTemplate;