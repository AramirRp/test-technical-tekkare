import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationLoader: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadLanguageResources = async (lang: string) => {
      try {

        const translations = await import(`../locales/${lang}.json`);
        i18n.addResourceBundle(lang, 'translation', translations.default, true, true);
      } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
      }
    };

    loadLanguageResources(i18n.language);
  }, [i18n.language]);

  return null;
};

export default TranslationLoader;