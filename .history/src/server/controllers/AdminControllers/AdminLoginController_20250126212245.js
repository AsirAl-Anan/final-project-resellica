import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import adminModel from "../../models/AdminModel.js";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = await userModel.findOne({email})
if(!user){
return res.status(404).json(new ApiError(404, "Admin not found"))
}
if(user.role !== "admin"){
    return res.status(404).json(new ApiError(404, "user is not an admin"))
}
const admin = await adminModel.findOne({userId:new mongoose.Types.ObjectId(user._id)})
if(!admin){
    return res.status(404).json(new ApiError(404, "Admin not found"))
 }
const isPasswordValid =await bcrypt.compare(password,user.password)
if(!isPasswordValid){
    return res.status(404).json(new ApiError(400, "Incorrect password"))
}
const adminToken =await admin.generateAdminToken()
res.status(200).cookie("adminToken", adminToken).json(new ApiResponse(200,admin ))   
}
export default adminLoginController