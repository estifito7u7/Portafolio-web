// VITE_* values are public browser configuration, never server secrets.
export const contactConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
};
export const isContactConfigured = Object.values(contactConfig).every(Boolean);
