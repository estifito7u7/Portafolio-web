import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // Cargar traducciones desde archivos JSON
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Integración con React
  .init({
    lng: "es", // Establece un idioma fijo para pruebas
    fallbackLng: "es", // Idioma de respaldo si no se detecta el idioma
    supportedLngs: ["en", "es"], // Idiomas soportados
    debug: false,
    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Ruta a los archivos JSON
    },
  }, (err) => {
    if (err) return console.log(err);
  });

export default i18n;