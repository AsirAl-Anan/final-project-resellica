import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "password": "string",
    "userType": "string", // "buyer" or "seller"
    "isVerified": "boolean", // Admin-verified status for sellers
    "profileImage": "string", // Optional
    "joinedAt": "Date"
  }
  )