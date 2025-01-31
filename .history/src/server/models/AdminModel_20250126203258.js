import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
   
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

   
   

  }
  )
    
    const sellerModel = mongoose.model('admin', adminSchema)
    export default sellerModel