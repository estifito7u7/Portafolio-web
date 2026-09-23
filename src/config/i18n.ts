import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '../../public/locales/es/translation.json';
import en from '../../public/locales/en/translation.json';
// Bundled translations make the initial render independent of network requests.
void i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: 'es',
  fallbackLng: 'es',
  supportedLngs: ['es', 'en'],
  interpolation: { escapeValue: false },
});
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
});
export default i18n;
