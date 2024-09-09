import React from 'react';
import { ResponsiveContainer, PieChart as RechartsePieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Select } from '../atoms/select';
import { ChartContainer } from '../atoms/ChartContainer';

interface PieChartWithSelectProps {
  title: string;
  data: any[];
  selectOptions: { value: string; label: string }[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  dataKey: string;
  nameKey: string;
  colors: string[];
}

export const PieChartWithSelect: React.FC<PieChartWithSelectProps> = ({
  title, data, selectOptions, selectedValue, onSelectChange, dataKey, nameKey, colors
}) => (
  <ChartContainer title={title}>
    <Select
      label={title}
      value={selectedValue}
      onChange={onSelectChange}
      options={selectOptions}
    />
    <ResponsiveContainer width="100%" height={300}>
      <RechartsePieChart>
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
      </RechartsePieChart>
    </ResponsiveContainer>
  </ChartContainer>
);