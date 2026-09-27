import { useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from './translations.js';

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
    const handleStorage = (e) => {
      if (!e || e.key === STORAGE_KEY) {
        setLangState(getInitialLanguage());
      }
    };
    const handleCustomLang = (e) => {
      if (e?.detail && (e.detail === 'id' || e.detail === 'en')) {
        setLangState(e.detail);
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('zen_lang_changed', handleCustomLang);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('zen_lang_changed', handleCustomLang);
    };
  }, []);

  const changeLanguage = useCallback((newLang) => {
    setStoredLanguage(newLang);
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zen_lang_changed', { detail: newLang }));
    }
  }, []);

  const t = useMemo(() => translations[lang] || translations.id, [lang]);

  return { lang, changeLanguage, setLang: changeLanguage, t };
}

export function getTranslations(lang = 'id') {
  return translations[lang] || translations.id;
}

