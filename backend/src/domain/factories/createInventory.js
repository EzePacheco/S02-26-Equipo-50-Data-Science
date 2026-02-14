const Inventory = require('../entities/Inventory');
const InventorySchema = require('../schemas/inventory.schema');

module.exports = (data) => new Inventory(InventorySchema.parse(data));
