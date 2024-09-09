import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChartWithSelect } from '../molecules/PieChartWithSelect';

const ResearchFundingChart: React.FC = () => {
  const { t } = useTranslation();
  const [researchData, setResearchData] = useState<any>(null);
  const [selectedResearchField, setSelectedResearchField] = useState('all');

  useEffect(() => {
    import('../../data/data_exemple3.json').then(module => setResearchData(module.default));
  }, []);

  if (!researchData) return <div>{t('loading')}</div>;

  const chartData = researchData
    .filter((project: any) => selectedResearchField === 'all' || project.researchField === selectedResearchField)
    .flatMap((project: any) => project.funding.sources.map((source: any) => ({
      name: source.name,
      value: source.amount
    })));

  const researchFieldOptions = [
    { value: 'all', label: t('allFields') },
    ...Array.from(new Set(researchData.map((project: any) => project.researchField)))
      .map(field => ({ value: field, label: field }))
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
    />
  );
};

export default ResearchFundingChart;