import SaleItem from '../../domain/entities/SaleItem.js';

describe('SaleItem Entity', () => {
  describe('constructor', () => {
    test('debe crear instancia con valores correctos', () => {
      const item = new SaleItem({
        productId: 'prod-uuid',
        productName: 'Camisa',
        quantity: 2,
        unitPrice: 50,
      });

      expect(item.productId).toBe('prod-uuid');
      expect(item.productName).toBe('Camisa');
      expect(item.quantity).toBe(2);
      expect(item.unitPrice).toBe(50);
    });

    test('debe convertir unitPrice a numero', () => {
      const item = new SaleItem({
        productId: 'p1',
        productName: 'Pantalón',
        quantity: 1,
        unitPrice: '99.99',
      });

      expect(item.unitPrice).toBe(99.99);
      expect(typeof item.unitPrice).toBe('number');
    });
  });

  describe('subtotal', () => {
    test('debe calcular subtotal correctamente', () => {
      const item = new SaleItem({
        productId: 'p1',
        productName: 'Zapatillas',
        quantity: 3,
        unitPrice: 100,
      });

      expect(item.subtotal).toBe(300);
    });

    test('debe calcular subtotal con decimales', () => {
      const item = new SaleItem({
        productId: 'p1',
        productName: 'Gorra',
        quantity: 2,
        unitPrice: 25.50,
      });

      expect(item.subtotal).toBe(51);
    });

    test('debe manejar cantidad de 1', () => {
      const item = new SaleItem({
        productId: 'p1',
        productName: 'Bufanda',
        quantity: 1,
        unitPrice: 45,
      });

      expect(item.subtotal).toBe(45);
    });
  });
});
