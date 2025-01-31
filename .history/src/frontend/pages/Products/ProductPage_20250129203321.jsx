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
