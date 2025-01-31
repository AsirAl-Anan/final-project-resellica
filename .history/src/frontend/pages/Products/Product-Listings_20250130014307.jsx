import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../../../server/utils/axios.js';

// Sort options constant
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' }
];

const ProductPage = () => {
  const { categoryId } = useParams();
  const category = categoryId // Get category ID from URL params
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 599000 });
  const [sortBy, setSortBy] = useState('default');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
   
  // Fetch category details including subcategories
  const { data: categoryData } = useQuery({
    queryKey: ['category-details', category],
    queryFn: async () => {
      const response = await api.get(`/users/api/v1/categories/${category}`);
      console.log("res'response)
      return response.data;
    },
    enabled: !!category
  });

  // Fetch products with filters
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', category, currentPage, priceRange, sortBy, selectedCountry, selectedSubcategory],
    queryFn: async () => {
      const response = await api.post(`/users/api/v1/get-products/${category}`, {
        page: currentPage,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sortBy: sortBy === 'price_asc' ? 'resalePrice' : 
               sortBy === 'price_desc' ? 'resalePrice' : 'createdAt',
        sortOrder: sortBy === 'price_asc' ? 'asc' : 'desc',
        country: selectedCountry,
        subcategory: selectedSubcategory
      });
      return response.data;
    },
    keepPreviousData: true
  });

  // Fetch available countries (if needed)
  const { data: locationData } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await api.get('/users/api/v1/countries');
      return response.data;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Sidebar 
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          categoryDetails={categoryData?.category}
          countries={locationData?.countries || []}
        />
        <ProductListing 
          products={productsData?.products || []}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={productsData?.totalPages || 1}
          totalItems={productsData?.total || 0}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ 
  priceRange, 
  setPriceRange, 
  sortBy, 
  setSortBy, 
  selectedCountry, 
  setSelectedCountry,
  selectedSubcategory,
  setSelectedSubcategory,
  categoryDetails,
  countries
}) => {
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value ? parseInt(value) : 0
    }));
  };

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Subcategory Selection */}
      {categoryDetails?.subCategories?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Subcategory</h3>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Subcategories</option>
            {categoryDetails.subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Location Selection */}
      {countries.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Location</h3>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sort Options */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Price</label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full p-2 border rounded-md"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Price</label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full p-2 border rounded-md"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductListing = ({ 
  products, 
  isLoading, 
  currentPage, 
  totalPages, 
  totalItems,
  onPageChange 
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Results count */}
      <div className="mb-4 text-gray-600">
        Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, totalItems)} of {totalItems} results
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-4">
              <img 
                src={product.images[0]} 
                alt="Product"
                className="w-full h-48 object-contain mb-4"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600">Seller: {product.seller.name}</p>
                <p className="text-gray-600">Location: {product.seller.country}</p>
                <p className="font-bold text-lg">₹{product.resalePrice}</p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-500">
                    Original Price: ₹{product.originalPrice}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages)
            .map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;