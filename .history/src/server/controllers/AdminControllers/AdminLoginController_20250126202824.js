import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = userModel.findOne({email})
if(!user){

}
}