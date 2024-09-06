import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'fr', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const loadLocales = async () => {
  const enTranslations = await import('./locales/en.json');
  const frTranslations = await import('./locales/fr.json');

  i18n.addResourceBundle('en', 'translation', enTranslations.default);
  i18n.addResourceBundle('fr', 'translation', frTranslations.default);
};

loadLocales();

export default i18n;
