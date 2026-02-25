import Inventory from '../../domain/entities/Inventory.js';

describe('Inventory Entity', () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory({
      id: 'uuid-1',
      productId: 'prod-uuid',
      quantity: 10,
      minStock: 5,
    });
  });

  describe('constructor', () => {
    test('debe crear una instancia con los valores correctos', () => {
      expect(inventory.id).toBe('uuid-1');
      expect(inventory.productId).toBe('prod-uuid');
      expect(inventory.quantity).toBe(10);
      expect(inventory.minStock).toBe(5);
    });

    test('debe asignar minStock por defecto a 0 si es null', () => {
      const inv = new Inventory({ productId: 'p1', quantity: 5, minStock: null });
      expect(inv.minStock).toBe(0);
    });
  });

  describe('increase', () => {
    test('debe aumentar el stock correctamente', () => {
      inventory.increase(5);
      expect(inventory.quantity).toBe(15);
    });

    test('debe lanzar error si el monto es negativo', () => {
      expect(() => inventory.increase(-5)).toThrow('El importe debe ser positivo');
    });

    test('debe lanzar error si el monto es cero', () => {
      expect(() => inventory.increase(0)).toThrow('El importe debe ser positivo');
    });
  });

  describe('decrease', () => {
    test('debe disminuir el stock correctamente', () => {
      inventory.decrease(3);
      expect(inventory.quantity).toBe(7);
    });

    test('debe lanzar error si el monto es negativo', () => {
      expect(() => inventory.decrease(-3)).toThrow('El importe debe ser positivo');
    });

    test('debe lanzar error si el stock es insuficiente', () => {
      expect(() => inventory.decrease(15)).toThrow('Stock insuficiente');
    });

    test('debe permitir reducir a cero', () => {
      inventory.decrease(10);
      expect(inventory.quantity).toBe(0);
    });
  });

  describe('isLowStock', () => {
    test('debe retornar true cuando quantity <= minStock', () => {
      const lowInv = new Inventory({ productId: 'p1', quantity: 3, minStock: 5 });
      expect(lowInv.isLowStock()).toBe(true);
    });

    test('debe retornar false cuando quantity > minStock', () => {
      expect(inventory.isLowStock()).toBe(false);
    });

    test('debe retornar true cuando quantity equals minStock', () => {
      const equalInv = new Inventory({ productId: 'p1', quantity: 5, minStock: 5 });
      expect(equalInv.isLowStock()).toBe(true);
    });
  });

  describe('updateMinStock', () => {
    test('debe actualizar el stock minimo', () => {
      inventory.updateMinStock(10);
      expect(inventory.minStock).toBe(10);
    });

    test('debe lanzar error si el valor es negativo', () => {
      expect(() => inventory.updateMinStock(-1)).toThrow('El stock mínimo no puede ser negativo');
    });

    test('debe permitir valor cero', () => {
      inventory.updateMinStock(0);
      expect(inventory.minStock).toBe(0);
    });
  });
});
