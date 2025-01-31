import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../server/utils/axios.js';
// Sort options constant
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' }
];

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 599000 });
  const [sortBy, setSortBy] = useState('default');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [userLocation, setUserLocation] = useState('');
 const fetchProducts = async (page, priceRange, sortBy, country, subcategory) => {
    const response = await fetch(`/api/v1/get-products/${category}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            sortBy: sortBy === 'price_asc' ? 'resalePrice' : 
                   sortBy === 'price_desc' ? 'resalePrice' : 'createdAt',
            sortOrder: sortBy === 'price_asc' ? 'asc' : 'desc',
            country,
            subcategory
        }),
    });
    return response.json();
};
  // Add query for fetching category details
  const { data: categoryData } = useQuery({
      queryKey: ['category-details', category], // category should come from URL or props
      queryFn: () => fetchCategoryDetails(category),
      enabled: !!category
  });

  // Update products query to include subcategory
  const { data, isLoading } = useQuery({
      queryKey: ['products', currentPage, priceRange, sortBy, selectedCountry, selectedSubcategory],
      queryFn: () => fetchProducts(currentPage, priceRange, sortBy, selectedCountry, selectedSubcategory),
      keepPreviousData: true
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
                userLocation={userLocation}
            />
            <ProductListing 
                products={data?.products}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={data?.totalPages}
                totalItems={data?.totalItems}
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
  countries,
  userLocation 
}) => {
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value ? parseInt(value) : 0
    }));
  };

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Location Information */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Location</h3>
        <p className="text-sm text-gray-600 mb-3">
          Showing results near {userLocation}
        </p>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {/* Category Information */}
      {categoryDetails?.subcategories?.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-semibold mb-4">Subcategory</h3>
                    <select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">All Subcategories</option>
                        {categoryDetails.subcategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
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

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex-1">
      {/* Results count */}
      <div className="mb-4 text-gray-600">
        Showing {((currentPage - 1) * 20) + 1} - {Math.min(currentPage * 20, totalItems)} of {totalItems} results
      </div>

      {/* Product grid */}
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

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        
        {getPageNumbers().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded ${
              currentPage === pageNumber 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Last
        </button>
        
        <span className="ml-4 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default ProductPage;