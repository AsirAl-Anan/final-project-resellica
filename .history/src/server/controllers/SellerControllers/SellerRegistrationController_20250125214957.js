import mongoose from "mongoose";
import sellerModel from "../../models/sellerModel.js";
import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
const sellerRegistrationController = async (req, res) => {
  try {
   
    const { dbUser, country   } = req.body;
  

    if (!dbUser || !country ) {
      throw new ApiError(400, "Fill up all the fields");
    }
   
    const ifAlreadyUser = await userModel.findOne({
     _id: mongoose.Types.ObjectId(userId)
    });
    if (ifAlreadyUser) {
      throw new ApiError(403, "User already exists");
    }

    const seller = await sellerModel.create({
      userId : mongoose.Types.ObjectId(userId),
      country,
     
    });
    

    


    return res
      .status(200)
      .json(new ApiResponse(201, { seller }, "Account created successfully"));
  } catch (error) {
    throw new ApiError(
      error.code || 500,
      error.message || "An unexpected error occurred"
    );
  }
};

export default sellerRegistrationController;
