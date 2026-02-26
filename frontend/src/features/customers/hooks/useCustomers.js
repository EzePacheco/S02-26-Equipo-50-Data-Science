// useCustomers.js
// Custom hook for fetching customers (reads from customers localStorage)

import { useState, useEffect } from 'react';

const CUSTOMERS_STORAGE_KEY = 'customers_data';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useCustomers = (searchQuery = '') => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const stored = loadFromStorage();
    setCustomers(stored);
    setIsLoading(false);
  }, []);

  const filtered = searchQuery
    ? customers.filter((c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : customers;

  return {
    customers: filtered,
    isLoading,
    error: null,
    refetch: async () => {
      const stored = loadFromStorage();
      setCustomers(stored);
    }
  };
};

export default useCustomers;
