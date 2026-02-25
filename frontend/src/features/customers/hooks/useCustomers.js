// useCustomers.js
// Custom hook for fetching customers

export const useCustomers = (searchQuery = '') => {
  // TODO: Implementar hook de obtención de clientes

  return {
    customers: [],
    loading: false,
    error: null,
    refetch: async () => {}
  };
};

export default useCustomers;
