import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setMedicationData, setResearchData } from '../store/dataSlice';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const { medicationData, researchData } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    import('../data/data_exemple2.json').then(module => {
      dispatch(setMedicationData(module.default));
    });
    import('../data/data_exemple3.json').then(module => {
      dispatch(setResearchData(module.default));
    });
  }, [dispatch]);

  if (!medicationData || !researchData) {
    return <div>Loading...</div>;
  }

  const priceData = medicationData.molecules[0].medications[0].priceHistory;
  const fundingData = researchData[0].funding.sources;
  const trialData = researchData[0].clinicalTrials.map(trial => ({
    name: trial.trialName,
    participants: trial.totalParticipants
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Box sx={{ p: 3 }}>
      <Box display="grid" gridTemplateColumns={isMobile ? '1fr' : 'repeat(12, 1fr)'} gap={2}>
        <Box gridColumn={isMobile ? 'span 1' : 'span 6'}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">{t('medicationPriceTrends')}</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="priceEUR" stroke="#8884d8" name={t('priceEUR')} />
                <Line type="monotone" dataKey="priceUSD" stroke="#82ca9d" name={t('priceUSD')} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        <Box gridColumn={isMobile ? 'span 1' : 'span 6'}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">{t('researchFundingDistribution')}</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {fundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        <Box gridColumn={isMobile ? 'span 1' : 'span 12'}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">{t('clinicalTrialParticipants')}</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="participants" fill="#8884d8" name={t('participants')} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;