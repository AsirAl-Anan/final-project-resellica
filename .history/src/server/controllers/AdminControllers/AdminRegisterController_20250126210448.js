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
      throw new ApiError(403, "Admin already exists");
    }

    const admin = await userModel.create({
     userId
    });
    

    

    const options = {
      httpOnly: true,
      sameSite: 'lax', 
      path: '/', 
      maxAge: 24 * 60 * 60 * 1000
  
    };

    return res
      .status(200)
      .json(new ApiResponse(201, { admin }, "Account created successfully"));
  } catch (error) {
    throw new ApiError(
      error.code || 500,
      error.message || "An unexpected error occurred"
    );
  }
};

export default adminRegistrationController;
