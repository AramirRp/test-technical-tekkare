import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChartWithSelect } from '../molecules/BarChartWithSelect';

const ClinicalTrialsChart: React.FC = () => {
  const { t } = useTranslation();
  const [researchData, setResearchData] = useState<any>(null);
  const [selectedTrialStatus, setSelectedTrialStatus] = useState('all');

  useEffect(() => {
    import('../../data/data_exemple3.json').then(module => setResearchData(module.default));
  }, []);

  if (!researchData) return <div>{t('loading')}</div>;

  const chartData = researchData
    .flatMap((project: any) => project.clinicalTrials)
    .filter((trial: any) => selectedTrialStatus === 'all' || trial.status === selectedTrialStatus);

  const trialStatusOptions = [
    { value: 'all', label: t('allStatuses') },
    { value: 'Completed', label: t('completed') },
    { value: 'Ongoing', label: t('ongoing') },
    { value: 'Pending', label: t('pending') }
  ];

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
    />
  );
};

export default ClinicalTrialsChart;