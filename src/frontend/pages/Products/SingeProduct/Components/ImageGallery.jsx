import { useState } from "react"
export default function ImageGallery({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0)

  // If no images provided, show a default placeholder
  const imageUrls = images?.length > 0 
    ? images 
    : ["/placeholder.svg?height=400&width=400"]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imageUrls.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  return (
    <div className="relative">
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-4">
          {imageUrls.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-24 h-24 border rounded-lg overflow-hidden ${
                currentImage === index ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative flex-1">
          <img
            src={imageUrls[currentImage]}
            alt="Product main view"
            className="w-full aspect-square object-contain"
          />

          {/* Only show navigation if there are multiple images */}
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
