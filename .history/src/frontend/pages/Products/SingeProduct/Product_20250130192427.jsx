
import ImageGallery from "./Components/ImageGallery"

import ProductDetails from "./Components/ProductDetails"
import ProductIdentifiers from "./Components/ProductIdentifiers"
import api from "../../../../server/utils/axios"
export default function SingleProductPage() {
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

