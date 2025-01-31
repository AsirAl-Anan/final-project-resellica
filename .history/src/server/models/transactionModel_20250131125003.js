const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to User model
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to User model
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product', // Reference to Product model
  },
  price: {
    type: Number,
    required: true,
  },
  shippingCharge: {
    type: Number,
    required: true,
    default: 0,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  stripePaymentIntentId: {
    type: String, // Stripe Payment Intent ID for tracking
  },
  stripeChargeId: {
    type: String, // Stripe Charge ID (if applicable)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
}, {timestamps: true});



const transactionModel = mongoose.model('Transaction', TransactionSchema);

export default Transaction;