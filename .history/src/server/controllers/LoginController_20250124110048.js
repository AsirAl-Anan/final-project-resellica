import userModel from "../models/userModel"
import ApiError from "../utils/ApiError"
const loginController = async(req, res)=>{
const {email,username,password} = req.body 
const user = await userModel.findOne({
    $or:[{email}, {username}]
})
if(!user){
    return res.status(404).json({message:"User not found"})
}

}