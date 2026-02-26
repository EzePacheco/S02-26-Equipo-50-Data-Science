// formatters.js
// Shared utility functions for formatting

/**
 * Formatea un número como moneda peruana
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `S/ ${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
/**
 * Determina el estado del stock de un producto
 * @param {number} stock - Stock actual
 * @param {number} minStock - Stock mínimo
 * @returns {string} - 'critical', 'warning', 'good'
 */
export function getStockStatus(stock, minStock = 10) {
  if (stock === 0) return 'critical';
  if (stock < 3) return 'critical';
  if (stock < minStock) return 'warning';
  return 'good';
};
/**
 * Formatea una fecha completa
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date with time
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format phone number
 * @param {string} phone
 * @returns {string}
 */
export const formatPhone = (phone) => {
  // TODO: Implementar formateo de teléfono
  // Ejemplo: 1234567890 -> (123) 456-7890
  return phone;
};

/**
 * Obtiene la etiqueta legible de un método de pago
 * @param {string} method - Método de pago ('efectivo', 'yape', 'plin', 'tarjeta')
 * @returns {string} - Etiqueta formateada
 */
export function getPaymentMethodLabel(method) {
  const labels = {
    efectivo: 'Efectivo',
    yape: 'Yape',
    plin: 'Plin',
    tarjeta: 'Tarjeta',
  };
  return labels[method?.toLowerCase()] || method || 'Desconocido';
};


/**
 * Formatea una fecha como tiempo relativo
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Tiempo relativo (ej: "Hace 5 min", "Hace 2 h")
 */
export function formatRelativeDate(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;
  
  // Formatear fecha exacta si es muy antigua
  return past.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
}



/**
 * Formatea un número como porcentaje
 * @param {number} value - Valor a formatear
 * @param {number} decimals - Decimales a mostrar
 * @returns {string} - Porcentaje formateado (ej: "12.5%")
 */
export function formatPercent(value, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}