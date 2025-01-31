import React from 'react';

const ProductListings = () => {
  const categories = [
    'Cameras & Photo',
    'Cell Phones & Accessories',
    'Computers/Tablets & Networking',
    'Home Surveillance',
    'Major Appliances',
    'Portable Audio & Headphones',
    'Surveillance & Smart Home Electronics',
    'TV, Video & Home Audio',
    'Vehicle Electronics & GPS',
    'Video Games & Consoles',
    'Virtual Reality'
  ];

  const filters = [
    'Model',
    'Region Code',
    'Brand',
    'Platform',
    'Storage Capacity',
    'Condition',
    'Price',
    'Buying Format'
  ];

  const products = [
    {
      id: 1,
      title: 'Nintendo Wii Video Game System RVL-001 Console 2-REMOTE Bundle NEW ACCESSORIES',
      condition: 'Very Good - Refurbished',
      brand: 'Nintendo',
      rating: 4.5,
      reviews: 1663,
      price: 123.45,
      wasPrice: 129.95,
      shipping: 'Free shipping',
      soldCount: '2,335 sold',
      isRefurbished: true,
      image: '/api/placeholder/200/200'
    },
    // Add more products as needed
  ];

  return (
    <div className="max-w mx-auto p-4">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-64">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category} className="text-gray-600 hover:underline cursor-pointer">
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded">All Listings</button>
            <button className="text-gray-600">Auction</button>
            <button className="text-gray-600">Buy It Now</button>
          </div>

          <p className="text-gray-600 mb-4">819,138 Results</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 border rounded-full hover:border-gray-400 flex items-center gap-1"
              >
                {filter}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Product List */}
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="flex gap-4 border-b pb-6">
                <div className="w-48 h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-600 hover:underline text-lg mb-1">{product.title}</h3>
                  <div className="text-gray-600 mb-1">
                    {product.condition} · {product.brand}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="text-xl font-semibold mb-1">${product.price}</div>
                  <div className="text-gray-600 mb-1">Was: ${product.wasPrice}</div>
                  <div className="text-gray-600 mb-1">{product.shipping}</div>
                  <div className="text-gray-600 mb-1">{product.soldCount}</div>
                  {product.isRefurbished && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <div className="w-4 h-4 rounded-full bg-blue-600" />
                      eBay Refurbished
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListings;