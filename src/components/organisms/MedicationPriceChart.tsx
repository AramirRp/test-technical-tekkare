// src/components/organisms/MedicationPriceChart.tsx

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChartWithSelect } from '../molecules/LineChartWithSelect';
import { Box, Typography } from '@mui/material';

interface PriceHistory {
  date: string;
  priceEUR: number;
  priceUSD: number;
}

interface Medication {
  name: string;
  dosage: string;
  priceHistory: PriceHistory[];
}

interface Molecule {
  name: string;
  description: string;
  medications: Medication[];
}

export interface MedicationData {
  molecules: Molecule[];
}

interface MedicationPriceChartProps {
  data: MedicationData;
}

const MedicationPriceChart: React.FC<MedicationPriceChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedMolecule, setSelectedMolecule] = useState('all');

  const chartData = useMemo(() => {
    if (selectedMolecule === 'all') {
      return data.molecules.flatMap(molecule => 
        molecule.medications[0].priceHistory.map(history => ({
          ...history,
          molecule: molecule.name
        }))
      );
    } else {
      const molecule = data.molecules.find(m => m.name === selectedMolecule);
      return molecule ? molecule.medications[0].priceHistory.map(history => ({
        ...history,
        molecule: molecule.name
      })) : [];
    }
  }, [data, selectedMolecule]);

  const moleculeOptions = useMemo(() => {
    return [
      { value: 'all', label: t('allMolecules') },
      ...data.molecules.map(molecule => ({ value: molecule.name, label: molecule.name }))
    ];
  }, [data, t]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.medicationChart')}
      </Typography>
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
    </Box>
  );
};

export default MedicationPriceChart;