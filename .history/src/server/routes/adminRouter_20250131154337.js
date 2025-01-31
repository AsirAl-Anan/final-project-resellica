import { Router } from "express";

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

 admin
// Backend: controllers/AdminControllers/userManagementController.js
import userModel from "../../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()
      .select('username email role points createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

 export default adminRouter 