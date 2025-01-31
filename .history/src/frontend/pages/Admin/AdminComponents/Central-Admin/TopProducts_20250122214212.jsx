import React from "react"
import { MoreVertical } from "lucide-react"
import styles from "./Cards.module.css"

interface Product {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  revenue: number
  profit: number
}

const products = [
  {
    id: "SKU90400",
    name: "Huawai Smart Watch",
    image: "/placeholder.svg?height=60&width=60",
    price: 39.02,
    quantity: 12,
    revenue: 551,
    profit: 15,
  },
  {
    id: "SKU78589",
    name: "Noise - Wireless Headphone",
    image: "/placeholder.svg?height=60&width=60",
    price: 45.26,
    quantity: 19,
    revenue: 8,
    profit: 9,
  },
  {
    id: "SKU78599",
    name: "Men & Women Footwear",
    image: "/placeholder.svg?height=60&width=60",
    price: 45.62,
    quantity: 9,
    revenue: 15,
    profit: 18,
  },
]

export function TopProducts() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Top Product</h2>
        <a href="#" className={styles.viewAll}>
          View All
        </a>
      </div>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <div className={styles.productInfo}>
              <img src={product.image || "/placeholder.svg"} alt={product.name} className={styles.productImage} />
              <div>
                <div className={styles.productId}>{product.id}</div>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productPrice}>${product.price}</div>
              </div>
            </div>
            <div className={styles.productMetrics}>
              <div>
                <span>QTY : {product.quantity}</span>
                <span>Revenue : ${product.revenue}</span>
                <span>Profit : ${product.profit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

