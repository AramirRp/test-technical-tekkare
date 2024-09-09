import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChartWithSelect } from '../molecules/BarChartWithSelect';
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
  clinicalTrials: ClinicalTrial[];
}

interface ClinicalTrialsChartProps {
  data: ResearchProject[];
}

const ClinicalTrialsChart: React.FC<ClinicalTrialsChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedTrialStatus, setSelectedTrialStatus] = useState('all');

  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data
      .flatMap(project => project.clinicalTrials)
      .filter(trial => selectedTrialStatus === 'all' || trial.status === selectedTrialStatus);
  }, [data, selectedTrialStatus]);

  const trialStatusOptions = useMemo(() => {
    const statuses = Array.from(new Set(data.flatMap(project => project.clinicalTrials.map(trial => trial.status))));
    return [
      { value: 'all', label: t('allStatuses') },
      ...statuses.map(status => ({ value: status, label: t(status.toLowerCase()) }))
    ];
  }, [data, t]);

  if (!data.length) return <Typography>{t('noDataAvailable')}</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.clinicalTrialsChart')}
      </Typography>
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
      />
    </Box>
  );
};

export default ClinicalTrialsChart;