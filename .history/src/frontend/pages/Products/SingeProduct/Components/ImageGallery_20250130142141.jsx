"use client"

import { useState } from "react"

export default function ImageGallery() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-djvo8T8qDKC1Jza6OtFAMqkEq5Vp6F.png",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-24 h-24 border rounded-lg overflow-hidden ${
                currentImage === index ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative flex-1">
          <img
            src={images[currentImage] || "/placeholder.svg"}
            alt="Product main view"
            className="w-full aspect-square object-contain"
          />

          {/* Navigation Arrows */}
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
        </div>
      </div>
    </div>
  )
}