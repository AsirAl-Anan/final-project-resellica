import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
   
    // "name": "string",
    // "email": "string",
    // "password": "string",
    // "userType": "string", // "buyer" or "seller"
    // "isVerified": "boolean", // Admin-verified status for sellers
    // "profileImage": "string", // Optional
    // "joinedAt": "Date"
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    {
        
    }
  }
  )