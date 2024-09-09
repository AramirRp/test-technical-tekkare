import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChartWithSelect } from '../molecules/LineChartWithSelect';
import { Box, CircularProgress, Typography } from '@mui/material';

const MedicationPriceChart: React.FC = () => {
  const { t } = useTranslation();
  const [medicationData, setMedicationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMolecule, setSelectedMolecule] = useState('all');

  useEffect(() => {
    setLoading(true);
    import('../../data/data_exemple2.json')
      .then(module => {
        setMedicationData(module.default);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load medication data:", err);
        setError("Failed to load medication data");
        setLoading(false);
      });
  }, []);

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!medicationData) return <Typography>{t('noDataAvailable')}</Typography>;

  const chartData = medicationData.molecules
    .filter((mol: any) => selectedMolecule === 'all' || mol.name === selectedMolecule)
    .flatMap((mol: any) => mol.medications[0].priceHistory);

  const moleculeOptions = [
    { value: 'all', label: t('allMolecules') },
    ...medicationData.molecules.map((mol: any) => ({ value: mol.name, label: mol.name }))
  ];

  return (
    <LineChartWithSelect
      title={t('dashboard.medicationChart')}
      data={chartData}
      selectOptions={moleculeOptions}
      selectedValue={selectedMolecule}
      onSelectChange={setSelectedMolecule}
      xAxisDataKey="date"
      lines={[
        { dataKey: "priceEUR", stroke: "#8884d8", name: t('priceEUR') },
        { dataKey: "priceUSD", stroke: "#82ca9d", name: t('priceUSD') }
      ]}
    />
  );
};

export default MedicationPriceChart;