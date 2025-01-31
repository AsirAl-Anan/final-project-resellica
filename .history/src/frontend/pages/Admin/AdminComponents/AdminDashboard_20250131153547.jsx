import React from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AdminDashboard = ({ dashboardData }) => {
  const { 
    counts,
    recentUsers,
    productStats,
    summary,
    transactionStats
  } = dashboardData;

  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={counts.users}
          description="Active platform users"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          title="Total Products"
          value={counts.products}
          description={`Across ${counts.categories} categories`}
          bgColor="bg-teal-50"
          textColor="text-teal-600"
        />
        <StatCard
          title="Total Sellers"
          value={counts.sellers}
          description={`${summary.verifiedSellers} verified, ${summary.pendingSellers} pending`}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${summary.totalMoneyFlow.toLocaleString()}`}
          description="Lifetime transactions"
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
      </div>

      {/* Recent Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Points</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-4">{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
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

const getRoleBadgeColor = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    case 'seller':
      return 'bg-blue-100 text-blue-800';
    case 'user':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default AdminDashboard;