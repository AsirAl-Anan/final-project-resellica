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
      const response = await api.get(`/users/api/v1/watchlist`, {
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
      await api.post(`/users/api/v1/watchlist/toggle`, {
        productId
      });
      fetchWatchlistItems(); // Refresh the list after toggling
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
        <span className="text-sm text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {watchlistItems?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items in your watchlist</h3>
          <p className="mt-1 text-sm text-gray-500">Start adding some items to your watchlist!</p>
          <div className="mt-6">
            <NavLink
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Browse Products
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlistItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-48">
                  <NavLink to={`/product/${item._id}`}>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </NavLink>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {item.watchlistCount || 0} watching
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h4>
                  
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {item.currency} {item.resalePrice.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {item.currency} {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {item.originalPrice && item.resalePrice && (
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Save {item.currency} {(item.originalPrice - item.resalePrice).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Seller:</span>
                      <span className="font-medium text-sky-500">
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
                    Added {formatTimeAgo(item.createdAt)}
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => handleRemoveFromWatchlist(item._id)}
                      className="w-full rounded-md bg-red-600 py-2 text-center text-sm font-medium text-white hover:bg-red-700 transition-colors"
                    >
                      Remove from Watchlist
                    </button>
                    <NavLink
                      to={`/product/${item._id}`}
                      className="block w-full rounded-md border border-purple-600 py-2 text-center text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors"
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