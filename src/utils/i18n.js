import { useState, useEffect } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'zen_clock_lang';

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'id';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
    const browserLang = (navigator.language || '').toLowerCase();
    return browserLang.startsWith('id') ? 'id' : 'en';
  } catch (e) {
    return 'id';
  }
};

export const setStoredLanguage = (lang) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // ignore
  }
};

export function useLanguage() {
  const [lang, setLangState] = useState(getInitialLanguage);

  useEffect(() => {
    const handleStorage = () => {
      setLangState(getInitialLanguage());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const changeLanguage = (newLang) => {
    setStoredLanguage(newLang);
    setLangState(newLang);
  };

  const t = translations[lang] || translations.id;

  return { lang, changeLanguage, t };
}
