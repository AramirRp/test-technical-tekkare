import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChartWithSelect } from '../molecules/PieChartWithSelect';
import { Box, CircularProgress, Typography } from '@mui/material';

interface FundingSource {
  name: string;
  amount: number;
}

interface ResearchProject {
  projectName: string;
  researchField: string;
  funding: {
    totalAmount: number;
    sources: FundingSource[];
  };
}

const ResearchFundingChart: React.FC = () => {
  const { t } = useTranslation();
  const [researchData, setResearchData] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResearchField, setSelectedResearchField] = useState('all');

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
      .filter(project => selectedResearchField === 'all' || project.researchField === selectedResearchField)
      .flatMap(project => project.funding.sources)
      .reduce((acc, source) => {
        const existingSource = acc.find(item => item.name === source.name);
        if (existingSource) {
          existingSource.value += source.amount;
        } else {
          acc.push({ name: source.name, value: source.amount });
        }
        return acc;
      }, [] as { name: string; value: number }[]);
  }, [researchData, selectedResearchField]);

  const researchFieldOptions = useMemo(() => {
    if (!researchData.length) return [{ value: 'all', label: t('allFields') }];
    return [
      { value: 'all', label: t('allFields') },
      ...Array.from(new Set(researchData.map(project => project.researchField)))
        .map(field => ({ value: field, label: field }))
    ];
  }, [researchData, t]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) return <Box display="flex" justifyContent="center" aria-label={t('loading')}><CircularProgress /></Box>;
  if (error) return <Typography color="error" aria-label={t('error')}>{error}</Typography>;
  if (!researchData.length) return <Typography aria-label={t('noDataAvailable')}>{t('noDataAvailable')}</Typography>;

  return (
    <PieChartWithSelect
      title={t('dashboard.researchFundingChart')}
      data={chartData}
      selectOptions={researchFieldOptions}
      selectedValue={selectedResearchField}
      onSelectChange={setSelectedResearchField}
      dataKey="value"
      nameKey="name"
      colors={COLORS}
      aria-label={t('dashboard.researchFundingChart')}
    />
  );
};

export default ResearchFundingChart;