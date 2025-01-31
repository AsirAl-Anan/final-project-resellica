import userModel from "../../models/userModel.js";
import adminModel from "../../models/AdminModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const registrationController = async (req, res) => {
  try {
   
    const { userId } = req.body;
  

    if (!userId) {
      throw new ApiError(400, "Invalid user");
    }

    const ifAlreadyAdmin = await adminModel.findById(userId)
    if (ifAlreadyAdmin) {
      throw new ApiError(403, "User already exists");
    }

    const user = await userModel.create({
      username,
      fullname,
      email,
      password,
    });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const options = {
      httpOnly: true,
      sameSite: 'lax', 
      path: '/', 
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

export default registrationController;
