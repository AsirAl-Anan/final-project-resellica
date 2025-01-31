import userModel from "../../models/userModel.js";
import api
const adminLoginController = async(req,res) =>{
const {email,password} = req.body
const user = userModel.findOne({email})
if(!user){

}
}