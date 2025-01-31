import userModel from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const regenerateToken = async (req, res ,next) => {
  try {
    const userEmail = req.body.email;
    
    if (!userEmail) {
      throw new ApiError(400, "No email");
    }
    const user = await userModel.findOne({ email: userEmail });
   
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }
   
    const refreshToken =await user.generateRefreshToken()
    const accessToken = await user.generateAccessToken()
    user.refreshToken = refreshToken
    await user.save()
    
    const options = {
      httpOnly: true,
  
    };
   
    res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          { refreshToken, accessToken },
          "token refreshed"
        )
      );
  } catch (error) {
 next(new ApiError(400, error.message, null))
  
  }
};

export default regenerateToken