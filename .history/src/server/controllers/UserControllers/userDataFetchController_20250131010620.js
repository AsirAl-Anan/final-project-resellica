import userModel from "../../models/userModel.js";
import addressModel from "../../models/addressModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import mongoose from "mongoose"

const userDataFetchController = async(req, res) => {
    const userId = req.user._id

    const user = await userModel.aggregate([
        {
            $match: { 
                _id: new mongoose.Types.ObjectId(userId) 
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "_id",
                foreignField: "userId",
                as: "address"
            }
        },
        {
            $project:{
                _id: 1,
                username: 1,
                email: 1,
                avatar: 1,
                fullname: 1,
                role: 1,
                address: { $arrayElemAt: ["$address", 0] }
            }
        }
    ])

    if(user.length === 0 || !user) {
        return res.status(404).json(new ApiError(404, "User not found"))
    }

    return res.status(200).json(new ApiResponse(200, user[0], "User data fetched"))
}

export default userDataFetchController