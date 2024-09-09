import React, { ErrorInfo, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MedicationPriceChart from '../organisms/MedicationPriceChart';
import ResearchFundingChart from '../organisms/ResearchFundingChart';
import ClinicalTrialsChart from '../organisms/ClinicalTrialsChart';

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography color="error">Something went wrong.</Typography>;
    }

    return this.props.children;
  }
}

export const DashboardTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
      <Typography variant="h4">{t('dashboard.title')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <ErrorBoundary>
            <MedicationPriceChart />
          </ErrorBoundary>
        </Box>
        <Box sx={{ flex: 1 }}>
          <ErrorBoundary>
            <ResearchFundingChart />
          </ErrorBoundary>
        </Box>
      </Box>
      <Box>
        <ErrorBoundary>
          <ClinicalTrialsChart />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default DashboardTemplate;