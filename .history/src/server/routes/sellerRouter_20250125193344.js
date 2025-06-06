import { Router } from "express";
import sellerRegistrationController from "../controllers/sellerRegistrationController.js";
import sellerModel from "../models/sellerModel.js";
import upload from "../middlewares/multer.js";


const sellerRouter = Router();

sellerRouter
  .route("/api/v1/register")
  .post(upload.none(), sellerRegistrationController);

  sellerRouter
  .route("/api/v1/login")
  .post(upload.none(), sellerRegistrationController);
  sellerRouter
  .route("/api/v1/get-seller")
  .post(upload.none(), (req,res)=>{
   const {email} = req.body  
   const seller = await se
  });

// userRouter.route("/api/v1/update").post(
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
//   ]),
 
// );
// userRouter
//   .route("/api/v1/login")
//   .post(upload.none(), loginCheck, loginController);
// userRouter
//   .route("/api/v1/logout")
//   .post(upload.none(), verifyUserToken, logOutController);
// userRouter
//   .route("/api/v1/regenerate-token")
//   .post(upload.none(), regenerateToken);


export default sellerRouter;
