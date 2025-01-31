import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  UserPlus, 
  Mail, 
  ListTodo, 
  Calendar, 
  Star, 
  FileText, 
  RefreshCw, 
  Inbox ,
} from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../../server/utils/axios';

const navigationItems = [
  {
    section: 'GENERAL',
    items: [
      { icon: LayoutDashboard, text: 'Dashboards', path: '/admin' },
      { icon: Users, text: 'Sellers', path: '/admin/sellers' },
      { icon: Users, text: 'Users', path: '/admin/users' },
      { icon: ShoppingBag, text: 'Products', path: '/admin/products' },
      { icon: ShoppingBag, text: 'Categories', path: '/admin/categories' },
      { icon: UserPlus, text: 'Add an admin', path: '/admin/add-admin' },
    ],
  },
  {
    section: 'APPLICATIONS',
    items: [
      { icon: Inbox, text: 'Inbox', path: '/admin/inbox' },
      { icon: Inbox, text: 'Seller Verification', path: '/admin/verify-seller' },
      { icon: Inbox, text: 'Add category', path: '/admin/add-category' },
      { icon: FileText, text: 'Reports', path: '/admin/reports' },
      { icon: RefreshCw, text: 'Refunds', path: '/admin/refunds' },
    ],
  },
];

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { dbUser } = useContext(AuthContext);
  
  useEffect(() => {
    // Check if dbUser exists and has items before accessing index 0
    if ( dbUser?.role !== "admin") {
      navigate('/');
      return;
    }
  }, [dbUser, navigate]); // Added proper dependency array
  const fetchAdminData = async () => { 
  const res = await  api.get('/api/v1/dashboard-stats')
  }
  useEffect(()=>{
    if(dbUser?.role == "admin"){
     
    }
    
  })
  // If dbUser is not yet loaded, show loading state
  if (!dbUser ) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-teal-800 text-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <Link to="/admin" className={`${!sidebarOpen && 'hidden'} text-xl font-bold`}>
           Admin Panel
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-4">
          {navigationItems.map((navSection, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-gray-300 text-sm">{navSection.section}</div>
              {navSection.items.map((item, itemIndex) => (
                <SidebarItem
                  key={itemIndex}
                  icon={item.icon}
                  text={item.text}
                  path={item.path}
                  expanded={sidebarOpen}
                  active={location.pathname === item.path}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{dbUser[0]?.username || 'Admin'}</h1>
            <p className="text-gray-500 text-sm">Here's what's happening with your store today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 border rounded-lg"
            />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>

        <div className="p-6">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, text, path, expanded, active }) => {
  return (
    <Link
      to={path}
      className={`
        px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer
        ${active ? 'bg-teal-700 text-white' : ''}
      `}
    >
      <Icon size={20} />
      {expanded && <span className="ml-3">{text}</span>}
    </Link>
  );
};

export default AdminLayout;