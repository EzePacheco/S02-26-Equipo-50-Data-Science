// useCustomer.js
// Custom hook for fetching a single customer

export const useCustomer = (customerId) => {
  // TODO: Implementar hook de obtención de cliente individual

  return {
    customer: null,
    loading: false,
    error: null,
    refetch: async () => {}
  };
};

export default useCustomer;
