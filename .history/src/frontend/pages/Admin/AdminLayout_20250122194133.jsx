import React, { useState } from 'react';
import { Menu, X, Home, Layout, Box, FileText, Trello, ShoppingCart, Mail, Users, Bookmark, Phone, Calendar, Share2 } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-teal-800 text-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`${!sidebarOpen && 'hidden'} text-xl font-bold`}>Riho</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-4">
          <div className="px-4 py-2 text-gray-300 text-sm">GENERAL</div>
          <SidebarItem icon={Home} text="Dashboards" expanded={sidebarOpen} />
          <SidebarItem icon={Layout} text="Widgets" expanded={sidebarOpen} />
          <SidebarItem icon={Box} text="Page Layout" expanded={sidebarOpen} />
          
          <div className="px-4 py-2 mt-4 text-gray-300 text-sm">APPLICATIONS</div>
          <SidebarItem icon={FileText} text="Project" expanded={sidebarOpen} />
          <SidebarItem icon={Trello} text="Kanban Board" expanded={sidebarOpen} />
          <SidebarItem icon={ShoppingCart} text="Ecommerce" expanded={sidebarOpen} />
          <SidebarItem icon={Mail} text="Letter Box" expanded={sidebarOpen} />
          <SidebarItem icon={Users} text="Users" expanded={sidebarOpen} />
          <SidebarItem icon={Bookmark} text="Bookmarks" expanded={sidebarOpen} />
          <SidebarItem icon={Phone} text="Contacts" expanded={sidebarOpen} />
          <SidebarItem icon={Calendar} text="Calendar" expanded={sidebarOpen} />
          <SidebarItem icon={Share2} text="Social App" expanded={sidebarOpen} />
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
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, text, expanded }) => {
  return (
    <div className="px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer">
      <Icon size={20} />
      {expanded && <span className="ml-3">{text}</span>}
    </div>
  );
};

export default AdminLayout;