import React, { Suspense, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MedicationPriceChart = React.lazy(() => import('../organisms/MedicationPriceChart'));
const ResearchFundingChart = React.lazy(() => import('../organisms/ResearchFundingChart'));
const ClinicalTrialsChart = React.lazy(() => import('../organisms/ClinicalTrialsChart'));

interface Medication {
  name: string;
  dosage: string;
  priceHistory: Array<{
    date: string;
    priceEUR: number;
    priceUSD: number;
  }>;
}

interface Molecule {
  name: string;
  description: string;
  medications: Medication[];
}

interface MedicationData {
  molecules: Molecule[];
}

interface ClinicalTrial {
  trialName: string;
  phase: string;
  startDate: string;
  endDate: string;
  totalParticipants: number;
  status: string;
}

interface ResearchProject {
  projectName: string;
  researchField: string;
  leadInstitution: string;
  startDate: string;
  endDate: string;
  funding: {
    totalAmount: number;
    sources: Array<{ name: string; amount: number }>;
  };
  researchTeam: Array<{ name: string; role: string; specialty: string }>;
  milestones: Array<{ name: string; completionDate: string; status: string }>;
  publications: Array<{ title: string; journal: string; publicationDate: string; doi: string }>;
  clinicalTrials: ClinicalTrial[];
}

interface DashboardData {
  medicationData: MedicationData;
  researchData: ResearchProject[];
}

const ChartWrapper: React.FC<{ children: React.ReactNode; label: string }> = React.memo(({ children, label }) => (
  <Suspense fallback={<CircularProgress />}>
    <Box aria-label={label}>
      {children}
    </Box>
  </Suspense>
));

export const DashboardTemplate: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicationModule, researchModule] = await Promise.all([
          import('../../data/data_exemple2.json'),
          import('../../data/data_exemple3.json')
        ]);
        setData({
          medicationData: medicationModule.default as MedicationData,
          researchData: researchModule.default as ResearchProject[]
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