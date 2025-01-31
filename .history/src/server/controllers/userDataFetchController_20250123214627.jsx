import userModel from "../models/userModel"
const userDataFetchController =async(req,res)=>{
 const userId = req.user._id
 const user = await userModel.findOne({
    _id: userId
 })
}