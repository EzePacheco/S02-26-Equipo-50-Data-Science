import SaleService from '../../application/services/SaleService.js';
import ValidationError from '../../domain/errors/ValidationError.js';

describe('SaleService', () => {
  let saleService;
  let mockSaleRepository;
  let mockProductRepository;
  let mockInventoryRepository;

  beforeEach(() => {
    mockSaleRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      findByCustomerId: jest.fn(),
      findByDateRange: jest.fn(),
    };

    mockProductRepository = {
      findById: jest.fn(),
      findVariantById: jest.fn(),
    };

    mockInventoryRepository = {
      findById: jest.fn(),
    };

    saleService = new SaleService(
      mockSaleRepository,
      mockProductRepository,
      mockInventoryRepository,
      null
    );
  });

  describe('createSale', () => {
    const validUserId = '123e4567-e89b-12d3-a456-426614174000';
    const validVariantId = '223e4567-e89b-12d3-a456-426614174001';

    const validSaleData = {
      userId: validUserId,
      customerId: null,
      items: [
        {
          variantId: validVariantId,
          productName: 'Camisa',
          quantity: 2,
          unitPrice: 50,
        },
      ],
    };

    test('debe crear venta exitosamente con stock disponible', async () => {
      const mockVariant = { id: validVariantId, name: 'Camisa' };
      const mockInventory = { variantId: validVariantId, stock: 10 };
      const mockSale = {
        id: '323e4567-e89b-12d3-a456-426614174002',
        userId: validSaleData.userId,
        customerId: null,
        totalAmount: 100,
        items: validSaleData.items,
      };

      mockProductRepository.findVariantById.mockResolvedValue(mockVariant);
      mockInventoryRepository.findById.mockResolvedValue(mockInventory);
      mockSaleRepository.create.mockResolvedValue(mockSale);

      const result = await saleService.createSale(validSaleData);

      expect(result).toEqual(mockSale);
      expect(mockProductRepository.findVariantById).toHaveBeenCalledWith(validVariantId);
      expect(mockInventoryRepository.findById).toHaveBeenCalledWith(validVariantId);
      expect(mockSaleRepository.create).toHaveBeenCalled();
    });

    test('debe lanzar error si el producto no existe', async () => {
      mockProductRepository.findVariantById.mockResolvedValue(null);

      await expect(saleService.createSale(validSaleData)).rejects.toThrow(
        `Variante con ID ${validVariantId} no encontrada`
      );
      expect(mockSaleRepository.create).not.toHaveBeenCalled();
    });

    test('debe lanzar error si no hay stock suficiente', async () => {
      const mockVariant = { id: validVariantId, name: 'Camisa' };
      const mockInventory = { variantId: validVariantId, stock: 1 };

      mockProductRepository.findVariantById.mockResolvedValue(mockVariant);
      mockInventoryRepository.findById.mockResolvedValue(mockInventory);

      await expect(saleService.createSale(validSaleData)).rejects.toThrow(
        'Stock insuficiente para la variante Camisa. Disponible: 1'
      );
      expect(mockSaleRepository.create).not.toHaveBeenCalled();
    });

    test('debe lanzar error si el inventario no existe', async () => {
      const mockVariant = { id: validVariantId, name: 'Camisa' };

      mockProductRepository.findVariantById.mockResolvedValue(mockVariant);
      mockInventoryRepository.findById.mockResolvedValue(null);

      await expect(saleService.createSale(validSaleData)).rejects.toThrow(
        'Stock insuficiente para la variante Camisa. Disponible: 0'
      );
    });

    test('debe validar los datos del DTO', async () => {
      const invalidData = {
        userId: 'invalid-uuid',
        customerId: null,
        items: [],
      };

      await expect(saleService.createSale(invalidData)).rejects.toThrow(ValidationError);
    });
  });

  describe('getSaleById', () => {
    test('debe obtener una venta por ID', async () => {
      const mockSale = { id: 'sale-uuid', userId: 'user-uuid' };
      mockSaleRepository.findById.mockResolvedValue(mockSale);

      const result = await saleService.getSaleById('sale-uuid');

      expect(result).toEqual(mockSale);
      expect(mockSaleRepository.findById).toHaveBeenCalledWith('sale-uuid');
    });

    test('debe retornar null si la venta no existe', async () => {
      mockSaleRepository.findById.mockResolvedValue(null);

      const result = await saleService.getSaleById('no-existe');

      expect(result).toBeNull();
    });
  });

  describe('getAllSales', () => {
    test('debe obtener todas las ventas', async () => {
      const mockSales = [{ id: 'sale-1' }, { id: 'sale-2' }];
      mockSaleRepository.findAll.mockResolvedValue(mockSales);

      const result = await saleService.getAllSales();

      expect(result).toEqual(mockSales);
      expect(mockSaleRepository.findAll).toHaveBeenCalled();
    });
  });
});
