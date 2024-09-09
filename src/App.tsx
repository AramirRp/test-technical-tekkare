import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import theme from './theme';
import LandingPage from './components/pages/LandingPage';
import TranslationLoader from './components/TranslationLoader';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <TranslationLoader>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </TranslationLoader>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;