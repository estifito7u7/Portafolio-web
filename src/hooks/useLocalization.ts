import { useTranslation } from 'react-i18next';
export function useLanguage() {
  const { t, i18n } = useTranslation();
  return {
    t: (key: string) => t(key),
    changeLanguage: (language: string) => {
      if (language === 'es' || language === 'en') void i18n.changeLanguage(language);
    },
  };
}
