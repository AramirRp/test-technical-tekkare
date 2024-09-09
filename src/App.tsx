// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Dashboard from './components/pages/Dashboard';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import FloatingLanguageSwitch from './components/molecules/FloatingLanguageSwitch';
import WelcomeModal from './components/molecules/WelcomeModal';

function App() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  const handleCloseWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WelcomeModal open={isWelcomeModalOpen} onClose={handleCloseWelcomeModal} />
        {!isWelcomeModalOpen && (
          <>
            <Dashboard />
            <FloatingLanguageSwitch />
          </>
        )}
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App; 