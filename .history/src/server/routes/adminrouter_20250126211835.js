import { Router } from "express";


import upload from "../middlewares/multer.js";
import adminLoginController from "../controllers/AdminControllers/AdminLoginController.js";
import adminRegistrationController from "../controllers/AdminControllers/AdminRegisterController.js";
const adminRouter = Router();

adminRouter
  .route("/api/v1/login")
  .post(upload.none(), adminLoginController);

  adminRouter
  .route("/api/v1/register")
  .post(upload.none(),(req,res,next)=>{
    console.log(req.body)
  } ,adminRegistrationController);
 

 export default adminRouter 