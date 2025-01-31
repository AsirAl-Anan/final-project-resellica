import { Router } from "express";
import registrationController from "../controllers/registrationController.js";

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
