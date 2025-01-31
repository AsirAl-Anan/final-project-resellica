import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
const sellerRegistrationController = async (req, res) => {
  try {
   
    const { dbUser, country  ,password } = req.body;
  

    if (!dbUser || !country || !email || !password) {
      throw new ApiError(400, "Fill up all the fields");
    }
    
    const ifAlreadyUser = await userModel.findOne({
    
    });
    if (ifAlreadyUser) {
      throw new ApiError(403, "User already exists");
    }

    const user = await userModel.create({
      bussinessName,
      country,
      email,
      password,
    });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const options = {
      httpOnly: true,
      sameSite: 'lax', // Added sameSite policy
      path: '/', // Added path
      maxAge: 24 * 60 * 60 * 1000
  
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(201, { user }, "Account created successfully"));
  } catch (error) {
    throw new ApiError(
      error.code || 500,
      error.message || "An unexpected error occurred"
    );
  }
};

export default sellerRegistrationController;
