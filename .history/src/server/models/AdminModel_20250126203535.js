import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
   
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

   
   

  }
  )
    adminSchema.me
    const adminModel = mongoose.model('admin', adminSchema)
    export default adminModel