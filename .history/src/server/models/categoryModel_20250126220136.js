
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,
subcategories:{
 
 icon type: [String],
}
}
  )
  const categoryModel = mongoose.model('product', categorySchema)
  export default categoryModel