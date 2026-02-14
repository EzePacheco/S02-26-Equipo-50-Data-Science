const SaleItem = require('../entities/SaleItem');
const SaleItemSchema = require('../schemas/saleItem.schema');

module.exports = (data) => new SaleItem(SaleItemSchema.parse(data));
