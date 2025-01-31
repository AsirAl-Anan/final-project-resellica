import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Layout, Box, FileText, Trello, ShoppingCart, Mail, Users, Bookmark, Phone, Calendar, Share2 } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-teal-800 text-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <Link to="/admin/dashboard" className={`${!sidebarOpen && 'hidden'} text-xl font-bold`}>
            Riho
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-4">
          {/* Hardcoded Navigation Links */}
          <div>
            <div className="px-4 py-2 text-gray-300 text-sm">GENERAL</div>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer ${
                  isActive ? 'bg-teal-700 text-white' : ''
                }`
              }
            >
              <Home size={20} />
              {sidebarOpen && <span className="ml-3">Dashboards</span>}
            </NavLink>
            <NavLink
              to="/admin/widgets"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer ${
                  isActive ? 'bg-teal-700 text-white' : ''
                }`
              }
            >
              <Layout size={20} />
              {sidebarOpen && <span className="ml-3">Widgets</span>}
            </NavLink>
            <NavLink
              to="/admin/page-layout"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer ${
                  isActive ? 'bg-teal-700 text-white' : ''
                }`
              }
            >
              <Box size={20} />
              {sidebarOpen && <span className="ml-3">Page Layout</span>}
            </NavLink>
          </div>

          <div className="mt-4">
            <div className="px-4 py-2 text-gray-300 text-sm">APPLICATIONS</div>
            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer ${
                  isActive ? 'bg-teal-700 text-white' : ''
                }`
              }
            >
              <FileText size={20} />
              {sidebarOpen && <span className="ml-3">Project</span>}
            </NavLink>
            <NavLink
              to="/admin/kanban"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer ${
                  isActive ? 'bg-teal-700 text-white' : ''
                }`
              }
            >
              <Trello size={20} />
              {sidebarOpen && <span className="ml-3">Kanban Board</span>}
            </NavLink>
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer ${
                  isActive ? 'bg-teal-700 text-white' : ''
                }`
              }
              onClick={()=>console.log("clicked")}
            >
              <ShoppingCart size={20} />
              {sidebarOpen && <span className="ml-3">Ecommerce</span>}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Welcome Alex 👋</h1>
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

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
