import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectOption } from '../atoms/select';
import { ChartContainer } from '../atoms/ChartContainer';

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
          <Line 
            key={line.dataKey} 
            type="monotone" 
            dataKey={line.dataKey} 
            stroke={line.stroke} 
            name={line.name} 
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartContainer>
);

export default LineChartWithSelect;