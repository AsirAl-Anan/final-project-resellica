import userModel from "../../models/userModel.js";
import addressModel from "../../models/addressModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

const userDataController = {
    // Existing GET handler
    getUserData: async(req, res) => {
        const userId = req.user._id;

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
        ]);

        if(user.length === 0 || !user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, user[0], "User data fetched"));
    },

    // New PUT handler
    updateUserData: async(req, res) => {
        console.log(req.body)
        console.log("inside")
        try {
            const userId = req.user._id; // Get userId from authenticated user
            const { username,email, address } = req.body;

            // Validate request data
            if (!username && !email && !address) {
                console.log("if")
                return res.status(400).json(
                    new ApiError(400, "No update data provided")
                );
            }

            // Update user information if provided
            if (username || email) {
                const updatedUser = await userModel.findByIdAndUpdate(
                    userId,
                    { $set: { username, email } },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    return res.status(404).json(
                        new ApiError(404, "User not found")
                    );
                }
            }

            // Update or create address if provided
            if (addressData) {
                const updatedAddress = await addressModel.findOneAndUpdate(
                    { userId: new mongoose.Types.ObjectId(userId) },
                    { 
                        $set: {
                            ...addressData,
                            userId: new mongoose.Types.ObjectId(userId)
                        }
                    },
                    { 
                        upsert: true, 
                        new: true,
                        runValidators: true
                    }
                );

                if (!updatedAddress) {
                    return res.status(500).json(
                        new ApiError(500, "Failed to update address")
                    );
                }
            }

            // Fetch updated user data to return in response
            const updatedUserData = await userModel.aggregate([
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
            ]);
          console.log("update", updatedUserData)
            return res.status(200).json(
                new ApiResponse(
                    200, 
                    updatedUserData[0], 
                    "User data updated successfully"
                )
            );

        } catch (error) {
            // Handle mongoose validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json(
                    new ApiError(400, error.message)
                );
            }

            // Handle other errors
            return res.status(500).json(
                new ApiError(500, "Error updating user data: " + error.message)
            );
        }
    }
};

export default userDataController;