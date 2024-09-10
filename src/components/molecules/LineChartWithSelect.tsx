import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
  title: string;
  data: PriceHistory[];
  xAxisDataKey: keyof PriceHistory;
  lines: LineData[];
}

export const LineChartWithSelect: React.FC<LineChartWithSelectProps> = ({
  title,
  data,
  xAxisDataKey,
  lines
}) => {
  const formatXAxis = (tickItem: string) => {
    return new Date(tickItem).toLocaleDateString();
  };

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F"];

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
            formatter={(value, name, props) => [
              `${value} ${name.includes('EUR') ? '€' : '$'}`,
              `${props.dataKey} (${props.payload.molecule})`
            ]}
          />
          <Legend />
          {lines.map((line, index) => (
            data.map(entry => entry.molecule).filter((v, i, a) => a.indexOf(v) === i).map((molecule, molIndex) => (
              <Line 
                key={`${line.dataKey}-${molecule}`}
                type="monotone" 
                dataKey={line.dataKey} 
                stroke={colors[(index * data.map(entry => entry.molecule).filter((v, i, a) => a.indexOf(v) === i).length + molIndex) % colors.length]}
                name={`${line.name} (${molecule})`}
                dot={false}
                connectNulls
              />
            ))
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartWithSelect;