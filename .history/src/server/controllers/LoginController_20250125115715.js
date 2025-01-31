import userModel from "../models/userModel.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
const loginController = async(req, res)=>{
const {email,username,password} = req.body 
const user = await userModel.findOne({
    $or:[{email}, {username}]
})
console.log(email, user)
if(!user){
    return res.status(404).json(new ApiError(404,"User not found"))
}
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken
    await user.save()
return res.status(200).cookie("refreshToken",refreshToken).cookie("accessToken", accessToken).json(new ApiResponse(200, user, "User logged In"))
}
export default loginController