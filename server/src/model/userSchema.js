import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Basic email format validation
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [{ token: {} }],
  },
  { timestamps: true, timeseries: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePass = async function (candidatePassword) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateAccessToken = function () {
  try {
    const token = Jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
     process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return token;

  } catch (error) {
    throw new Error(errorMessages.accessTokenExpired);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
