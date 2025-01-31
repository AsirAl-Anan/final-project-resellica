import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
   
    userId:{
        type: Schema.Types.ObjectId,
        
    }
   
   

  }
  )
 
    const sellerModel = mongoose.model('admin', adminSchema)
    export default sellerModel