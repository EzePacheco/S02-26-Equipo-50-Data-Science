// useInventory.js
// Custom hook for managing inventory - connected to backend API

import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../products/api/productsApi';
import { inventoryApi } from '../inventory/api/inventoryApi';

export const CATEGORIES = ['ROPA', 'CALZADO'];

export function getStockStatus(quantity) {
  if (quantity === 0) return 'critical';
  if (quantity < 3) return 'critical';
  if (quantity < 10) return 'medium';
  return 'good';
}

export function useInventory(categoryFilter = 'todos') {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, inventoryData] = await Promise.all([
        productsApi.getAll(),
        inventoryApi.getAll(),
      ]);

      const inventoryMap = {};
      inventoryData.forEach(inv => {
        inventoryMap[inv.productId] = inv;
      });

      const productsWithInventory = productsData.map(product => ({
        ...product,
        inventory: inventoryMap[product.id] || { quantity: 0, minStock: null },
      }));

      setProducts(productsWithInventory);
      setInventory(inventoryData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching inventory:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts = categoryFilter === 'todos'
    ? products
    : products.filter((p) => p.category === categoryFilter);

  const addProduct = useCallback(async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { initialStock, minStock, ...rest } = productData;
      const newProduct = await productsApi.create({
        ...rest,
        initialStock: initialStock || 0,
        minStock: minStock || null,
      });
      
      await fetchData();
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  const updateProduct = useCallback(async (id, productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await productsApi.update(id, productData);
      await fetchData();
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  const deleteProduct = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await productsApi.delete(id);
      await fetchData();
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    setError(null);
    try {
      await inventoryApi.updateStock(productId, quantity);
      await fetchData();
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchData]);

  const adjustQuantity = useCallback(async (productId, adjustment) => {
    setError(null);
    try {
      await inventoryApi.adjustStock(productId, adjustment);
      await fetchData();
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchData]);

  const getLowStockItems = useCallback(async () => {
    try {
      return await inventoryApi.getLowStock();
    } catch (err) {
      console.error('Error fetching low stock:', err);
      return [];
    }
  }, []);

  return {
    products: filteredProducts,
    allProducts: products,
    inventory,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    updateQuantity,
    adjustQuantity,
    getLowStockItems,
    refresh: fetchData,
  };
}

export default useInventory;
