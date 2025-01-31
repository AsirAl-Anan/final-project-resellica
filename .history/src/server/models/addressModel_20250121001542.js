import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    
  }
}
  )