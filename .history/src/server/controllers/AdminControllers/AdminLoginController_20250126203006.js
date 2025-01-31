import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt"
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = await userModel.findOne({email})
if(!user){
return res.json(404).ApiResponse("Admin not found")
}
if(user.role !== "admin"){
    return res.json(404).ApiResponse("Admin not found")
    }
const isPasswordValid = bcrypt.compare(user.password, password)
if(!is)    
}