// useSales.js
// Custom hook for managing sales with localStorage persistence

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sales_data';

export const PAYMENT_METHODS = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'yape', label: 'Yape' },
  { value: 'plin', label: 'Plin' },
];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(sales) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
}

function isSameDay(dateStr, compareDate) {
  const d = new Date(dateStr);
  return (
    d.getFullYear() === compareDate.getFullYear() &&
    d.getMonth() === compareDate.getMonth() &&
    d.getDate() === compareDate.getDate()
  );
}

export function useSales(period = 'today') {
  const [allSales, setAllSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPendingAdd, setIsPendingAdd] = useState(false);
  const [isPendingCancel, setIsPendingCancel] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const stored = loadFromStorage();
    setAllSales(stored);
    setIsLoading(false);
  }, []);

  // Filter sales by period
  const today = new Date();
  const sales =
    period === 'today'
      ? allSales.filter((s) => isSameDay(s.created_at, today) && !s.cancelled)
      : allSales.filter((s) => !s.cancelled);

  const totalSales = sales.reduce((acc, s) => acc + Number(s.total_price), 0);

  const addSale = {
    isPending: isPendingAdd,
    mutate: useCallback((saleData) => {
      setIsPendingAdd(true);
      const newSale = {
        ...saleData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        cancelled: false,
      };
      setAllSales((prev) => {
        const updated = [newSale, ...prev];
        saveToStorage(updated);
        return updated;
      });
      setIsPendingAdd(false);
    }, []),
  };

  const cancelSale = {
    isPending: isPendingCancel,
    mutate: useCallback((saleId) => {
      setIsPendingCancel(true);
      setAllSales((prev) => {
        const updated = prev.map((s) =>
          s.id === saleId
            ? { ...s, cancelled: true, cancelled_at: new Date().toISOString() }
            : s
        );
        saveToStorage(updated);
        return updated;
      });
      setIsPendingCancel(false);
    }, []),
  };

  return {
    sales,
    allSales,
    isLoading,
    totalSales,
    addSale,
    cancelSale,
  };
}

export default useSales;
