import ImageGallery from "./components/image-gallery"
import ProductDetails from "./components/product-details"
import ProductIdentifiers from "./components/product-identifiers"

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ImageGallery />
        <ProductDetails />
      </div>
      <ProductIdentifiers />
    </div>
  )
}

