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
    <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold font-serif text-gray-900 mb-8">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 bg-blue-100 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
            </div>
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center mb-6 last:mb-0">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-md shadow-md"
                      />
                      <div className="flex-grow ml-4">
                        <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-2xl font-bold text-gray-800 text-right">Total: ${total.toFixed(2)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-100 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Shipping Address</h3>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Payment Method</h3>
            </div>
            <div className="p-6">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
              </select>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
