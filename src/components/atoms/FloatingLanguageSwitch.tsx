import React from 'react';
import { Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const FloatingLanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();
  const theme = useTheme();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Button
      variant="contained"
      onClick={toggleLanguage}
      startIcon={<LanguageIcon />}
      aria-label={t('switchLanguageAriaLabel')}
      sx={{
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: theme.zIndex.speedDial,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }}
    >
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </Button>
  );
};

export default FloatingLanguageSwitch;