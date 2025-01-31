interface Transaction {
    id: string;  // Unique identifier for the transaction
    buyerId: string;  // ID of the buyer
    sellerId: string;  // ID of the seller
    productId: string;  // ID of the purchased product
    price: number;  // Base price of the product
    shippingCharge: number;  // Delivery/shipping cost
    totalCost: number;  // Total cost (price + shippingCharge)
    deliveryAddress: string;  // Shipping address
    status: 'pending' | 'completed' | 'failed' | 'refunded';  // Status of the transaction
    stripePaymentIntentId?: string;  // Stripe payment intent ID (if applicable)
    stripeChargeId?: string;  // Stripe charge ID (if applicable)
    createdAt: Date;  // Timestamp for when the transaction was created
    updatedAt: Date;  // Timestamp for last update
  }
  