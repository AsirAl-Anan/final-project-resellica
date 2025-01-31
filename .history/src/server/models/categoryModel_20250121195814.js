
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,

  
}
  )
  const productModel = mongoose.model('product', categorySchema)
  export default productModel