import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import ApiError from "../utils/ApiError.js"
import requestIp from "request-ip"
import geoip from "geoip-lite"

const verifyUserToken = async (req, res, next) => {
    try {
        // Get access token from cookies
        const accessToken = req.cookies.accessToken
        if (!accessToken) {
            return res.json(new ApiError(401, "Access token not found"))
        }

        // Verify JWT and get user
        const decodedUser = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await userModel.findById(decodedUser._id).select("-password -refreshToken")
        
        if (!user) {
            throw new ApiError(400, "Invalid access token")
        }

        // Get client IP address
        const clientIp = requestIp.getClientIp(req)
        
        // Look up location information
        const geo = geoip.lookup(clientIp)
        
        // Add location info to request object
        req.userLocation = {
            country: geo?.country || 'Unknown',
            city: geo?.city || 'Unknown',
            ip: clientIp
        }

        // Add user to request object
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

export default verifyUserToken