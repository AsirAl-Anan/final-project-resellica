import mongoose, {Schema} from "mongoose";

const sellerSchema = new Schema({
   
    
   
    city:{
        type:String
    },
    addressLine:{
        type:String

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

  }
  )
 
    const sellerModel = mongoose.model('seller', sellerSchema)
    export default sellerModel