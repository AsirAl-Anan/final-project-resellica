const ProductListing = ({
  products,
  isLoading,
  currentPage,
  totalPages,
  totalItems,
  onPageChange
}) => {
  const {dbUser, user} = useContext(AuthContext);
  const navigate = useNavigate();
  // Add state to track watchlist status for each product
  const [watchlistStatuses, setWatchlistStatuses] = useState({});

  useEffect(() => { 
    if(!dbUser && !user){ 
      navigate('/sign-in');
    }
  }, []);

  // Initialize watchlist statuses when products change
  useEffect(() => {
    const initialStatuses = {};
    products.forEach(product => {
      initialStatuses[product._id] = product.isInWatchlist;
    });
    setWatchlistStatuses(initialStatuses);
  }, [products]);

  const handleWatchlist = async (product) => {
    try {
      // Optimistically update UI
      setWatchlistStatuses(prev => ({
        ...prev,
        [product._id]: !prev[product._id]
      }));

      const response = await api.post(`/users/api/v1/watchlist/toggle`, {
        productId: product._id
      });
      
      // If the request fails, revert the optimistic update
      if (!response.data || !response.data.action) {
        setWatchlistStatuses(prev => ({
          ...prev,
          [product._id]: !prev[product._id]
        }));
      }
    } catch (error) {
      // Revert the optimistic update on error
      setWatchlistStatuses(prev => ({
        ...prev,
        [product._id]: !prev[product._id]
      }));
      console.error('Error toggling watchlist:', error);
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
    <div className="flex-1">
      <div className="mb-4 text-gray-600">
        Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, totalItems)} of {totalItems} results
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <NavLink to={`/product/${product._id}`}>
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              </NavLink>
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

              {product.originalPrice && product.resalePrice && (
                <div className="mt-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                    Save: {product.currency} {product.originalPrice - product.resalePrice}
                  </span>
                </div>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Seller:</span>
                  <span className="font-medium text-sky-500 hover:underline">
                    {product.sellerAccount[0].username}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{product.seller.country}</span>
                </div>
                <div className="flex justify-between">
                  <span>Years of use:</span>
                  <span className="font-medium">{product.yearsOfUse || 'N/A'}</span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mt-2">
                {"posted by " + product.sellerAccount[0].username + " " + formatTimeAgo(product.createdAt)}
              </div>

              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => handleWatchlist(product)} 
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
        ))}
      </div>

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
                    ? 'bg-purple-600 text-white'
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