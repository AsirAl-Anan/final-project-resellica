
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,
subcategory:{
  
}
}
  )
  const categoryModel = mongoose.model('product', categorySchema)
  export default categoryModel