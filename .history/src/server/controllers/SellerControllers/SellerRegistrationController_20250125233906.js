import mongoose from "mongoose";
import sellerModel from "../../models/sellerModel.js";
import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
const sellerRegistrationController = async (req, res) => {
  try {
   
    const { userId, country   } = req.body;
  console.log(userId, country)

    if (!userId || !country ) {
      throw new ApiError(400, "Fill up all the fields");
    }
   
    const user = await userModel.findOne({
     _id: new mongoose.Types.ObjectId(userId)
    });
    if (user) {
      throw new ApiError(403, "User already exists");
    }
   
    const seller = await sellerModel.create({
      userId :new mongoose.Types.ObjectId(userId),
      country,
     
    });
    user.role = "seller"
    user.save()

    


    return res
      .status(200)
      .json(new ApiResponse(201, { seller ,user }, "Account created successfully"));
  } catch (error) {
    throw new ApiError(
      error.code || 500,
      error.message || "An unexpected error occurred"
    );
  }
};

export default sellerRegistrationController;
