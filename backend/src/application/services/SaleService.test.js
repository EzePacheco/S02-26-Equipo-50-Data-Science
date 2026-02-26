import SaleService from '../../application/services/SaleService.js';

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
    };

    mockInventoryRepository = {
      findByProductId: jest.fn(),
    };

    saleService = new SaleService(
      mockSaleRepository,
      mockProductRepository,
      mockInventoryRepository,
      null
    );
  });

  describe('createSale', () => {
    const validSaleData = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      customerId: null,
      items: [
        {
          productId: '223e4567-e89b-12d3-a456-426614174001',
          productName: 'Camisa',
          quantity: 2,
          unitPrice: 50,
        },
      ],
    };

    test('debe crear venta exitosamente con stock disponible', async () => {
      const mockProduct = { id: '223e4567-e89b-12d3-a456-426614174001', name: 'Camisa' };
      const mockInventory = { productId: '223e4567-e89b-12d3-a456-426614174001', quantity: 10 };
      const mockSale = {
        id: 'sale-uuid',
        userId: validSaleData.userId,
        customerId: null,
        totalAmount: 100,
        items: validSaleData.items,
      };

      mockProductRepository.findById.mockResolvedValue(mockProduct);
      mockInventoryRepository.findByProductId.mockResolvedValue(mockInventory);
      mockSaleRepository.create.mockResolvedValue(mockSale);

      const result = await saleService.createSale(validSaleData);

      expect(result).toEqual(mockSale);
      expect(mockProductRepository.findById).toHaveBeenCalledWith('223e4567-e89b-12d3-a456-426614174001');
      expect(mockInventoryRepository.findByProductId).toHaveBeenCalledWith('223e4567-e89b-12d3-a456-426614174001');
      expect(mockSaleRepository.create).toHaveBeenCalled();
    });

    test('debe lanzar error si el producto no existe', async () => {
      mockProductRepository.findById.mockResolvedValue(null);

      await expect(saleService.createSale(validSaleData)).rejects.toThrow(
        'Producto con ID 223e4567-e89b-12d3-a456-426614174001 no encontrado'
      );
      expect(mockSaleRepository.create).not.toHaveBeenCalled();
    });

    test('debe lanzar error si no hay stock suficiente', async () => {
      const mockProduct = { id: '223e4567-e89b-12d3-a456-426614174001', name: 'Camisa' };
      const mockInventory = { productId: '223e4567-e89b-12d3-a456-426614174001', quantity: 1 };

      mockProductRepository.findById.mockResolvedValue(mockProduct);
      mockInventoryRepository.findByProductId.mockResolvedValue(mockInventory);

      await expect(saleService.createSale(validSaleData)).rejects.toThrow(
        'Stock insuficiente para el producto Camisa. Disponible: 1'
      );
      expect(mockSaleRepository.create).not.toHaveBeenCalled();
    });

    test('debe lanzar error si el inventario no existe', async () => {
      const mockProduct = { id: '223e4567-e89b-12d3-a456-426614174001', name: 'Camisa' };

      mockProductRepository.findById.mockResolvedValue(mockProduct);
      mockInventoryRepository.findByProductId.mockResolvedValue(null);

      await expect(saleService.createSale(validSaleData)).rejects.toThrow(
        'Stock insuficiente para el producto Camisa. Disponible: 0'
      );
    });

    test('debe validar los datos del DTO', async () => {
      const invalidData = {
        userId: 'invalid-uuid',
        customerId: null,
        items: [],
      };

      await expect(saleService.createSale(invalidData)).rejects.toThrow();
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
