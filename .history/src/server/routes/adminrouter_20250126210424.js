import { Router } from "express";


import upload from "../middlewares/multer.js";
import adminLoginController from "../controllers/AdminControllers/AdminLoginController.js";
import admin
const adminRouter = Router();

adminRouter
  .route("/api/v1/register")
  .post(upload.none(), );

  adminRouter
  .route("/api/v1/login")
  .post(upload.none(),adminLoginController);
 

 export default adminRouter 