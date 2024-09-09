import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from '../atoms/select';
import { ChartContainer } from '../atoms/ChartContainer';

interface LineChartWithSelectProps {
  title: string;
  data: any[];
  selectOptions: { value: string; label: string }[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  xAxisDataKey: string;
  lines: { dataKey: string; stroke: string; name: string }[];
}

export const LineChartWithSelect: React.FC<LineChartWithSelectProps> = ({
  title, data, selectOptions, selectedValue, onSelectChange, xAxisDataKey, lines
}) => (
  <ChartContainer title={title}>
    <Select
      label={title}
      value={selectedValue}
      onChange={onSelectChange}
      options={selectOptions}
    />
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line) => (
          <Line key={line.dataKey} type="monotone" {...line} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartContainer>
);