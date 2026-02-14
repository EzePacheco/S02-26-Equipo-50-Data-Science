const Customer = require('../entities/Customer');
const CustomerSchema = require('../schemas/customer.schema');

module.exports = (data) => new Customer(CustomerSchema.parse(data));
