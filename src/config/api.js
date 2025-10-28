// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_URL}/api/send-email`,
  HEALTH: `${API_URL}/`
};

