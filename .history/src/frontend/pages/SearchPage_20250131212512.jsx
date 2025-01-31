import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const [sortOption, setSortOption] = useState('default');
  const [watchlistStatuses, setWatchlistStatuses] = useState({});
 console.log(searchResults)
  const getSortedProducts = () => {
    const products = [...searchResults];
    switch (sortOption) {
      case 'price-low':
        return products.sort((a, b) => a.resalePrice - b.resalePrice);
      case 'price-high':
        return products.sort((a, b) => b.resalePrice - a.resalePrice);
      case 'newest':
        return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts();

  if (!searchResults.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} found
        </h1>
        <select
          className="p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div key={product._id} className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
            <div className="relative h-48">
             <NavLink to={`/product/${product._id}`}> <img src={product.images[0]} alt="Product" className="w-full h-full object-contain" /></NavLink> 
             
            </div>

            <div className="p-4">
              <h4 className="text-lg font-medium text-gray-900">{product.title}</h4>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-purple-600">
                  {product.currency} {product.resalePrice}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.currency} {product.originalPrice}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Seller:</span>
                  <span className="font-medium text-sky-500 hover:underline">{product.sellerAccount[0].username}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{product.seller.country}</span>
                </div>
                {product.yearsOfUse && (
                  <div className="flex justify-between">
                    <span>Used for:</span>
                    <span className="font-medium">{product.yearsOfUse} years</span>
                  </div>
                )}
                   <div className="mt-4 space-y-2">
                <button 
                  onClick={} 
                  className={`w-full rounded-md py-2 text-center text-sm font-medium ${
                    watchlistStatuses[product._id]
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {watchlistStatuses[product._id] ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
                <button className="w-full rounded-md border border-purple-600 py-2 text-center text-sm font-medium text-purple-600 hover:bg-purple-50">
                  Book now
                </button>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
