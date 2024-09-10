import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import  LineChartWithSelect  from '../molecules/LineChartWithSelect';
import { Box, Typography, Paper, Autocomplete, TextField, Chip } from '@mui/material';

interface PriceHistory {
  date: string;
  priceEUR: number;
  priceUSD: number;
  molecule: string;
  medication: string;
}

interface Medication {
  name: string;
  dosage: string;
  priceHistory: Omit<PriceHistory, 'molecule' | 'medication'>[];
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
  const [selectedMolecules, setSelectedMolecules] = useState<string[]>([]);

  const chartData = useMemo(() => {
    const selectedData = selectedMolecules.length === 0 
      ? data.molecules 
      : data.molecules.filter(molecule => selectedMolecules.includes(molecule.name));

    return selectedData.flatMap(molecule => 
      molecule.medications.flatMap(medication =>
        medication.priceHistory.map(history => ({
          ...history,
          molecule: molecule.name,
          medication: medication.name
        }))
      )
    );
  }, [data, selectedMolecules]);

  const moleculeOptions = useMemo(() => {
    return data.molecules.map(molecule => ({ value: molecule.name, label: molecule.name }));
  }, [data]);

  const handleMoleculeChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedMolecules(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', minHeight: 500 }}>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.medicationChart')}
      </Typography>
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
          value.map((option, index) => {
            const { key, ...otherProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={moleculeOptions.find(o => o.value === option)?.label || option}
                {...otherProps}
                color="primary"
                variant="outlined"
              />
            );
          })
        }
        sx={{ mb: 2 }}
      />
      <Box height="calc(100% - 120px)">
        <LineChartWithSelect
          title=""
          data={chartData}
          selectOptions={[]}
          selectedValue=""
          onSelectChange={() => {}}
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