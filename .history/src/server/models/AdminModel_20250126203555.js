import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
   
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

   
   

  }
  )
    adminSchema.methods.generateAdminToken = async function (params) {
        
    }
    const adminModel = mongoose.model('admin', adminSchema)
    export default adminModel