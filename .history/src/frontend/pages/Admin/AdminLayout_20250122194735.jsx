import React, { useState } from 'react';
import { Menu, X, Home, Layout, Box, FileText, Trello, ShoppingCart, Mail, Users, Bookmark, Phone, Calendar, Share2 } from 'lucide-react';

// Navigation config
const navigationItems = [
  {
    section: 'GENERAL',
    items: [
      { icon: Home, text: 'Dashboards', href: '/admin/dashboard' },
      { icon: Layout, text: 'Widgets', href: '/admin/widgets' },
      { icon: Box, text: 'Page Layout', href: '/admin/page-layout' },
    ],
  },
  {
    section: 'APPLICATIONS',
    items: [
      { icon: FileText, text: 'Project', href: '/admin/projects' },
      { icon: Trello, text: 'Kanban Board', href: '/admin/kanban' },
      { icon: ShoppingCart, text: 'Ecommerce', href: '/admin/ecommerce' },
      { icon: Mail, text: 'Letter Box', href: '/admin/mail' },
      { icon: Users, text: 'Users', href: '/admin/users' },
      { icon: Bookmark, text: 'Bookmarks', href: '/admin/bookmarks' },
      { icon: Phone, text: 'Contacts', href: '/admin/contacts' },
      { icon: Calendar, text: 'Calendar', href: '/admin/calendar' },
      { icon: Share2, text: 'Social App', href: '/admin/social' },
    ],
  },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePath, setActivePath] = useState(window.location.pathname);

  const handleNavigation = (href) => {
    setActivePath(href);
    window.location.href = href;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-teal-800 text-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <a 
            href="/admin/dashboard" 
            className={`${!sidebarOpen && 'hidden'} text-xl font-bold`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/admin/dashboard');
            }}
          >
            Riho
          </a>
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
                  href={item.href}
                  expanded={sidebarOpen}
                  active={activePath === item.href}
                  onClick={() => handleNavigation(item.href)}
                />
              ))}
            </div>
          ))}
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

const SidebarItem = ({ icon: Icon, text, href, expanded, active, onClick }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
        px-4 py-2 flex items-center text-gray-300 hover:bg-teal-700 cursor-pointer
        ${active ? 'bg-teal-700 text-white' : ''}
      `}
    >
      <Icon size={20} />
      {expanded && <span className="ml-3">{text}</span>}
    </a>
  );
};

export default AdminLayout;