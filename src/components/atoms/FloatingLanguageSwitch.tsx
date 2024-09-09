// components/atoms/FloatingLanguageSwitch.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FloatingLanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button
      variant="contained"
      onClick={toggleLanguage}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      {t('languageSwitch')}
    </Button>
  );
};

export default FloatingLanguageSwitch;