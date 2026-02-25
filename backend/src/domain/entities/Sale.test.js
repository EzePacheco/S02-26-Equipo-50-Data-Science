import Sale from '../../domain/entities/Sale.js';

describe('Sale Entity', () => {
  describe('constructor', () => {
    test('debe crear instancia con valores correctos', () => {
      const items = [
        { productId: 'p1', productName: 'Camisa', quantity: 2, unitPrice: 50, subtotal: 100 },
        { productId: 'p2', productName: 'Pantalón', quantity: 1, unitPrice: 80, subtotal: 80 },
      ];

      const sale = new Sale({
        id: 'sale-uuid',
        userId: 'user-uuid',
        customerId: 'customer-uuid',
        items,
      });

      expect(sale.id).toBe('sale-uuid');
      expect(sale.userId).toBe('user-uuid');
      expect(sale.customerId).toBe('customer-uuid');
      expect(sale.items).toEqual(items);
    });

    test('debe permitir customerId como null', () => {
      const sale = new Sale({
        userId: 'user-uuid',
        customerId: null,
        items: [],
      });

      expect(sale.customerId).toBeNull();
    });
  });

  describe('calculateTotal', () => {
    test('debe calcular el total correctamente con multiples items', () => {
      const items = [
        { productId: 'p1', productName: 'Camisa', quantity: 2, unitPrice: 50, subtotal: 100 },
        { productId: 'p2', productName: 'Pantalón', quantity: 1, unitPrice: 80, subtotal: 80 },
        { productId: 'p3', productName: 'Zapatillas', quantity: 1, unitPrice: 120, subtotal: 120 },
      ];

      const sale = new Sale({
        userId: 'user-uuid',
        customerId: null,
        items,
      });

      expect(sale.totalAmount).toBe(300);
    });

    test('debe retornar 0 si no hay items', () => {
      const sale = new Sale({
        userId: 'user-uuid',
        customerId: null,
        items: [],
      });

      expect(sale.totalAmount).toBe(0);
    });

    test('debe calcular correctamente con un solo item', () => {
      const items = [
        { productId: 'p1', productName: 'Camisa', quantity: 1, unitPrice: 100, subtotal: 100 },
      ];

      const sale = new Sale({
        userId: 'user-uuid',
        customerId: null,
        items,
      });

      expect(sale.totalAmount).toBe(100);
    });
  });

  describe('createdAt', () => {
    test('debe asignar createdAt como fecha actual', () => {
      const before = new Date();
      const sale = new Sale({
        userId: 'user-uuid',
        customerId: null,
        items: [],
      });
      const after = new Date();

      expect(sale.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(sale.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});
