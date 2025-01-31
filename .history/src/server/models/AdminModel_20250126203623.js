import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
   
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

   
   

  }
  )
    adminSchema.methods.generateAdminToken = async function () {
        const accessToken =await jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
              return accessToken
    }
    const adminModel = mongoose.model('admin', adminSchema)
    export default adminModel