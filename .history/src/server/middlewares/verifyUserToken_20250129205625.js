import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import geoip from "geoip-lite";

const verifyUserToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.json(new ApiError(401, "Access token not found"));
        }

        const decodedUser = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await userModel.findById(decodedUser._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(400, "Invalid access token");
        }

        // Extract user IP address
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
        req.userIp = ip;
 console.log(ip)
        // Get country from IP
        const geo = geoip.lookup(ip);
        req.userCountry = geo?.country || "Unknown"; // Store country in request object
         console.log("s",geo)
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default verifyUserToken;
