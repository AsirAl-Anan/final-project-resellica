import userModel from "../models/userModel"

const loginController = async(req, res)=>{
const {email,username,password} = req.body 
const user = await userModel.findOne({
    $or:[{email}]
})


}