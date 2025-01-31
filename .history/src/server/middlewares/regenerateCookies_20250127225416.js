import userModel from "../models/userModel";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
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
   
    const refreshToken = user.generateRefreshToken()
    const accessToken = await user.generateAccessToken()
    user.refreshToken = refreshToken
    await user.save()
    
    const options = {
      httpOnly: true,
  
    };
    console.log("refrestokenbfore ->", req.cookies.refreshToken)
    console.log("refreshToken1 ->", newRefreshToken);
    console.log("refreshtoknDB ->", user.refreshToken)

    res
      .status(201)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          201,
          { newAccessToken, newRefreshToken },
          "token refreshed"
        )
      );
  } catch (error) {
 next(new ApiError(400, error.message, null))
  
  }
};

export default regenerateToken