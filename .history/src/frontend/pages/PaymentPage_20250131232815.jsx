import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../server/utils/axios';
import { Loader, MapPin, CreditCard } from 'lucide-react';

export default function PaymentPage() {
  const { id } = useParams();
  const productId = id;
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const productResponse = await api.get(`/users/api/v1/get-product/${productId}`);
        if (!productResponse.data || !productResponse.data.data) {
          throw new Error("Invalid product response");
        }
        setProduct(productResponse.data.data.product);

        // Fetch user details
        const userResponse = await api.get('/users/api/v1/get-user-data');
        if (!userResponse.data || !userResponse.data.data) {
          throw new Error("Invalid user response");
        }
        setUser(userResponse.data.data.user);
        console.log("userResponse",userResponse)
        // Fetch address details
        const addressResponse = await api.get(`/users/api/v1/get-address/${userResponse.data.data.user._id}`);
        if (addressResponse.data && addressResponse.data.data) {
          setAddress(addressResponse.data.data.addressLine || '');
        }

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/api/v1/create-payment-intent', {
        productId,
        address,
        userId: user._id,
      });
      const { clientSecret } = response.data;
      navigate('/orders', { state: { clientSecret } });
    } catch (error) {
      setError(error);
    }
  };

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
          <h3 className="text-lg font-semibold">Error Loading Data</h3>
          <p>There was an error loading the data. Please try again later.</p>
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Product Details</h2>
          <p>{product.title}</p>
          <p>Price: ${product.resalePrice}</p>
          <p>Shipping: $10</p>
          <p>Total: ${product.resalePrice + 10}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p>{user.fullName}</p>
          <p>{user.email}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <CreditCard className="mr-2" />
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}