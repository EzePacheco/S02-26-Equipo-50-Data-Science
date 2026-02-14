import Product from '../entities/Product.js';
import ProductSchema from '../schemas/product.schema.js';

export default (data) => new Product(ProductSchema.parse(data));
