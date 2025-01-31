import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import mongoose from "mongoose"

const userDataFetchController =async(req,res)=>{
 const userId = req.user._id
 const user = await userModel.aggregate([
    {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
    }, 
    {
        $project:{
            _id:1,
            username:1,
            email:1,
            avatar:1,
            fullname:1
        }
    }

 ])
if(user.length === 0 || !user){
    return res.status(404).json(new ApiError(404,"User not found"))
}
return res.status(200).json(new ApiResponse(200, user, "User data fetched"))
}

export default userDataFetchController