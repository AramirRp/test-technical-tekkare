import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BarChartWithSelect from '../molecules/BarChartWithSelect';
import { Box, Typography } from '@mui/material';

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

const ClinicalTrialsChart: React.FC = () => {
  const { t } = useTranslation();
  const [researchData, setResearchData] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrialStatus, setSelectedTrialStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    import('../../data/data_exemple3.json')
      .then(module => {
        setResearchData(module.default);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load research data:", err);
        setError(t('error.failedToLoadData'));
        setLoading(false);
      });
  }, [t]);

  const chartData = useMemo(() => {
    if (!researchData.length) return [];
    return researchData
      .flatMap(project => project.clinicalTrials)
      .filter(trial => selectedTrialStatus === 'all' || trial.status === selectedTrialStatus);
  }, [researchData, selectedTrialStatus]);

  const trialStatusOptions = [
    { value: 'all', label: t('allStatuses') },
    { value: 'Completed', label: t('completed') },
    { value: 'Ongoing', label: t('ongoing') },
    { value: 'Pending', label: t('pending') }
  ];

  if (loading) return <Box display="flex" justifyContent="center" aria-label={t('loading')}><CircularProgress /></Box>;
  if (error) return <Typography color="error" aria-label={t('error')}>{error}</Typography>;
  if (!researchData.length) return <Typography aria-label={t('noDataAvailable')}>{t('noDataAvailable')}</Typography>;

  return (
    <BarChartWithSelect
      title={t('dashboard.clinicalTrialsChart')}
      data={chartData}
      selectOptions={trialStatusOptions}
      selectedValue={selectedTrialStatus}
      onSelectChange={setSelectedTrialStatus}
      xAxisDataKey="trialName"
      barDataKey="totalParticipants"
      barName={t('participants')}
      barColor="#8884d8"
      aria-label={t('dashboard.clinicalTrialsChart')}
    />
  );
};

export default ClinicalTrialsChart;