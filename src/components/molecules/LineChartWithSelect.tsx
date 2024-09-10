import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';
import { Select, SelectOption } from '../atoms/select';

interface PriceHistory {
  date: string;
  priceEUR: number;
  priceUSD: number;
}

interface LineData {
  dataKey: keyof PriceHistory;
  stroke: string;
  name: string;
}

interface LineChartWithSelectProps {
  title: string;
  data: PriceHistory[];
  selectOptions: SelectOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  xAxisDataKey: keyof PriceHistory;
  lines: LineData[];
}

export const LineChartWithSelect: React.FC<LineChartWithSelectProps> = ({
  title,
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
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
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            formatter={(value, name, props) => [`${value} ${name.includes('EUR') ? '€' : '$'}`, props.dataKey]}
          />
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