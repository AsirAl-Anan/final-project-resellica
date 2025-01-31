// src/pages/Watchlist.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (days > 0) return `${days} days ago`;
  return `${hours} hours ago`;
};

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchWatchlistItems();
  }, [currentPage]);

  const fetchWatchlistItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/watchlist?page=${currentPage}`, {
        withCredentials: true
      });
      setWatchlistItems(response.data.items);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (productId) => {
    try {
      await axios.delete(`/api/watchlist/${productId}`, {
        withCredentials: true
      });
      fetchWatchlistItems();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Watchlist</h1>
      
      {watchlistItems?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Your watchlist is empty</p>
          <NavLink to="/products" className="mt-4 inline-block text-purple-600 hover:underline">
            Browse Products
          </NavLink>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, totalItems)} of {totalItems} items
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlistItems.map((item) => (
              <div key={item._id} className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={item.images[0]}
                    alt="Product"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>

                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {item.currency} {item.resalePrice}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {item.currency} {item.originalPrice}
                      </span>
                    )}
                  </div>

                  {item.originalPrice && item.resalePrice && (
                    <div className="mt-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                        Save: {item.currency} {item.originalPrice - item.resalePrice}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Seller:</span>
                      <span className="font-medium text-sky-500 hover:underline">
                        {item.sellerAccount[0].username}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{item.seller.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years of use:</span>
                      <span className="font-medium">{item.yearsOfUse || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    {"posted by " + item.sellerAccount[0].username + " " + formatTimeAgo(item.createdAt)}
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => handleRemoveFromWatchlist(item._id)}
                      className="w-full rounded-md bg-red-600 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
                    >
                      Remove from Watchlist
                    </button>
                    <NavLink
                      to={`/product/${item._id}`}
                      className="block w-full rounded-md border border-purple-600 py-2 text-center text-sm font-medium text-purple-600 hover:bg-purple-50"
                    >
                      View Details
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Watchlist;