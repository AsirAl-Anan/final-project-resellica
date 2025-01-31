import userModel from "../../models/userModel.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
const logOutController =async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json(new ApiError(403, "Unauthorized", null));
  }
  const userId = user._id.toString()
  const newUser =  await  userModel.findByIdAndUpdate(
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
  console.log(newUser)
  const options ={
    httpOnly:true,
   
  }
  res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200, "Logged out successfully", null));
};
export default logOutController;
