import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChartWithSelect } from '../molecules/PieChartWithSelect';
import { Box, Typography } from '@mui/material';

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

interface ResearchFundingChartProps {
  data: ResearchProject[];
}

const ResearchFundingChart: React.FC<ResearchFundingChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedResearchField, setSelectedResearchField] = useState('all');

  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data
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
  }, [data, selectedResearchField]);

  const researchFieldOptions = useMemo(() => {
    if (!data.length) return [{ value: 'all', label: t('allFields') }];
    return [
      { value: 'all', label: t('allFields') },
      ...Array.from(new Set(data.map(project => project.researchField)))
        .map(field => ({ value: field, label: field }))
    ];
  }, [data, t]);

  const totalFunding = useMemo(() => {
    return data.reduce((total, project) => total + project.funding.totalAmount, 0);
  }, [data]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (!data.length) return <Typography>{t('noDataAvailable')}</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.researchFundingChart')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('totalFunding')}: ${totalFunding.toLocaleString()}
      </Typography>
      <PieChartWithSelect
        title={t('dashboard.researchFundingChart')}
        data={chartData}
        selectOptions={researchFieldOptions}
        selectedValue={selectedResearchField}
        onSelectChange={setSelectedResearchField}
        dataKey="value"
        nameKey="name"
        colors={COLORS}
      />
    </Box>
  );
};

export default ResearchFundingChart;