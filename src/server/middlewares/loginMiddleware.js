import ApiError from "../utils/apiError.js"
import userModel from "../models/userModel.js"


const loginCheck =async (req, res,next) =>{
 try{

 const {email, password} = req.body 

 // check if email or password is empty
 if(email.trim() ==="" ||  password.trim() === ""){
  return res.status(400).json(new ApiError(400, "Please fill all the input fields"))  
 }
 

 //check if user exists
 const existingUser = await userModel.findOne({email})

 if(!existingUser){
  return res.status(404).json(new ApiError(404, "User not found"))
 }
 const isPasswordCorrect =await existingUser.checkPassword(password)

 if(!isPasswordCorrect){
  return res.status(403).json(new ApiError(403, "Incorrect password"))
 }
 //generate Tokens
 const accessToken = existingUser.generateAccessToken()

 let refreshToken = existingUser.refreshToken

 if(!refreshToken || refreshToken.trim() === ""){
    refreshToken = await existingUser.generateRefreshToken()
 }
 existingUser.refreshToken = refreshToken
 await existingUser.save()
 
 req.accessToken = accessToken
 req.user = existingUser

 next()
 }catch(error){
   next(error)
 }
}

export default loginCheck