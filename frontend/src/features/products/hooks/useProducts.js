// useProducts.js
// Custom hook for fetching products (reads from inventory localStorage)

import { useState, useEffect } from 'react';

const INVENTORY_STORAGE_KEY = 'inventory_products';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const stored = loadFromStorage();
    setProducts(stored);
    setIsLoading(false);
  }, []);

  return {
    products,
    isLoading,
    error: null,
    refetch: async () => {
      const stored = loadFromStorage();
      setProducts(stored);
    }
  };
};

export default useProducts;
