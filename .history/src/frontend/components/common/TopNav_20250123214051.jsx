import React from 'react';
import { Bell, ShoppingCart, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const TopNav = () => {
  return (
    <div className="w-full bg-white border-b text-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span>Hi!</span>
            <a href="#" className="text-[#3665F3] hover:underline">Sign in</a>
            <span>or</span>
            <a href="#" className="text-[#3665F3] hover:underline">register</a>
          </div>
          <div className="flex items-center gap-6">
            
            
            <a href="#" className="hover:underline">Gift Cards</a>
            <a href="#" className="hover:underline">Help & Contact</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:underline">Ship to</a>
          <a href="#" className="hover:underline">Sell</a>
          <button className="flex items-center gap-1 hover:underline">
            Watchlist
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 hover:underline">
          Account
           
          </button>
          <Bell className="w-5 h-5" />
          <ShoppingCart className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;