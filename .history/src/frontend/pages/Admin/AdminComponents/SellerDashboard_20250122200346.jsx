import React from 'react';
import { FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import AdminLayout from '../AdminLayout';

const salesData = [
  { month: 'Jan', revenue: 3000, orders: 2000 },
  { month: 'Feb', revenue: 4000, orders: 3000 },
  // ... rest of the sales data
];

const Dashboard = () => {
    return (
     
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sales Chart</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm border rounded">Online Store</button>
              <button className="px-4 py-2 text-sm border rounded">Last Year</button>
            </div>
          </div>
          <LineChart width={800} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#2dd4bf" />
            <Line type="monotone" dataKey="orders" stroke="#fbbf24" />
          </LineChart>
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Sales"
            value="₹98,459"
            description="We have sale +18.2k this week."
            bgColor="bg-teal-50"
            textColor="text-teal-600"
          />
          <StatCard
            title="Total Visitors"
            value="54,156"
            description="We have total +3.5k visitors..."
            bgColor="bg-yellow-50"
            textColor="text-yellow-600"
          />
          <StatCard
            title="Total Orders"
            value="5,125"
            description="We have total +5k orders this..."
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            title="Refunded"
            value="₹20,000"
            description="We got +66k refund this..."
            bgColor="bg-red-50"
            textColor="text-red-600"
          />
        </div>
  
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Latest Orders</h2>
            <span className="text-sm text-gray-500">Data updates in every 3 hours</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Billing Name</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <OrderRow
                id="4859578"
                product="Winter Jacket"
                name="Amit Shah"
                email="amith14@gmail.com"
                status="Delivered"
              />
              <OrderRow
                id="4875566"
                product="Casual Trousers"
                name="Arlene McCoy"
                email="arlene1@gmail.com"
                status="Shipped"
              />
              <OrderRow
                id="7894561"
                product="Silk Saree"
                name="Marvin McKinney"
                email="marvin4@gmail.com"
                status="Processing"
              />
            </tbody>
          </table>
        </div>
     
    );
  };
  
  const StatCard = ({ title, value, description, bgColor, textColor }) => {
    return (
      <div className={`${bgColor} p-4 rounded-lg`}>
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className={`${textColor} text-2xl font-bold mt-2`}>{value}</div>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
    );
  };
  
  const OrderRow = ({ id, product, name, email, status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'bg-green-100 text-green-800';
        case 'shipped':
          return 'bg-yellow-100 text-yellow-800';
        case 'processing':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <tr className="border-b">
        <td className="py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-lg mr-3"></div>
            <div>
              <div>{product}</div>
              <div className="text-sm text-gray-500">ID: {id}</div>
            </div>
          </div>
        </td>
        <td>
          <div>{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </td>
        <td>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
            {status}
          </span>
        </td>
        <td>
          <button className="text-gray-500 hover:text-gray-700">
            <FileText size={20} />
          </button>
        </td>
      </tr>
    );
  };
  
  export default Dashboard;