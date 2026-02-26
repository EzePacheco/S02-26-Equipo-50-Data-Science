// useInventory.js
// Custom hook for managing inventory (products) with localStorage mock

import { useState, useEffect, useCallback } from 'react';
import { PRODUCT_CATEGORIES } from '../../../shared/utils/constants';

const STORAGE_KEY = 'inventory_products';

export const CATEGORIES = Object.values(PRODUCT_CATEGORIES);

export function getStockStatus(quantity) {
  if (quantity === 0) return 'critical';
  if (quantity < 3) return 'critical';
  if (quantity < 10) return 'medium';
  return 'good';
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function useInventory(categoryFilter = 'todos') {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from storage on mount
  useEffect(() => {
    setIsLoading(true);
    const stored = loadFromStorage();
    setAllProducts(stored);
    setIsLoading(false);
  }, []);

  // Filter by category
  const products =
    categoryFilter === 'todos'
      ? allProducts
      : allProducts.filter((p) => p.category === categoryFilter);

  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    setAllProducts((prev) => {
      const updated = [...prev, newProduct];
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const updateProduct = useCallback(({ id, ...data }) => {
    setAllProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p
      );
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setAllProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback(({ id, quantity }) => {
    setAllProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, quantity, updated_at: new Date().toISOString() } : p
      );
      saveToStorage(updated);
      return updated;
    });
  }, []);

  return {
    products,
    allProducts,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateQuantity,
  };
}

export default useInventory;
