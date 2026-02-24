/**
 * Combina múltiples clases de CSS de forma condicional
 * Similar a clsx o classnames
 * @param {...(string|undefined|null|false)} classes - Clases a combinar
 * @returns {string} - String con las clases combinadas
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default cn;