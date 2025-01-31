import React from 'react';
import { Search } from 'lucide-react';
import Logo from '../../../../public/logo';
const Navbar = () => {
  return (
    <>
   
    <div className="flex items-center gap-4 p-3 border-b  ">
      {/* Logo */}
      <div className="flex items-center">
        <NavLink> </NavLink> 
      </div>

     

      {/* Search Bar */}
      <div className="flex flex-1 max-w-6xl">
       
        <div className="flex flex-1 items-center border-2 rounded-l hover:border-green-400 ">
          <Search className="w-5 h-5 ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full p-2 outline-none text-sm "
          />
        </div>
       
        <button className="bg-blue-600 text-white px-8 rounded-r hover:bg-blue-700">
          Search
        </button>
      </div>

     
    </div>
    </>
    
  );
};

export default Navbar;