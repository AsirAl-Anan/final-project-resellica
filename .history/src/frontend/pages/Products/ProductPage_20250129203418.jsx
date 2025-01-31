import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// ProductPage component that serves as the parent
const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 599000]);
  const [filters, setFilters] = useState({
    availability: [],
    series: [],
    brand: [],
    processorType: []
  });

  // TanStack Query for fetching products
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', currentPage, filters, priceRange],
    queryFn: () => fetchProducts(currentPage, filters, priceRange),
    keepPreviousData: true
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Sidebar 
          filters={filters}
          priceRange={priceRange}
          onFilterChange={handleFilterChange}
          onPriceChange={handlePriceChange}
        />
        <ProductListing 
          products={data?.products}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={data?.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// Sidebar component for filters
const Sidebar = ({ filters, priceRange, onFilterChange, onPriceChange }) => {
  return (
    <div className="w-full md:w-64 space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="599000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Availability</h3>
        {['In Stock', 'Pre Order', 'Up Coming'].map((option) => (
          <label key={option} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filters.availability.includes(option)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...filters.availability, option]
                  : filters.availability.filter(item => item !== option);
                onFilterChange('availability', newValues);
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Series</h3>
        {['Consumer Laptops', 'Business Laptops', 'Gaming Laptops', 'Premium Ultrabook Laptops'].map((option) => (
          <label key={option} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filters.series.includes(option)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...filters.series, option]
                  : filters.series.filter(item => item !== option);
                onFilterChange('series', newValues);
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// ProductListing component
const ProductListing = ({ products, isLoading, currentPage, totalPages, onPageChange }) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{product.processor}</p>
                <p>{product.ram}</p>
                <p>{product.display}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">₹{product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
              <button className="mt-2 w-full border border-gray-300 rounded py-1 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Add to Compare
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = currentPage - 2 + i;
          if (pageNumber > 0 && pageNumber <= totalPages) {
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-4 py-2 rounded ${
                  currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;