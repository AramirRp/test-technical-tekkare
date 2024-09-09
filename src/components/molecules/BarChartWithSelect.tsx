import React from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from '../atoms/select'
import { ChartContainer } from '../atoms/ChartContainer';

interface BarChartWithSelectProps {
  title: string;
  data: any[];
  selectOptions: { value: string; label: string }[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  xAxisDataKey: string;
  barDataKey: string;
  barName: string;
  barColor: string;
}

export const BarChartWithSelect: React.FC<BarChartWithSelectProps> = ({
  title, data, selectOptions, selectedValue, onSelectChange, xAxisDataKey, barDataKey, barName, barColor
}) => (
  <ChartContainer title={title}>
    <Select
      label={title}
      value={selectedValue}
      onChange={onSelectChange}
      options={selectOptions}
    />
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={barDataKey} fill={barColor} name={barName} />
      </RechartsBarChart>
    </ResponsiveContainer>
  </ChartContainer>
);