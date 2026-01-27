import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useAPI'; // Use your custom hook

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const { callApi, loading, error } = useApi();

  const fetchOrders = async () => {
    try {
      const role = localStorage.getItem("userRole");
      const endpoint = role === "admin" ? "/api/orders/all" : "/api/orders/seller-orders";

      const res = await callApi("GET", endpoint);
      // Both endpoints now return { data: [...] }
      setOrders(res.data || []);
    } catch (err) {
      // Error is handled by the useApi state
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading orders...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Order Management</h2>

      <div style={{
        backgroundColor: '#d9d9d9',
        borderRadius: '20px',
        padding: '30px',
        minHeight: '400px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
      }}>
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No orders found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #aaa' }}>
                <th style={{ padding: '10px' }}>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #ccc' }}>
                  {/* Since you are using UUID in your Order model, slice it for display */}
                  <td style={{ padding: '15px' }}>#{order.id.slice(0, 5)}</td>
                  {/* Uses the username from the User model you provided */}
                  <td>{order.buyer?.username || "Guest"}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>Rs. {order.totalPrice}</td>
                  <td>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '10px',
                      backgroundColor: order.status === 'Delivered' ? '#c6f6d5' : '#fefcbf',
                      color: order.status === 'Delivered' ? '#22543d' : '#744210'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => alert(`Viewing details for order ${order.id}`)}
                      style={{ color: '#3182ce', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;