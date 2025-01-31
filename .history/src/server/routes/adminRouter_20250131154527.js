import { Router } from "express";
import { getAllUsers,deleteUser } from "../controllers/AdminControllers/UserManagementController.js";
import createCategory from "../controllers/AdminControllers/createCategoryController.js";
import upload from "../middlewares/multer.js";
import adminLoginController from "../controllers/AdminControllers/AdminLoginController.js";
import adminRegistrationController from "../controllers/AdminControllers/AdminRegisterController.js";
import verifyUserToken from "../middlewares/verifyUserToken.js";
import getDashboardStats from "../controllers/AdminControllers/getDashBoardStats.js";

const adminRouter = Router();

adminRouter
  .route("/api/v1/login")
  .post(upload.none(), adminLoginController);

  adminRouter
  .route("/api/v1/register")
  .post(upload.none(),adminRegistrationController);
  adminRouter
  .route("/api/v1/create-category")
  .post(upload.none(),createCategory);
 adminRouter.route("/api/v1/dashboard-stats").get( getDashboardStats);

 adminRouter.route("/api/v1/users").get(verifyUserToken, );
// Backend: controllers/AdminControllers/userManagementController.js


 export default adminRouter 