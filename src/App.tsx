import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import theme from './theme';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </Router>
          </ThemeProvider>
  );
}

export default App;