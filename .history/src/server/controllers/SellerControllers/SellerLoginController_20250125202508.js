import sellerModel from "../../models/sellerModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt"
const SellerLoginController = async(req, res)=>{
const {email,password} = req.body 
const user = await .findOne({
    email
})

if(!user){
    console.log("not user")
    return res.status(404).json(new ApiError(404,"User not found"))
}   

const ifPasswordValid =await bcrypt.compare(password, user.password)
console.log(ifPasswordValid)
if(!ifPasswordValid){
    return res.status(401).json(new ApiError(401,"Invalid password"))
}
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken
    await user.save()
return res.status(200).cookie("refreshToken",refreshToken).cookie("accessToken", accessToken).json(new ApiResponse(200, user, "User logged In"))
}
export default SellerLoginController