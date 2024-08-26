// frontend/src/components/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const orderItems = cart.map(item => ({
        title: item.title,
        qty: item.quantity,
        image: item.coverImage,
        price: item.price,
        book: item._id
      }));

      const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          totalPrice
        },
        config
      );

      clearCart();
      
      // Show success notification
      toast.success('Your order has been placed successfully! Redirecting to continue shopping...');
      
      // Redirect to dashboard after a short delay to allow the toast to be visible
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('An error occurred while placing your order. Please try again.');
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="flex items-center mb-4">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                />
                <div className="flex-grow ml-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold ml-4">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
        <div className="mb-4">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Place Order
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
