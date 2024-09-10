import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChartWithSelect } from '../molecules/BarChartWithSelect';
import { Box, Typography, Paper } from '@mui/material';

// ... (keep your existing interfaces)

const ClinicalTrialsChart: React.FC<ClinicalTrialsChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedResearchField, setSelectedResearchField] = useState('all');

  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data
      .filter(project => selectedResearchField === 'all' || project.researchField === selectedResearchField)
      .flatMap(project => project.clinicalTrials.map(trial => ({
        ...trial,
        researchField: project.researchField,
        projectName: project.projectName
      })));
  }, [data, selectedResearchField]);

  const researchFieldOptions = useMemo(() => {
    const fields = Array.from(new Set(data.map(project => project.researchField)));
    return [
      { value: 'all', label: t('allFields') },
      ...fields.map(field => ({ value: field, label: field }))
    ];
  }, [data, t]);

  if (!data.length) return <Typography>{t('noDataAvailable')}</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', minHeight: 500 }}>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.clinicalTrialsChart')}
      </Typography>
      <Box height="calc(100% - 60px)">
        <BarChartWithSelect
          data={chartData}
          selectOptions={researchFieldOptions}
          selectedValue={selectedResearchField}
          onSelectChange={setSelectedResearchField}
          xAxisDataKey="trialName"
          barDataKey="totalParticipants"
          barName={t('participants')}
          barColor="#8884d8"
          groupBy="phase"
        />
      </Box>
    </Paper>
  );
};

export default ClinicalTrialsChart;