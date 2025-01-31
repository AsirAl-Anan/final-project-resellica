import userModel from "../models/userModel.js"
import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"
im
const userDataFetchController =async(req,res)=>{
 const userId = req.user._id
 const user = await userModel.aggregate([
    {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
    }
 ])

  
}

export default userDataFetchController