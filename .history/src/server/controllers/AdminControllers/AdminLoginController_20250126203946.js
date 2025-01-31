import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import adminModel from "../../models/AdminModel.js";
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
const ifAdmin = await adminModel.findOne({email})
if(!ifAdmin){
    return res.status(404).json(new ApiError(404, "Admin not found"))
 }
const isPasswordValid =await bcrypt.compare(user.password, password)
if(!isPasswordValid){
    return res.status(404).json(new ApiError(400, "Incorrect password"))
}
const adminToken =await adminModel.generateAdminToken()
res.status(200).cookie("adminToken0")   
}
export default adminLoginController