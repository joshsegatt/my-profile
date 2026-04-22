import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../data/locales/en.json';
import pt from '../data/locales/pt.json';
import fr from '../data/locales/fr.json';

type Locale = 'en' | 'pt' | 'fr';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const dictionaries: Record<Locale, any> = { en, pt, fr };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // 1. Check localStorage for manual override
    const savedLocale = localStorage.getItem('user-locale') as Locale;
    if (savedLocale && dictionaries[savedLocale]) {
      setLocale(savedLocale);
      return;
    }

    // 2. Detect browser language
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (dictionaries[browserLang]) {
      setLocale(browserLang);
    } else {
      setLocale('en'); // Default to Formal English
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('user-locale', newLocale);
  };

  /**
   * Translate function with support for nested keys (e.g., 'nav.home')
   * and parameter replacement (e.g., '{{step}}')
   */
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value = dictionaries[locale];

    for (const k of keys) {
      if (value[k] === undefined) {
        // Fallback to English dictionary if key is missing in current locale
        let fallbackValue = dictionaries['en'];
        for (const fk of keys) {
          if (fallbackValue[fk] === undefined) return key;
          fallbackValue = fallbackValue[fk];
        }
        value = fallbackValue;
        break;
      }
      value = value[k];
    }

    if (typeof value !== 'string') return key;

    // Parameter replacement
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = (value as string).replace(`{{${k}}}`, String(v));
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
