import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Typography, Box } from '@mui/material';
import DashboardTemplate from '../template/DashboardTemplate';
import MedicationPriceChart from '../organisms/MedicationPriceChart';
import ResearchFundingChart from '../organisms/ResearchFundingChart';
import ClinicalTrialsChart from '../organisms/ClinicalTrialsChart';

interface MedicationData {
  molecules: Array<{
    name: string;
    description: string;
    medications: Array<{
      name: string;
      dosage: string;
      priceHistory: Array<{
        date: string;
        priceEUR: number;
        priceUSD: number;
      }>;
    }>;
  }>;
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
  funding: {
    totalAmount: number;
    sources: Array<{
      name: string;
      amount: number;
    }>;
  };
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
    return <Typography color="error">{error}</Typography>;
  }

  if (!medicationData || !researchData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography ml={2}>{t('loading')}</Typography>
      </Box>
    );
  }

  return (
    <DashboardTemplate>
      <MedicationPriceChart data={medicationData} />
      <ResearchFundingChart data={researchData} />
      <ClinicalTrialsChart data={researchData} />
    </DashboardTemplate>
  );
};

export default Dashboard;