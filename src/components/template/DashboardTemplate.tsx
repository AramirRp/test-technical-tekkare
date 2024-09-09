import React, { Suspense, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../ErrorBoundary';

const MedicationPriceChart = React.lazy(() => import('../organisms/MedicationPriceChart'));
const ResearchFundingChart = React.lazy(() => import('../organisms/ResearchFundingChart'));
const ClinicalTrialsChart = React.lazy(() => import('../organisms/ClinicalTrialsChart'));

const ChartWrapper = React.memo(({ children, label }: { children: React.ReactNode; label: string }) => (
  <ErrorBoundary>
    <Suspense fallback={<CircularProgress />}>
      <Box aria-label={label}>
        {children}
      </Box>
    </Suspense>
  </ErrorBoundary>
));

export const DashboardTemplate: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ medicationData: any; researchData: any } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicationModule, researchModule] = await Promise.all([
          import('../../data/data_exemple2.json'),
          import('../../data/data_exemple3.json')
        ]);
        setData({
          medicationData: medicationModule.default,
          researchData: researchModule.default
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
      <Typography variant="h4" component="h1">{t('dashboard.title')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1, minHeight: '300px' }}>
          <ChartWrapper label={t('dashboard.medicationChart')}>
            <MedicationPriceChart data={data.medicationData} />
          </ChartWrapper>
        </Box>
        <Box sx={{ flex: 1, minHeight: '300px' }}>
          <ChartWrapper label={t('dashboard.researchFundingChart')}>
            <ResearchFundingChart data={data.researchData} />
          </ChartWrapper>
        </Box>
      </Box>
      <Box sx={{ minHeight: '300px' }}>
        <ChartWrapper label={t('dashboard.clinicalTrialsChart')}>
          <ClinicalTrialsChart data={data.researchData} />
        </ChartWrapper>
      </Box>
    </Box>
  );
};

export default DashboardTemplate;