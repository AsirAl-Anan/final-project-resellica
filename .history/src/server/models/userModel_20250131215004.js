import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
   
   
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
       
    },
    
  
    role:{
        type:String,
        default:'user'
    }
  }
  )
  userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next()
    }
    next()
  });
  
  userSchema.methods.generateAccessToken =async function (){
      const payLoad = {
          email: this.email,
          _id: this._id,
          username: this.username
      }
      const accessToken =await jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
      return accessToken
  }
  userSchema.methods.generateRefreshToken =async function (){
      const payLoad = {
        
          _id: this._id,
         
      }
      const refreshToken = await jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15d"})
      return refreshToken
  }
  
  userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password )
  }
    const userModel = mongoose.model('user', userSchema)
    export default userModel