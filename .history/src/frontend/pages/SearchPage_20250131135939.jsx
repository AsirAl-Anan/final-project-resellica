import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const [sortOption, setSortOption] = useState('default');

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
          <div 
            key={product._id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
                <button 
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
                    product.isInWatchlist 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      product.isInWatchlist ? 'text-white' : 'text-gray-500'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">
                      {product.currency} {product.resalePrice.toLocaleString()}
                    </p>
                    {product.originalPrice > product.resalePrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {product.currency} {product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {product.watchlistCount}
                  </div>
                </div>

                <div className="pt-2 border-t text-sm text-gray-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Seller:</span>
                    <span className="font-medium">{product.seller.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{product.category.name}</span>
                  </div>
                  {product.yearsOfUse && (
                    <div className="flex items-center justify-between">
                      <span>Used for:</span>
                      <span className="font-medium">{product.yearsOfUse} years</span>
                    </div>
                  )}
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