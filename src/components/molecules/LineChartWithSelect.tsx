import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectOption } from '../atoms/select';
import { Box, Typography } from '@mui/material';

interface PriceHistory {
  date: string;
  priceEUR: number;
  priceUSD: number;
  molecule: string;
}

interface LineData {
  dataKey: keyof PriceHistory;
  stroke: string;
  name: string;
}

interface LineChartWithSelectProps {
  data: PriceHistory[];
  selectOptions: SelectOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  xAxisDataKey: keyof PriceHistory;
  lines: LineData[];
}

export const LineChartWithSelect: React.FC<LineChartWithSelectProps> = ({
  data,
  selectOptions,
  selectedValue,
  onSelectChange,
  xAxisDataKey,
  lines
}) => {
  const formatXAxis = (tickItem: string) => {
    return new Date(tickItem).toLocaleDateString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, border: '1px solid #ccc' }}>
          <Typography variant="body2">{`Date: ${new Date(label).toLocaleDateString()}`}</Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${entry.name.toLowerCase().includes('eur') ? '€' : '$'}`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box mb={2}>
        <Select
          label="Select Molecule"
          value={selectedValue}
          onChange={onSelectChange}
          options={selectOptions}
        />
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisDataKey} 
            tickFormatter={formatXAxis}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {lines.map((line) => (
            <Line 
              key={line.dataKey} 
              type="monotone" 
              dataKey={line.dataKey} 
              stroke={line.stroke} 
              name={line.name} 
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartWithSelect;