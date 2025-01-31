
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,

  
}
  )
  const productModel = mongoose.model('product', productSchema)
  export default productModel