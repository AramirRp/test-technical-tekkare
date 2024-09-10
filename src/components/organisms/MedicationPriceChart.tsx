import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChartWithSelect } from '../molecules/LineChartWithSelect';
import { Box, Typography, Paper } from '@mui/material';
import { SelectOption } from '../atoms/select';

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

interface MedicationData {
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

  const moleculeOptions: SelectOption[] = useMemo(() => {
    return [
      { value: 'all', label: t('allMolecules') },
      ...data.molecules.map(molecule => ({ value: molecule.name, label: molecule.name }))
    ];
  }, [data, t]);

  const handleMoleculeChange = (value: string) => {
    setSelectedMolecule(value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', minHeight: 500 }}>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.medicationChart')}
      </Typography>
      <Box height="calc(100% - 60px)">
        <LineChartWithSelect
          data={chartData}
          selectOptions={moleculeOptions}
          selectedValue={selectedMolecule}
          onSelectChange={handleMoleculeChange}
          xAxisDataKey="date"
          lines={[
            { dataKey: "priceEUR", stroke: "#8884d8", name: t('priceEUR') },
            { dataKey: "priceUSD", stroke: "#82ca9d", name: t('priceUSD') }
          ]}
        />
      </Box>
    </Paper>
  );
};

export default MedicationPriceChart;