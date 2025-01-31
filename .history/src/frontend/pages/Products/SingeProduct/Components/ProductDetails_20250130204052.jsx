import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ProductDetails({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency || 'USD'
    }).format(price);
  };

  const isLongDescription = product.description?.length > 50;

  const renderDescription = () => {
    if (!isLongDescription) {
      return <div>{product.description}</div>;
    }

    return (
      <div>
        <div
          className={`relative ${
            !isExpanded ? "h-12 overflow-hidden" : ""
          }`}
        >
          <div
            className={
              !isExpanded
                ? "absolute inset-0 bg-gradient-to-b from-black/0 to-white"
                : ""
            }
          ></div>
          <div className="relative">
            {product.description}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
            >
              See Details <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
            >
              Minimize <ChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

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
          {renderDescription()}
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
          Buy it Now
        </button>
        <button 
          disabled={product.status !== 'available'}
          className={`w-full border ${
            product.status === 'available'
              ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
              : 'border-gray-400 text-gray-400'
          } py-3 px-6 rounded-full`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}