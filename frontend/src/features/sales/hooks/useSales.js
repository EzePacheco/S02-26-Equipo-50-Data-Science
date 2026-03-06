/**
 * useSales.js
 * Hook personalizado para gestionar ventas
 * Conectado a la API del backend
 */

import { useState, useEffect, useCallback } from 'react';
import { salesApi } from '../../sales/api/salesApi';

/**
 * Métodos de pago disponibles
 * @typedef {Object} PaymentMethod
 * @property {string} value - Valor del método
 * @property {string} label - Etiqueta a mostrar
 */

/** @type {PaymentMethod[]} */
export const PAYMENT_METHODS = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'yape', label: 'Yape' },
  { value: 'plin', label: 'Plin' },
];

/**
 * Compara dos fechas para ver si son del mismo día
 * @param {string} dateStr - Fecha en formato string
 * @param {Date} compareDate - Fecha a comparar
 * @returns {boolean} True si son del mismo día
 */
function isSameDay(dateStr, compareDate) {
  const dateToUse = dateStr || '';
  if (!dateToUse) return false;
  const d = new Date(dateToUse);
  return (
    d.getFullYear() === compareDate.getFullYear() &&
    d.getMonth() === compareDate.getMonth() &&
    d.getDate() === compareDate.getDate()
  );
}

/**
 * Hook para gestionar ventas
 * @param {string} [period='today'] - Período de filtro: 'today' o 'all'
 * @returns {Object} Estados y funciones para gestionar ventas
 */
export function useSales(period = 'today') {
  const [allSales, setAllSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPendingAdd, setIsPendingAdd] = useState(false);
  const [isPendingCancel, setIsPendingCancel] = useState(false);
  const [error, setError] = useState(null);

  const fetchSales = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await salesApi.getAll();
      setAllSales(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener ventas:', err);
      setAllSales([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const today = new Date();
  const sales = period === 'today'
    ? allSales.filter((s) => isSameDay(s.createdAt, today) && !s.cancelled)
    : allSales.filter((s) => !s.cancelled);

  const totalSales = sales.reduce((acc, s) => acc + Number(s.totalAmount || s.total_price || 0), 0);

  const addSale = {
    isPending: isPendingAdd,
    mutate: async (saleData) => {
      setIsPendingAdd(true);
      setError(null);
      try {
        const newSale = await salesApi.create(saleData);
        setAllSales((prev) => [newSale, ...prev]);
        return newSale;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsPendingAdd(false);
      }
    },
    mutateAsync: async (saleData) => {
      setIsPendingAdd(true);
      setError(null);
      try {
        const newSale = await salesApi.create(saleData);
        setAllSales((prev) => [newSale, ...prev]);
        return newSale;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsPendingAdd(false);
      }
    },
  };

  const cancelSale = {
    isPending: isPendingCancel,
    mutate: async (saleId) => {
      setIsPendingCancel(true);
      setError(null);
      try {
        const updatedSale = await salesApi.cancel(saleId);
        setAllSales((prev) =>
          prev.map((s) =>
            s.id === saleId
              ? { ...s, cancelled: true, cancelled_at: new Date().toISOString() }
              : s
          )
        );
        return updatedSale;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsPendingCancel(false);
      }
    },
    mutateAsync: async (saleId) => {
      setIsPendingCancel(true);
      setError(null);
      try {
        const updatedSale = await salesApi.cancel(saleId);
        setAllSales((prev) =>
          prev.map((s) =>
            s.id === saleId
              ? { ...s, cancelled: true, cancelled_at: new Date().toISOString() }
              : s
          )
        );
        return updatedSale;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsPendingCancel(false);
      }
    },
  };

  return {
    sales,
    allSales,
    isLoading,
    error,
    totalSales,
    addSale,
    cancelSale,
    refresh: fetchSales,
  };
}

export default useSales;
