import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"




const verifyUserToken = async (req, res, next) =>{
   
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken){
         return res.json( new ApiError(401, "Access token not found"))
        }
        const decodedUser = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await userModel.findById(decodedUser._id).select("-password -refreshToken")
       
        if(!user){
            throw new ApiError(400, "Invalid access token")
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}


export default verifyUserToken