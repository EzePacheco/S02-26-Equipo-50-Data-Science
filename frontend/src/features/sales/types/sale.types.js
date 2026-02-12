// sale.types.js
// TypeScript types for Sales (JSDoc for JavaScript)

/**
 * @typedef {Object} Sale
 * @property {string} id
 * @property {string} userId
 * @property {string|null} customerId
 * @property {number} totalAmount
 * @property {SaleItem[]} items
 * @property {string} createdAt
 */

/**
 * @typedef {Object} SaleItem
 * @property {string} id
 * @property {string} saleId
 * @property {string} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} subtotal
 */

/**
 * @typedef {Object} CreateSaleDTO
 * @property {string} userId
 * @property {string|null} [customerId]
 * @property {Array<{productId: string, quantity: number}>} items
 */

export {};
