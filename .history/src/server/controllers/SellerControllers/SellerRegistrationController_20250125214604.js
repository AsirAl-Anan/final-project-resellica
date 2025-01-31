import sellerModel from "../../models/sellerModel.js";
import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
const sellerRegistrationController = async (req, res) => {
  try {
   
    const { dbUser, country  ,password } = req.body;
  

    if (!dbUser || !country ||  !password) {
      throw new ApiError(400, "Fill up all the fields");
    }
    const userId = dbUser._id
    const ifAlreadyUser = await userModel.findOne({
     _id:userId
    });
    if (ifAlreadyUser) {
      throw new ApiError(403, "User already exists");
    }

    const user = await sellerModel.create({
      userId,
      country,
      password,
    });
    

    


    return res
      .status(200)
      .json(new ApiResponse(201, { user }, "Account created successfully"));
  } catch (error) {
    throw new ApiError(
      error.code || 500,
      error.message || "An unexpected error occurred"
    );
  }
};

export default sellerRegistrationController;
