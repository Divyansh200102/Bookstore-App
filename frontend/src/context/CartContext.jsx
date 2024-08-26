// frontend/src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === book._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === bookId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};