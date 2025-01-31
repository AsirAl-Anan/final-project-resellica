
import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
  sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
    required: true
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"category",
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
    type:String,
    enum: ['available', 'sold'],
  },
  tags:{
    type: [String],
    
  },
    sellingocation:{

    }
}
  )
  const productModel = mongoose.model('product', productSchema)
  export default productModel