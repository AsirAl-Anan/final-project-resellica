import userModel from "../../models/userModel.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import tokenGenerator from "../../utils/tokenGenerator.js";
import jwt from "jsonwebtoken";

const regenerateToken = async (req, res ,next) => {
  try {
    const 
    console.log(incomingRefreshToken)
    if (!incomingRefreshToken) {
      throw new ApiError(400, "Invalid token");
    }
    const userId = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )._id;
    const user = await userModel.findById(userId);
    console.log(user);
  
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }
    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(400, "Invalid token");
    }
    const {newAccessToken, newRefreshToken} = await tokenGenerator(user.email,user.username, user._id)
    user.refreshToken = await newRefreshToken
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