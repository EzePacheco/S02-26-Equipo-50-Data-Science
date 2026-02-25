import InventoryService from '../../application/services/InventoryService.js';

describe('InventoryService', () => {
    let inventoryService;
    let mockInventoryRepo;

    beforeEach(() => {
        mockInventoryRepo = {
            finByProductId: jest.fn(),
            update: jest.fn(),
        };

        inventoryService = new InventoryService(mockInventoryRepo);
    });

    test('adjustStock debe llamar al repositorio y guardar los cambios', async () => {
    // Preparar datos falsos
    const fakeInventory = { 
      id: 'uuid-1', 
      productId: 'prod-1', 
      quantity: 10, 
      minStock: 2 
    };
    
    // Configurar el comportamiento del Mock
    mockInventoryRepo.findByProductId.mockResolvedValue(fakeInventory);
    mockInventoryRepo.update.mockResolvedValue({ ...fakeInventory, quantity: 15 });

    // Ejecutar el método del servicio
    const result = await inventoryService.adjustStock('prod-1', 5);

    // Verificar que se llamó al repo y el resultado es correcto
    expect(mockInventoryRepo.findByProductId).toHaveBeenCalledWith('prod-1');
    expect(result.quantity).toBe(15);
    expect(mockInventoryRepo.update).toHaveBeenCalled();
  });

  test('adjustStock debe fallar si el producto no existe', async () => {
    mockInventoryRepo.findByProductId.mockResolvedValue(null);

    await expect(inventoryService.adjustStock('no-existe', 5))
      .rejects.toThrow('Producto no encontrado en inventario');
  });
});