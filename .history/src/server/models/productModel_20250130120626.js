
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
    
  },
  tags:{
    type: [String],
    
  },
  subCategory:{
    type: String,
    required: true
  },
  currency:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  }
  
},
{timestamps: true} )
  const productModel = mongoose.model('product', productSchema)
  export default productModel