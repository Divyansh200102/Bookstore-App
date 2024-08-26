// frontend/src/components/ShoppingCart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';


const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleDecreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };
  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
                  className="bg-gray-200 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
            onClick={handleCheckout} 
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
