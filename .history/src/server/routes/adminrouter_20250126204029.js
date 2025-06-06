import { Router } from "express";

import sellerModel from "../models/sellerModel.js";
import upload from "../middlewares/multer.js";
import adminLoginController from "../controllers/AdminControllers/AdminLoginController.js";

const adminRouter = Router();

adminRouter
  .route("/api/v1/register")
  .post(upload.none(), );

  adminRouter
  .route("/api/v1/login")
  .post(upload.none(),);
  adminRouter
  .route("/api/v1/get-admin")
  .post(upload.none(),async (req,res)=>{
   const {email} = req.body  
   const seller = await sellerModel.findOne({email})
   if(!seller){
    return res.status(404).json({message:"Seller not found"})
   }
   res.status(200).json({seller})
  });

 export default adminRouter 