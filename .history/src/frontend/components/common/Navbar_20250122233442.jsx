import React from 'react';
import { Search } from 'lucide-react';
import Logo from '../../../../public/logo';
const Navbar = () => {
  return (
    <div className="flex items-center gap-4 p-3 border-b">
      {/* Logo */}
      <div className="flex items-center">
       <Logo></Logo>
      </div>

      {/* Shop by Category Button */}
      <button className="flex items-center text-gray-600 text-sm hover:text-gray-800">
        Shop by<br />category
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Search Bar */}
      <div className="flex flex-1 max-w-6xl">
        <div>

        </div>
       
        <button className="bg-blue-600 text-white px-8 rounded-r hover:bg-blue-700">
          Search
        </button>
      </div>

      <button className="text-sm text-blue-600 hover:text-blue-800">
        Advanced
      </button>
    </div>
  );
};

export default Navbar;