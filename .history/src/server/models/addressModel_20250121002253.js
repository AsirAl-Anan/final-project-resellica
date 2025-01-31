import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema({
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
  const addressModel = mongoose.model('address', addressSchema)
  export default addressModel