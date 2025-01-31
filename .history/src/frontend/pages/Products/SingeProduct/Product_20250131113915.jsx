import ImageGallery from "./Components/ImageGallery"
import ProductDetails from "./Components/ProductDetails"
import ProductIdentifiers from "./Components/ProductIdentifiers"
import api from "../../../../server/utils/axios.js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function SingleProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await aApi.get(`/users/api/v1/get-product/${id}`)
        setProduct(response.data.data.product)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="animate-pulse bg-gray-200 aspect-square rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <h3 className="text-lg font-semibold">Error Loading Product</h3>
          <p>There was an error loading the product. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          <h3 className="text-lg font-semibold">Product Not Found</h3>
          <p>The requested product could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ImageGallery images={product.images} />
        <ProductDetails product={product} />
      </div>
      <ProductIdentifiers 
        resselicaid={product._id}
        postedAt={product.createdAt}
        originalPrice={product.originalPrice}
        resellPrice={product.resalePrice}
        country={product.seller?.[0]?.country}
        yearsOfUse={product.yearsOfUse}
        isVerified={product.isVerified}
      />
    </div>
  )
}