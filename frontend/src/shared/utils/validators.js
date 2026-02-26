// validators.js
// Shared validation functions

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (digits only)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Validate required field
 * @param {*} value
 * @returns {boolean}
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate positive number
 * @param {number} value
 * @returns {boolean}
 */
export const isPositiveNumber = (value) => {
  return typeof value === 'number' && value > 0;
};

/**
 * Validate SKU format
 * @param {string} sku
 * @returns {boolean}
 */
export const isValidSKU = (sku) => {
  // TODO: Definir reglas de formato de SKU
  return sku && sku.length >= 3;
};
