import userModel from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
const logOutController =async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json(new ApiError(403, "Unauthorized", null));
  }
  const userId = user._id.toString()
  const deletedUser =  await  userModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );
  
  const options ={
    httpOnly:true,
   
  }
  res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200, "Logged out successfully", null));
};
export default logOutController;
