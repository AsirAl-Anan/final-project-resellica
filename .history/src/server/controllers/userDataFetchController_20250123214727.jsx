import userModel from "../models/userModel"
import mongoose from "mongoose"
const userDataFetchController =async(req,res)=>{
 const userId = req.user._id
 const user = await userModel.aggregate([
    {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
    }
 ])

 
}

export default userDataFetchController