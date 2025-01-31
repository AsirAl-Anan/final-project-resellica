import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = userModel.findOne({email})
if(!user){
return res.json(404).ApiResponse("Admin not found")
}
if(user){
    return res.json(404).ApiResponse("Admin not found")
    }
}