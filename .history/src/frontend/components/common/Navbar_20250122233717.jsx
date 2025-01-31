import React from 'react';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-2.5 border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* eBay Logo */}
        <div className="mr-2">
          <span className="text-[#E53238] font-bold text-4xl">e</span>
          <span className="text-[#0064D2] font-bold text-4xl">b</span>
          <span className="text-[#F5AF02] font-bold text-4xl">a</span>
          <span className="text-[#86B817] font-bold text-4xl">y</span>
        </div>

        {/* Shop by Category */}
        <button className="flex items-center text-[#333] hover:text-[#333] gap-1 text-sm mr-2">
          <span>
            Shop by<br />category
          </span>
          <svg className="w-3 h-3 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center border rounded-l overflow-hidden hover:border-blue-600">
            <div className="pl-3">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="relative">
            <select className="h-full border-y px-4 py-2.5 bg-gray-50 text-sm border-r appearance-none pr-8 hover:border-blue-600">
              <option>All Categories</option>
            </select>
            <svg className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button className="bg-[#3665F3] text-white px-8 py-2.5 rounded-r font-medium text-sm hover:bg-blue-700">
            Search
          </button>
        </div>

        <a href="#" className="text-sm text-[#3665F3] hover:text-blue-800 ml-4">
          Advanced
        </a>
      </div>
    </nav>
  );
};

export default Navbar;