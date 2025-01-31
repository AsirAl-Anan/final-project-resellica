
import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
name: String,
subcategories:{
  type: [String],
},
icon:{
  type:String
  require:true
}
}
  )
  const categoryModel = mongoose.model('category', categorySchema)
  export default categoryModel