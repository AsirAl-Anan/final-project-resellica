import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const Slider = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      image: 'https://i.ebayimg.com/images/g/cYIAAOSwJI9nhSIl/s-l960.webp',
      title: 'Product 1',
      buttonTitle: 'Buy Now',
      buttonUrl: '/product1',
    },
    {
      id: 2,
      image: 'https://i.ebayimg.com/images/g/C2gAAOSwo7dnhSiq/s-l960.webp',
      title: 'Product 2',
      buttonTitle: 'Explore More',
      buttonUrl: '/product2',
    },
    {
      id: 3,
      image: 'https://i.ebayimg.com/images/g/cYIAAOSwJI9nhSIl/s-l960.webp',
      title: 'Product 3',
      buttonTitle: 'Shop Now',
      buttonUrl: '/product3',
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex]);

  return (
    <div className="relative  text-white rounded-lg overflow-hidden w-full">
      {/* Slide Content */}
      <div className="w-full h-[400px] flex items-center justify-center">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
              <a
                href={product.buttonUrl}
                className="bg-[#E3F1D3] text-[#2F3B1C] px-6 py-2 rounded-full font-medium"
              >
                {product.buttonTitle}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          className="p-2 bg-white/20 rounded hover:bg-white/30"
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="p-2 bg-white/20 rounded hover:bg-white/30"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          className="p-2 bg-white/20 rounded hover:bg-white/30"
          onClick={handleNext}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
