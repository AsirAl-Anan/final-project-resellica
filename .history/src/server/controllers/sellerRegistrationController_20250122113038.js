import sellerModel from "../models/sellerModel.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const registrationController = async (req, res) => {
  try {
   
    const { bussinessName, country, email, password } = req.body;
  

    if (!bussinessName || !country || !email || !password) {
      throw new ApiError(400, "Fill up all the fields");
    }

    const ifAlreadyseller = await sellerModel.findOne({
      $or: [{ shopname:bussinessName }, { email }],
    });
    if (ifAlreadyseller) {
      throw new ApiError(403, "seller already exists");
    }

    const seller = await sellerModel.create({
      shopname:bussinessName,
      country,
      email,
      password,
    });
    const accessToken = await seller.generateAccessToken();
    const refreshToken = await seller.generateRefreshToken();

    seller.refreshToken = refreshToken;
    await seller.save();

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
      .json(new ApiResponse(201, { seller }, "Account created successfully"));
  } catch (error) {
    throw new ApiError(
      error.code || 500,
      error.message || "An unexpected error occurred"
    );
  }
};

export default registrationController;
