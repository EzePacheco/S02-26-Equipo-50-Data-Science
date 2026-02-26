// product.types.js
// JSDoc types for Products

/**
 * @typedef {'ROPA' | 'CALZADO'} ProductCategory
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} sku
 * @property {number} price
 * @property {ProductCategory} category
 * @property {boolean} active
 * @property {Inventory|null} inventory
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Inventory
 * @property {string} id
 * @property {string} productId
 * @property {number} quantity
 * @property {number|null} minStock
 */

export {};
