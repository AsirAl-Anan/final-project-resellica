import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../server/utils/axios.js';
import { Loader, Package, CheckCircle, XCircle } from 'lucide-react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { clientSecret } = location.state || {};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/users/api/v1/get-transactions');
        setOrders(response.data.transactions);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <h3 className="text-lg font-semibold">Error Loading Orders</h3>
          <p>There was an error loading the orders. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{order.productId.title}</h2>
                <p>Price: ${order.price}</p>
                <p>Shipping: ${order.shippingCharge}</p>
                <p>Total: ${order.totalCost}</p>
                <p>Address: {order.deliveryAddress}</p>
              </div>
              <div>
                {order.status === 'completed' ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}