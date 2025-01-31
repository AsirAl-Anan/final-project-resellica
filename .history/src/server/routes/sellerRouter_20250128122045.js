import { Router } from "express";
import sellerRegistrationController from "../controllers/SellerControllers/SellerRegistrationController.js";
import SellerLoginController from "../controllers/SellerControllers/SellerLoginController.js";
import sellerModel from "../models/sellerModel.js";
import upload from "../middlewares/multer.js";
import { addProduct } from "../controllers/SellerControllers/AddProductController.js";

const sellerRouter = Router();

sellerRouter
  .route("/api/v1/register")
  .post(upload.none(), sellerRegistrationController);

  sellerRouter
  .route("/api/v1/login")
  .post(upload.none(),SellerLoginController);
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

  sellerRouter.post('/api/v1/add-product', 
    upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'galleryImages', maxCount: 8 }
    ]),
    addProduct
  );
 
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
