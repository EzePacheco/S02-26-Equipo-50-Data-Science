// useProducts.js
// Custom hook for fetching products

export const useProducts = (filters = {}) => {
  // TODO: Implementar hook de obtención de productos
  // - Obtener productos con filtros
  // - Manejar estados de carga y error

  return {
    products: [],
    loading: false,
    error: null,
    refetch: async () => {}
  };
};

export default useProducts;
