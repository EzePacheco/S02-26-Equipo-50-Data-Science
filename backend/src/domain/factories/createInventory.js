import Inventory from '../entities/Inventory.js';
import InventorySchema from '../schemas/inventory.schema.js';

export default (data) => new Inventory(InventorySchema.parse(data));
