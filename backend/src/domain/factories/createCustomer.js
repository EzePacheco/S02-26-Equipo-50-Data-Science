import Customer from'../entities/Customer.js';
import CustomerSchema from '../schemas/customer.schema.js';

export default (data) => new Customer(CustomerSchema.parse(data));
