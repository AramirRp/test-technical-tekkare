import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationLoader: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
  }, [i18n.language]);

  return null;
};

export default TranslationLoader;