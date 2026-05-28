/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react';
import { storageKeys } from '../utils/constants.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage(storageKeys.cart, []);
  const [orders, setOrders] = useLocalStorage(storageKeys.orders, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand,
          quantity,
        },
      ];
    });
  }, [setItems]);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, [setItems]);

  const removeFromCart = useCallback((productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const cartSummary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
    const tax = subtotal * 0.08;

    return {
      totalItems,
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
    };
  }, [items]);

  const placeOrder = useCallback((details) => {
    const order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'Placed',
      items,
      summary: cartSummary,
      details,
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setItems([]);
    return order;
  }, [cartSummary, items, setItems, setOrders]);

  const cancelOrder = useCallback((orderId) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: 'Cancelled', cancelledAt: new Date().toISOString() }
          : order,
      ),
    );
  }, [setOrders]);

  const value = useMemo(
    () => ({
      items,
      orders,
      orderCount: orders.length,
      ...cartSummary,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      cancelOrder,
    }),
    [items, orders, cartSummary, addToCart, updateQuantity, removeFromCart, clearCart, placeOrder, cancelOrder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
