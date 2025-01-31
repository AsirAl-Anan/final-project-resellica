// {
//     "_id": "ObjectId",
//     "name": "string",
//     "category": "string", // e.g., "Electronics", "Furniture"
//     "price": "number",
//     "resalePrice": "number",
//     "condition": "string", // "Excellent", "Good", "Fair"
//     "description": "string",
//     "images": ["string"], // Array of image URLs
//     "sellerId": "ObjectId",
//     "postedAt": "Date",
//     "yearsOfUse": "number",
//     "location": "string",
//     "status": "string" // "available", "sold"
//   }
  
import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
  sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
    required: true
  },
  category:{
    type: String,
    required: true
  },
  originalPrice:{
    type: Number,
    required: true
  },
  resalePrice:{
    type: Number,
    required: true
   },
   condition:{
    type: String,
    enum: ['Excellent', 'Good', 'Fair'],
   },
   images:{
    type: [String],
    required:true
   },
  yearsOfUse:{
    type:String,
    required:true
  },
  status:{
    
  }
  
}
  )
  const productModel = mongoose.model('product', productSchema)
  export default productModel