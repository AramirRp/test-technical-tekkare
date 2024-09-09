import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const loadLocales = async () => {
  const enTranslations = await import('./locales/en.json');
  const frTranslations = await import('./locales/fr.json');

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslations.default },
        fr: { translation: frTranslations.default },
      },
      lng: 'fr', 
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

export { loadLocales };
export default i18n;