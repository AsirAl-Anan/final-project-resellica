import { NavLink } from "react-router-dom"

export default function ProductDetails({ product }) {
  if (!product) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency || 'USD'
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="mt-2">
          {product.sellerAccount?.username && (
            <div>
              <NavLink to="#" className="text-sm text-blue-600 hover:underline">
                {product.sellerAccount.username}
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600">Price:</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {formatPrice(product.resalePrice || product.originalPrice)}
            </span>
            {product.resalePrice && product.originalPrice && (
              <span className="text-gray-600 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div>
          
          <div>{product.description}</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Category:</div>
          <div className="capitalize">{product.subCategory}</div>
        </div>

        {product.yearOfUse && (
          <div>
            <div className="text-sm text-gray-600">Year of Use:</div>
            <div>{product.yearOfUse}</div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button 
          disabled={product.status !== 'available'}
          className={`w-full ${
            product.status === 'available' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400'
          } text-white py-3 px-6 rounded-full`}
        >
         
        </button>
        <button 
          disabled={product.status !== 'available'}
          className={`w-full border ${
            product.status === 'available'
              ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
              : 'border-gray-400 text-gray-400'
          } py-3 px-6 rounded-full`}
        >
         Add To Watchlist
        </button>
        <button className="w-full border py-3 px-6 rounded-full hover:bg-gray-50">
          See all details
        </button>
      </div>
    </div>
  )
}