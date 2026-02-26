// useCustomers.js
// Custom hook for fetching customers - connected to backend API

import { useState, useEffect, useCallback } from 'react';
import { customersApi } from '../api/customersApi';

export const useCustomers = (searchQuery = '') => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = searchQuery 
        ? await customersApi.search(searchQuery)
        : await customersApi.getAll();
      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching customers:', err);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const addCustomer = useCallback(async (customerData) => {
    setError(null);
    try {
      const newCustomer = await customersApi.create(customerData);
      setCustomers((prev) => [newCustomer, ...prev]);
      return newCustomer;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateCustomer = useCallback(async (id, customerData) => {
    setError(null);
    try {
      const updated = await customersApi.update(id, customerData);
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteCustomer = useCallback(async (id) => {
    setError(null);
    try {
      await customersApi.delete(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    customers,
    isLoading,
    error,
    refetch: fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomers;
