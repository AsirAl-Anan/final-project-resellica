import userModel from "../../models/userModel";
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