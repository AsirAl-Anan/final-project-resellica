import { Router } from "express";
import registrationController from "../controllers/userAuth/registrationController.js";
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

userRouter.route("/api/v1/:email").get(upload.none(),verifyUserToken, getUser);

userRouter.route("/api/v1/test/tester").get((req, res) => {
  console.log('All cookies:', req.cookies);
  console.log('Access Token:', req.cookies.accessToken);
  res.json({ cookiesReceived: !!req.cookies.accessToken });
});
userRouter.route("/api/v1/update/:username").post(  verifyUserToken,upload.single('avatar') , userUpdateController);
 

userRouter.route("/api/v1/getUserByUsername/:username").get(  verifyUserToken,upload.single() ,async (req,res)=>{
 const username = req.params.username
 const user = await userModel.findOne({ username: username });
 if (!user) return res.status(404).json(new ApiError(404, "User not found"));
 res.status(200).json(new ApiResponse(200, user, "user retrieved"));
 });

userRouter.route("/api/v1/getUserById/:userId").get(verifyUserToken, upload.none(), async (req, res) =>{
  const userId = req.params.userId
  console.log(userId)
 
 const user = await userModel.findById(userId)

 return res.status(200).json(new ApiResponse(200, user))
} )


export default userRouter;
