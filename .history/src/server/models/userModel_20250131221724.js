import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

// Pre-save hook to hash password only if it's present
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Generate access token
userSchema.methods.generateAccessToken = async function () {
  const payLoad = {
    email: this.email,
    _id: this._id,
    username: this.username,
  };
  const accessToken = await jwt.sign(
    payLoad,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return accessToken;
};

// Generate refresh token
userSchema.methods.generateRefreshToken = async function () {
  const payLoad = {
    _id: this._id,
  };
  const refreshToken = await jwt.sign(
    payLoad,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15d" }
  );
  return refreshToken;
};

// Check password validity
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
