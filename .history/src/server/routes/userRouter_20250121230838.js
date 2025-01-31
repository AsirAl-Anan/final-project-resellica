import { Router } from "express";
import res
import userUpdateController from "../controllers/userAuth/userUpdateController.js";
import loginController from "../controllers/userAuth/loginController.js";
import upload from "../middlewares/multer.js";
import loginCheck from "../middlewares/loginMiddleware.js";
import verifyUserToken from "../middlewares/verifyUserToken.js";
import logOutController from "../controllers/userAuth/logOutController.js";
import regenerateToken from "../controllers/userAuth/regenerateToken.js";
import getUser from "../controllers/getUserController.js";
import ApiResponse from "../utils/apiResponse.js";
import userModel from "../models/userModel.js";
import ApiError from "../utils/apiError.js";
const userRouter = Router();

userRouter
  .route("/api/v1/register")
  .post(upload.none(), registrationController);

userRouter.route("/api/v1/update").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userUpdateController
);
userRouter
  .route("/api/v1/login")
  .post(upload.none(), loginCheck, loginController);
userRouter
  .route("/api/v1/logout")
  .post(upload.none(), verifyUserToken, logOutController);
userRouter
  .route("/api/v1/regenerate-token")
  .post(upload.none(), regenerateToken);


export default userRouter;
