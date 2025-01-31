import userModel from "../models/userModel.js"
import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
const userDataFetchController =async(req,res)=>{
 const userId = "6792636e6d1bd2a43dcf0fe3"
 const user = await userModel.aggregate([
    {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
    }, 
    {
        $project:{
            _id:1,
            name:1,
        }
    }

 ])
if(user.length === 0 || !user){
    return res.status(404).json(new ApiError(404,"User not found"))
}
return res.status(200).json(new ApiResponse(200, user, "User data fetched"))
}

export default userDataFetchController