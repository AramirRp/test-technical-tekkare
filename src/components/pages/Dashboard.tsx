import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CircularProgress, 
  Typography, 
  Box, 
  Paper, 
  AppBar, 
  Toolbar, 
  Container
} from '@mui/material';import MedicationPriceChart from '../organisms/MedicationPriceChart';
import ResearchFundingChart from '../organisms/ResearchFundingChart';
import ClinicalTrialsChart from '../organisms/ClinicalTrialsChart';
import FloatingLanguageSwitch from '../molecules/FloatingLanguageSwitch';

interface PriceHistory {
  date: string;
  priceEUR: number;
  priceUSD: number;
}

interface Medication {
  name: string;
  dosage: string;
  priceHistory: PriceHistory[];
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
    sources: Array<{
      name: string;
      amount: number;
    }>;
  };
  researchTeam: Array<{
    name: string;
    role: string;
    specialty: string;
  }>;
  milestones: Array<{
    name: string;
    completionDate: string;
    status: string;
  }>;
  publications: Array<{
    title: string;
    journal: string;
    publicationDate: string;
    doi: string;
  }>;
  clinicalTrials: ClinicalTrial[];
}

type ResearchData = ResearchProject[];

export const Dashboard: React.FC = () => {
  const [medicationData, setMedicationData] = useState<MedicationData | null>(null);
  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicationModule, researchModule] = await Promise.all([
          import('../../data/data_exemple2.json'),
          import('../../data/data_exemple3.json')
        ]);
        setMedicationData(medicationModule.default);
        setResearchData(researchModule.default);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(t('error.dataFetch'));
      }
    };

    fetchData();
  }, [t]);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h5">{error}</Typography>
      </Box>
    );
  }

  if (!medicationData || !researchData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
        <Typography variant="h6" ml={2}>{t('loading')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('dashboard.title')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          gap: 3
        }}>
          <Box sx={{ flexBasis: { xs: '100%', md: 'calc(50% - 12px)' }, flexGrow: 1 }}>
            <Paper elevation={3} sx={{ p: 2, height: '100%', minHeight: 300 }}>
              <MedicationPriceChart data={medicationData} />
            </Paper>
          </Box>
          <Box sx={{ flexBasis: { xs: '100%', md: 'calc(50% - 12px)' }, flexGrow: 1 }}>
            <Paper elevation={3} sx={{ p: 2, height: '100%', minHeight: 300 }}>
              <ResearchFundingChart data={researchData} />
            </Paper>
          </Box>
          <Box sx={{ flexBasis: '100%' }}>
            <Paper elevation={3} sx={{ p: 2, height: '100%', minHeight: 300 }}>
              <ClinicalTrialsChart data={researchData} />
            </Paper>
          </Box>
        </Box>
      </Container>
      <FloatingLanguageSwitch />
    </Box>
  );
};

export default Dashboard;