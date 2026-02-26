import CreateSaleDTO from '../../application/dto/CreateSaleDTO.js';

describe('CreateSaleDTO', () => {
  describe('constructor', () => {
    test('debe crear instancia con valores correctos', () => {
      const items = [
        { productId: 'p1', productName: 'Camisa', quantity: 2, unitPrice: 50 },
        { productId: 'p2', productName: 'Pantalón', quantity: 1, unitPrice: 80 },
      ];

      const dto = new CreateSaleDTO({
        userId: 'user-uuid',
        customerId: 'customer-uuid',
        items,
      });

      expect(dto.userId).toBe('user-uuid');
      expect(dto.customerId).toBe('customer-uuid');
      expect(dto.items).toEqual(items);
    });

    test('debe permitir customerId como null', () => {
      const dto = new CreateSaleDTO({
        userId: 'user-uuid',
        customerId: null,
        items: [{ productId: 'p1', productName: 'Camisa', quantity: 1, unitPrice: 50 }],
      });

      expect(dto.customerId).toBeNull();
    });
  });

  describe('calculateTotal', () => {
    test('debe calcular el total correctamente', () => {
      const items = [
        { productId: 'p1', productName: 'Camisa', quantity: 2, unitPrice: 50 },
        { productId: 'p2', productName: 'Pantalón', quantity: 1, unitPrice: 80 },
      ];

      const dto = new CreateSaleDTO({
        userId: 'user-uuid',
        customerId: null,
        items,
      });

      expect(dto.totalAmount).toBe(180);
    });

    test('debe retornar 0 si no hay items', () => {
      const dto = new CreateSaleDTO({
        userId: 'user-uuid',
        customerId: null,
        items: [],
      });

      expect(dto.totalAmount).toBe(0);
    });
  });

  describe('validate', () => {
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';
    const validProductUUID = '223e4567-e89b-12d3-a456-426614174001';

    test('debe pasar validacion con datos correctos', () => {
      const items = [
        { productId: validProductUUID, productName: 'Camisa', quantity: 2, unitPrice: 50 },
      ];

      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: null,
        items,
      });

      expect(() => dto.validate()).not.toThrow();
    });

    test('debe lanzar error si userId es invalido', () => {
      const dto = new CreateSaleDTO({
        userId: 'invalid-uuid',
        customerId: null,
        items: [{ productId: validProductUUID, productName: 'Camisa', quantity: 1, unitPrice: 50 }],
      });

      expect(() => dto.validate()).toThrow();
    });

    test('debe lanzar error si el array de items esta vacio', () => {
      const dto = new CreateSaleDTO({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        customerId: null,
        items: [],
      });

      expect(() => dto.validate()).toThrow();
    });

    test('debe lanzar error si quantity no es positiva', () => {
      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: null,
        items: [{ productId: validProductUUID, productName: 'Camisa', quantity: 0, unitPrice: 50 }],
      });

      expect(() => dto.validate()).toThrow();
    });

    test('debe lanzar error si unitPrice no es positivo', () => {
      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: null,
        items: [{ productId: validProductUUID, productName: 'Camisa', quantity: 1, unitPrice: -50 }],
      });

      expect(() => dto.validate()).toThrow();
    });
  });
});
