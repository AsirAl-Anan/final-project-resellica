import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, CheckCircle } from 'lucide-react';

const Slider = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 7;

  const products = Array(21).fill('').map((_, i) => ({
    id: i + 1,
    image: `https://i.ebayimg.com/images/g/cYIAAOSwJI9nhSIl/s-l960.webp`,
  }));

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - productsPerView : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - productsPerView ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative bg-[#2F3B1C] text-white rounded-lg overflow-hidden">
      <div className="flex">
        {/* Left Content */}
        <div className="p-8 w-1/3">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="uppercase font-medium">Refurbished</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Your tech, your way</h2>
          <p className="text-lg mb-6">Choose from a vast selection of refurbished tech.</p>
          <button className="bg-[#E3F1D3] text-[#2F3B1C] px-6 py-2 rounded-full font-medium">
            It's up to you
          </button>
        </div>

        {/* Right Content - Product Grid */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-7 gap-2 p-4">
            {products
              .slice(currentIndex, currentIndex + productsPerView)
              .map((product) => (
                <div key={product.id} className="bg-[#E3F1D3] rounded-lg p-2">
                  <img
                    src={product.image}
                    alt={`Product ${product.id}`}
                    className="w-full h-auto rounded"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            className="p-1 bg-white/20 rounded hover:bg-white/30"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="p-1 bg-white/20 rounded hover:bg-white/30"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5"
