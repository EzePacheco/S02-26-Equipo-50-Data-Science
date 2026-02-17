import SaleItem from '../entities/SaleItem.js';
import SaleItemSchema from '../schemas/saleItem.schema.js';

export default (data) => new SaleItem(SaleItemSchema.parse(data));
