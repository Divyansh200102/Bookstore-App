// frontend/src/components/OrderList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Paid</th>
            <th className="py-2 px-4 border-b">Delivered</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.user.name}</td>
              <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">${order.totalPrice.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                {order.isPaid ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <span className="text-red-500">Not Paid</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {order.isDelivered ? (
                  <span className="text-green-500">Delivered</span>
                ) : (
                  <span className="text-red-500">Not Delivered</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;