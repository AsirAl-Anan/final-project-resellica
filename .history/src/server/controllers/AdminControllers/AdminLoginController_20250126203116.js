import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt"
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = await userModel.findOne({email})
if(!user){
return res.status(404).json(new ApiError(404, "Admin not found"))
}
if(user.role !== "admin"){
    return res.status(404).json(new ApiError(404, "Admin not found"))
}
const isPasswordValid = bcrypt.compare(user.password, password)
if(!isPasswordValid){
    return res.status(404).json(new ApiError(400, "Admin not found"))
}    
}