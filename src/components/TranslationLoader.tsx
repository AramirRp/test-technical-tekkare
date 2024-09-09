import React, { useState, useEffect } from 'react';
import { loadLocales } from '../i18n';

interface TranslationLoaderProps {
  children: React.ReactNode;
}

const TranslationLoader: React.FC<TranslationLoaderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadLocales().then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) {
    return <div>Loading translations...</div>;
  }

  return <>{children}</>;
};

export default TranslationLoader;