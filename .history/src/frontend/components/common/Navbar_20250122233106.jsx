import React from 'react';
import { Search } from 'lucide-react';
import Logo from '../../../../public/logo';
const Navbar = () => {
  return (
    <div className="flex items-center gap-4 p-3 border-b">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-[#E53238] font-bold text-3xl">e</span>
        <span className="text-[#0064D2] font-bold text-3xl">b</span>
        <span className="text-[#F5AF02] font-bold text-3xl">a</span>
        <span className="text-[#86B817] font-bold text-3xl">y</span>
      </div>

      {/* Shop by Category Button */}
      <button className="flex items-center text-gray-600 text-sm hover:text-gray-800">
        Shop by<br />category
        Logo
      </button>

      {/* Search Bar */}
      <div className="flex flex-1 max-w-6xl">
        <div className="flex flex-1 items-center border-2 rounded-l">
          <Search className="w-5 h-5 ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full p-2 outline-none text-sm"
          />
        </div>
        <select className="border-y-2 border-r-2 px-4 bg-gray-50 text-sm">
          <option>All Categories</option>
        </select>
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