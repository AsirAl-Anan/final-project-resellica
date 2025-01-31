import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const [sortOption, setSortOption] = useState('default');

  // Sort products based on selected option
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
          className="p-2 border rounded-md"
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
          <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
                <button 
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    product.isInWatchlist ? 'bg-red-500' : 'bg-white'
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
                <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                
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
                  <div className="text-sm text-gray-500">
                    {product.watchlistCount} saved
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Seller: {product.seller.name}</p>
                  <p>Category: {product.category.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;