import userModel from "../../models/userModel.js";
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = userModel.findOne({email})

}