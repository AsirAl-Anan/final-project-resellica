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