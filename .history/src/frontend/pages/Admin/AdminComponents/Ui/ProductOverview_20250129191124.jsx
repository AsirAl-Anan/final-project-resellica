import React from 'react';
import ImageSlider from './ImageSlider';

const ProductOverview = ({ 
  productData, 
  title, 
  description, 
  categories, 
  galleryImages, 
  currentImageIndex,
  handlePreviousImage,
  handleNextImage,
  handleDotClick 
}) => {
  const allImages = [
    { url: productData.mainImage },
    ...galleryImages
  ].filter(img => img.url);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Product Overview</h3>
      
      <div className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <ImageSlider 
          images={allImages}
          currentIndex={currentImageIndex}
          onPrevious={handlePreviousImage}
          onNext={handleNextImage}
          onDotClick={handleDotClick}
        />

        <div className="p-4">
          <h4 className="text-lg font-medium text-gray-900">{title || 'Product Title'}</h4>
          
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-purple-600">
              {productData.sellingPrice || '0'}
            </span>
            {productData.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {productData.originalPrice}
              </span>
            )}
          </div>

          {productData.originalPrice && productData.sellingPrice && (
            <div className="mt-2">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                Save: {productData.currency}{productData.originalPrice - productData.sellingPrice}
              </span>
            </div>
          )}

          <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-medium">
                {categories.find(cat => cat._id === productData.category)?.name || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sub Category:</span>
              <span className="font-medium">{productData.subCategory || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Purchase Date:</span>
              <span className="font-medium">{productData.buyingTime || 'N/A'}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button className="w-full rounded-md bg-purple-600 py-2 text-center text-sm font-medium text-white hover:bg-purple-700">
              Add to Watchlist
            </button>
            <button className="w-full rounded-md border border-purple-600 py-2 text-center text-sm font-medium text-purple-600 hover:bg-purple-50">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="font-medium">Product Details</h4>
          <div className="text-sm text-gray-600 space-y-1">
           description: {description && <div className='inline' dangerouslySetInnerHTML={{ __html: description }} />}
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Additional Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Status: {productData.publishStatus}</p>
            <p>Added: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductOverview;