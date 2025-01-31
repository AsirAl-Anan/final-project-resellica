import React, { useContext } from 'react';
import { FileText } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

const AdminDashboard = () => {
  const { admin } = useContext(AuthContext);
  const { counts, productStats, recentUsers, summary } = admin;

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          value={counts.users}
          description={`Including ${counts.admins} admins`}
          bgColor="bg-teal-50"
          textColor="text-teal-600"
        />
        <StatCard
          title="Total Products"
          value={counts.products}
          description={`Across ${counts.categories} categories`}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Total Sellers"
          value={counts.sellers}
          description={`${summary.verifiedSellers} verified sellers`}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          title="Total Money Flow"
          value={`₹${summary.totalMoneyFlow}`}
          description={`${summary.pendingSellers} pending sellers`}
          bgColor="bg-red-50"
          textColor="text-red-600"
        />
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Users</h2>
          <span className="text-sm text-gray-500">Latest registered users</span>
        </div>
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
              <UserRow
                key={user._id}
                username={user.username}
                email={user.email}
                role={user.role}
                points={user.points}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
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

const UserRow = ({ username, email, role, points }) => {
  const getRoleColor = (role) => {
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

  return (
    <tr className="border-b">
      <td className="py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-lg mr-3"></div>
          <div className="font-medium">{username}</div>
        </div>
      </td>
      <td className="text-gray-500">{email}</td>
      <td>
        <span className={`px-3 py-1 rounded-full text-sm ${getRoleColor(role)}`}>
          {role}
        </span>
      </td>
      <td className="text-gray-700">{points}</td>
    </tr>
  );
};

export default AdminDashboard;