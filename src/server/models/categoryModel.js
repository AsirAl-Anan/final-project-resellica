
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,
subCategories:{
  type: [String],
},
icon:{
  type:String,
  required:true
}
}
  )
  const categoryModel = mongoose.model('category', categorySchema)
  export default categoryModel