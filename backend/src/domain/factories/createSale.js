const Sale = require('../entities/Sale');
const SaleSchema = require('../schemas/sale.schema');

module.exports = (data) => {
  const validatedData = SaleSchema.parse(data);
  return new Sale(validatedData);
};
