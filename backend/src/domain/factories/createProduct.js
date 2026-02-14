const Product = require('../entities/Product');
const ProductSchema = require('../schemas/product.schema');

module.exports = (data) => new Product(ProductSchema.parse(data));
