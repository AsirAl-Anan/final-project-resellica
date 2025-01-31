import sellerModel from "../../models/sellerModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt"
const SellerLoginController = async(req, res)=>{
const {email,password} = req.body 
const seller = await sellerModel.findOne({
    email
})

if(!seller){
    console.log("not seller")
    return res.status(404).json(new ApiError(404,"seller not found"))
}   

const ifPasswordValid =await bcrypt.compare(password, seller.password)

if(!ifPasswordValid){
    return res.status(401).json(new ApiError(401,"Invalid password"))
}
    const accessToken = await seller.generateAccessToken();
    const refreshToken = await seller.generateRefreshToken();
    seller.refreshToken = refreshToken
    await seller.save()
return res.status(200).cookie("refreshToken",refreshToken).cookie("accessToken", accessToken).json(new ApiResponse(200, seller, "seller logged In"))
}
export default SellerLoginController