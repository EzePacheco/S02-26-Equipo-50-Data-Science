import InventoryFactory from '../../domain/factories/createInventory.js';

describe('Inventory Domain Logic', () => {
  const inventoryData = {
    id: 'uuid-1',
    productId: 'prod-uuid',
    quantity: 10,
    minStock: 2
  };

  test('Debe permitir aumentar el stock', () => {
    const inventory = InventoryFactory(inventoryData);
    inventory.increase(5);
    expect(inventory.quantity).toBe(15);
  });

  test('Debe permitir disminuir el stock', () => {
    const inventory = InventoryFactory(inventoryData);
    inventory.decrease(5);
    expect(inventory.quantity).toBe(5);
  });

  test('Debe lanzar error si el stock baja de 0 (Validación stock >= 0)', () => {
    const inventory = InventoryFactory(inventoryData);
    // Intentamos quitar 11 teniendo 10
    expect(() => inventory.decrease(11)).toThrow('Stock insuficiente');
  });

  test('Debe lanzar error si el ajuste es un número negativo en los métodos', () => {
    const inventory = InventoryFactory(inventoryData);
    expect(() => inventory.increase(-5)).toThrow('El importe debe ser positivo');
  });
});