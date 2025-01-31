import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Logo from '../../../../public/logo';
import { NavLink, useNavigate } from 'react-router-dom';
import  api from "../../../server/utils/axios.js"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await api.post('/users/api/v1/search-products')

      if (response.status === 200) {
        const data = await response.json();
        // Navigate to search results page with the results
        navigate('/search-results', { state: { results: data.products } });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 border-b">
      <div className="flex items-center">
        <NavLink to={'/'}><Logo /></NavLink>
      </div>

      <form onSubmit={handleSearch} className="flex flex-1 max-w-6xl">
        <div className="flex flex-1 items-center border-2 rounded-l hover:border-green-400">
          <Search className="w-5 h-5 ml-2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anything"
            className="w-full p-2 outline-none text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Navbar;