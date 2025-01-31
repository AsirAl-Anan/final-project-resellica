import { Router } from "express";

import sellerModel from "../models/sellerModel.js";
import upload from "../middlewares/multer.js";


const sellerRouter = Router();

sellerRouter
  .route("/api/v1/register")
  .post(upload.none(), );

  sellerRouter
  .route("/api/v1/login")
  .post(upload.none(),);
  sellerRouter
  .route("/api/v1/get-seller")
  .post(upload.none(),async (req,res)=>{
   const {email} = req.body  
   const seller = await sellerModel.findOne({email})
   if(!seller){
    return res.status(404).json({message:"Seller not found"})
   }
   res.status(200).json({seller})
  });
