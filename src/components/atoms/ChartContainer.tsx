import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6">{title}</Typography>
    {children}
  </Paper>
);