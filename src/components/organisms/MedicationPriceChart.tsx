import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChartWithSelect } from '../molecules/LineChartWithSelect';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Medication {
  name: string;
  dosage: string;
  priceHistory: Array<{
    date: string;
    priceEUR: number;
    priceUSD: number;
  }>;
}

interface Molecule {
  name: string;
  description: string;
  medications: Medication[];
}

interface MedicationData {
  molecules: Molecule[];
}

const MedicationPriceChart: React.FC = () => {
  const { t } = useTranslation();
  const [medicationData, setMedicationData] = useState<MedicationData | null>(null);
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
        setError(t('error.failedToLoadData'));
        setLoading(false);
      });
  }, [t]);

  const chartData = useMemo(() => {
    if (!medicationData) return [];
    return medicationData.molecules
      .filter(mol => selectedMolecule === 'all' || mol.name === selectedMolecule)
      .flatMap(mol => mol.medications[0].priceHistory);
  }, [medicationData, selectedMolecule]);

  const moleculeOptions = useMemo(() => {
    if (!medicationData) return [{ value: 'all', label: t('allMolecules') }];
    return [
      { value: 'all', label: t('allMolecules') },
      ...medicationData.molecules.map(mol => ({ value: mol.name, label: mol.name }))
    ];
  }, [medicationData, t]);

  if (loading) return <Box display="flex" justifyContent="center" aria-label={t('loading')}><CircularProgress /></Box>;
  if (error) return <Typography color="error" aria-label={t('error')}>{error}</Typography>;
  if (!medicationData) return <Typography aria-label={t('noDataAvailable')}>{t('noDataAvailable')}</Typography>;

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
      aria-label={t('dashboard.medicationChart')}
    />
  );
};

export default MedicationPriceChart;