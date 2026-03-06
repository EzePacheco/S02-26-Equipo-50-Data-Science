import CreateSaleDTO from './CreateSaleDTO.js';
import ValidationError from '../../domain/errors/ValidationError.js';

describe('CreateSaleDTO', () => {
  describe('constructor', () => {
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';

    test('debe crear instancia con valores correctos', () => {
      const items = [
        { variantId: validUUID, productName: 'Camisa', quantity: 2, unitPrice: 50 },
        { variantId: '223e4567-e89b-12d3-a456-426614174001', productName: 'Pantalón', quantity: 1, unitPrice: 80 },
      ];

      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: validUUID,
        items,
      });

      expect(dto.userId).toBe(validUUID);
      expect(dto.customerId).toBe(validUUID);
      expect(dto.items).toEqual(items);
    });

    test('debe permitir customerId como null', () => {
      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: null,
        items: [{ variantId: validUUID, productName: 'Camisa', quantity: 1, unitPrice: 50 }],
      });

      expect(dto.customerId).toBeNull();
    });
  });

  describe('calculateTotal', () => {
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';

    test('debe calcular el total correctamente', () => {
      const items = [
        { variantId: validUUID, productName: 'Camisa', quantity: 2, unitPrice: 50 },
        { variantId: '223e4567-e89b-12d3-a456-426614174001', productName: 'Pantalón', quantity: 1, unitPrice: 80 },
      ];

      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: null,
        items,
      });

      expect(dto.totalAmount).toBe(180);
    });

    // El caso de items vacíos ya está probado en Sale.test.js
    // ya que CreateSaleDTO valida antes de calcular
  });

  describe('validate', () => {
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';
    const validProductUUID = '223e4567-e89b-12d3-a456-426614174001';

    test('debe pasar validacion con datos correctos', () => {
      const items = [
        { variantId: validProductUUID, productName: 'Camisa', quantity: 2, unitPrice: 50 },
      ];

      const dto = new CreateSaleDTO({
        userId: validUUID,
        customerId: null,
        items,
      });

      expect(() => dto.validate()).not.toThrow();
    });

    test('debe lanzar error si userId es invalido', () => {
      expect(() => {
        new CreateSaleDTO({
          userId: 'invalid-uuid',
          customerId: null,
          items: [{ variantId: validProductUUID, productName: 'Camisa', quantity: 1, unitPrice: 50 }],
        });
      }).toThrow(ValidationError);
    });

    test('debe lanzar error si el array de items esta vacio', () => {
      expect(() => {
        new CreateSaleDTO({
          userId: validUUID,
          customerId: null,
          items: [],
        });
      }).toThrow(ValidationError);
    });

    test('debe lanzar error si quantity no es positiva', () => {
      expect(() => {
        new CreateSaleDTO({
          userId: validUUID,
          customerId: null,
          items: [{ variantId: validProductUUID, productName: 'Camisa', quantity: 0, unitPrice: 50 }],
        });
      }).toThrow(ValidationError);
    });

    test('debe lanzar error si unitPrice no es positivo', () => {
      expect(() => {
        new CreateSaleDTO({
          userId: validUUID,
          customerId: null,
          items: [{ variantId: validProductUUID, productName: 'Camisa', quantity: 1, unitPrice: -50 }],
        });
      }).toThrow(ValidationError);
    });
  });
});
