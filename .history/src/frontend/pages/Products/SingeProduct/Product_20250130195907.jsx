
import ImageGallery from "./Components/ImageGallery"

import ProductDetails from "./Components/ProductDetails"
import ProductIdentifiers from "./Components/ProductIdentifiers"
import api from "../../../../server/utils/axios.js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export default function SingleProductPage() {
  
  const {id} = useParams()
  const productId = id
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchProducts =()=>{
    api.get(`/users/api/v1/get-product/${productId}`)
    .then(response=>{
      console.log(response)
      setProduct(response.data.data.product)
      setLoading(false)
    })
    .catch(error=>{
      setError(error)
      setLoading(false)
    })
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  console.log("product state",product)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ImageGallery images={product?.images} />
        <ProductDetails product={product}/>
      </div>
      <ProductIdentifiers postedAt={product?.createdAt} originalPrice={product?.originalPrice} resellPrice={product?.resellPrice}/>
    </div>
  )
}

