
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,
subcategories:{
  type: [String],
}
}
  )
  const categoryModel = mongoose.model('product', categorySchema)
  export default categoryModel