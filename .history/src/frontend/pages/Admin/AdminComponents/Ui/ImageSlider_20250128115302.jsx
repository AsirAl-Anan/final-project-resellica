import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images, currentIndex, onPrevious, onNext, onDotClick }) => {
  // Early return if no images
  if (!images || images.length === 0) return null;

  // Ensure currentIndex is within bounds
  const safeIndex = ((currentIndex % images.length) + images.length) % images.length;

  return (
    <div className="relative h-64 bg-gray-100">
      <img 
        src={images[safeIndex].uri} 
        alt={`Product ${safeIndex + 1}`}
        className="h-full w-full object-contain"
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-1.5 shadow-md hover:bg-gray-50 opacity-50 hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-1.5 shadow-md hover:bg-gray-50 opacity-50 hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotClick(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === safeIndex ? 'bg-purple-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;