import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Select, SelectOption } from '../atoms/select';
import { Box, Typography } from '@mui/material';

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartWithSelectProps {
  data: PieChartData[];
  selectOptions: SelectOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  dataKey: string;
  nameKey: string;
  colors: string[];
  totalFunding: number;
}

export const PieChartWithSelect: React.FC<PieChartWithSelectProps> = ({
  data,
  selectOptions,
  selectedValue,
  onSelectChange,
  dataKey,
  nameKey,
  colors,
  totalFunding
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data[dataKey] / totalFunding) * 100).toFixed(2);
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, border: '1px solid #ccc' }}>
          <Typography variant="body2">{`${data[nameKey]}: $${data[dataKey].toLocaleString()} (${percentage}%)`}</Typography>
        </Box>
      );
    }
    return null;
  };

  const renderColorfulLegendText = (value: string) => {
    return <span style={{ fontSize: '0.75rem' }}>{value}</span>;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box mb={2}>
        <Select
          label="Select Research Field"
          value={selectedValue}
          onChange={onSelectChange}
          options={selectOptions}
        />
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total Funding: ${totalFunding.toLocaleString()}
      </Typography>
      <Box sx={{ flex: 1, position: 'relative', minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              formatter={renderColorfulLegendText}
              wrapperStyle={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                fontSize: '0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default PieChartWithSelect;