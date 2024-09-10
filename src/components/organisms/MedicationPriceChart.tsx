import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Autocomplete, TextField, Chip } from '@mui/material';
import { LineChartWithSelect } from '../molecules/LineChartWithSelect';
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
  const [selectedMolecules, setSelectedMolecules] = useState<string[]>(['all']);

  const chartData = useMemo(() => {
    if (selectedMolecules.includes('all')) {
      return data.molecules.flatMap(molecule => 
        molecule.medications[0].priceHistory.map(history => ({
          ...history,
          molecule: molecule.name
        }))
      );
    } else {
      return data.molecules
        .filter(m => selectedMolecules.includes(m.name))
        .flatMap(molecule => 
          molecule.medications[0].priceHistory.map(history => ({
            ...history,
            molecule: molecule.name
          }))
        );
    }
  }, [data, selectedMolecules]);

  const moleculeOptions = useMemo(() => {
    return [
      { value: 'all', label: t('allMolecules') },
      ...data.molecules.map(molecule => ({ value: molecule.name, label: molecule.name }))
    ];
  }, [data, t]);

  const handleMoleculeChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedMolecules(newValue.length === 0 ? ['all'] : newValue);
  };

  return (
    <Box>
      <Autocomplete
        multiple
        options={moleculeOptions.map(option => option.value)}
        getOptionLabel={(option) => moleculeOptions.find(o => o.value === option)?.label || option}
        value={selectedMolecules}
        onChange={handleMoleculeChange}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={t('selectMolecules')} />
        )}
        renderTags={(value: string[], getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={moleculeOptions.find(o => o.value === option)?.label || option}
              {...getTagProps({ index })}
              color="primary"
              variant="outlined"
            />
          ))
        }
      />
      <LineChartWithSelect
        title={t('dashboard.medicationChart')}
        data={chartData}
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