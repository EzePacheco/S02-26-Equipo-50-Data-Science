// useProduct.js
// Custom hook for fetching a single product

export const useProduct = (productId) => {
  // TODO: Implementar hook de obtención de producto individual

  return {
    product: null,
    loading: false,
    error: null,
    refetch: async () => {}
  };
};

export default useProduct;
