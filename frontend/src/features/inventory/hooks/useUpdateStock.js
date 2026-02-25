// useUpdateStock.js
// Custom hook for quick stock updates (+/-)

import { useCallback } from 'react';

/**
 * Hook for quick quantity adjustments on inventory products.
 * Accepts an updateQuantity function from useInventory.
 * @param {Function} updateQuantity - updateQuantity({ id, quantity }) callback
 */
export function useUpdateStock(updateQuantity) {
  const increment = useCallback(
    (id, currentQty) => {
      updateQuantity({ id, quantity: currentQty + 1 });
    },
    [updateQuantity]
  );

  const decrement = useCallback(
    (id, currentQty) => {
      const newQty = Math.max(0, currentQty - 1);
      updateQuantity({ id, quantity: newQty });
    },
    [updateQuantity]
  );

  const set = useCallback(
    (id, quantity) => {
      updateQuantity({ id, quantity: Math.max(0, quantity) });
    },
    [updateQuantity]
  );

  return { increment, decrement, set };
}

export default useUpdateStock;
