import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Select, SelectOption } from '../atoms/select';
import { Box, Typography } from '@mui/material';

interface DataPoint {
  [key: string]: string | number;
}

interface BarChartWithSelectProps {
  data: DataPoint[];
  selectOptions: SelectOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  xAxisDataKey: string;
  barDataKey: string;
  barName: string;
  barColor: string;
  groupBy: string;
}

export const BarChartWithSelect: React.FC<BarChartWithSelectProps> = ({
  data,
  selectOptions,
  selectedValue,
  onSelectChange,
  xAxisDataKey,
  barDataKey,
  barName,
  barColor,
  groupBy

}) => {
  const groupedData = useMemo(() => {
    return data.reduce((acc, item) => {
      const key = item[groupBy] as string;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, DataPoint[]>);
  }, [data, groupBy]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, border: '1px solid #ccc' }}>
          <Typography variant="body2">{`${label}`}</Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  const totalTrials = data.length;
  const totalParticipants = data.reduce((sum, item) => sum + (item[barDataKey] as number), 0);

  return (
    <Box>
      <Box mb={2}>
        <Select
          label="Select Research Field"
          value={selectedValue}
          onChange={onSelectChange}
          options={selectOptions}
        />
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle1">
          Total Trials: {totalTrials}
        </Typography>
        <Typography variant="subtitle1">
          Total Participants: {totalParticipants}
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={500}>
        <RechartsBarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey={xAxisDataKey} 
            type="category" 
            width={150}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="horizontal" 
            verticalAlign="top" 
            align="center"
            wrapperStyle={{ paddingBottom: 20 }}
          />
          {Object.keys(groupedData).map((key, index) => (
            <Bar 
              key={key} 
              dataKey={barDataKey} 
              name={`${key} ${barName}`} 
              fill={colors[index % colors.length]}
              stackId="a"
            >
              {groupedData[key].map((entry, entryIndex) => (
                <Cell key={`cell-${entryIndex}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartWithSelect;