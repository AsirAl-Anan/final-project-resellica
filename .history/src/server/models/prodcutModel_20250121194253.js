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
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  addressLine:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  postalCode:{
    type:String,
  },
  
}
  )
  const productModel = mongoose.model('address', productSchema)
  export default productModel