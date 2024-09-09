import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Select, SelectOption } from '../atoms/select';
import { ChartContainer } from '../atoms/ChartContainer';
import { Box, Typography } from '@mui/material';

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartWithSelectProps {
  title: string;
  data: PieChartData[];
  selectOptions: SelectOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  dataKey: string;
  nameKey: string;
  colors: string[];
}

export const PieChartWithSelect: React.FC<PieChartWithSelectProps> = ({
  title,
  data,
  selectOptions,
  selectedValue,
  onSelectChange,
  dataKey,
  nameKey,
  colors
}) => (
  <ChartContainer title={title}>
    <Box mb={2}>
      <Select
        label={title}
        value={selectedValue}
        onChange={onSelectChange}
        options={selectOptions}
      />
    </Box>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </ChartContainer>
);

export default PieChartWithSelect;