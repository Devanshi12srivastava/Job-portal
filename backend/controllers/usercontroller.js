import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber,password,role } = req.body;
    if (!fullname || !email || !phonenumber || !role) {
      return res.status(400).json({
        message: "please provide all required fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }
    const hashespass = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phonenumber,
      password:hashespass,
      role,
    });
    return res.status(201).json({
      message: "account created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "please provide all required fields",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Check role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      profile: user.profile,
      role: user.role, // ✅ Added
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // ✅ typo fixed (httpsOnly → httpOnly)
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateprofile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body || {};
    const file = req.file;
    const userId = req.id; // make sure your auth middleware sets this

    // 🔹 Find the user first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔹 Upload resume/file if provided
    if (file) {
      const fileUri = getDataUri(file);
      const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "jobPortalProfiles",       // folder in Cloudinary
        resource_type: "raw",              // for PDFs/DOCs
        public_id: originalNameWithoutExt, // keep original filename
        overwrite: true,                   // optional, replaces existing
      });

      console.log("✅ Cloudinary Upload Response:", cloudResponse);

      // Save URL and original name to MongoDB
      user.profile.resume = cloudResponse.secure_url; // DO NOT append .pdf
      user.profile.resumeOriginalName = file.originalname;
    }

    // 🔹 Update other profile fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map(s => s.trim());

    await user.save();

    // 🔹 Prepare response
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("❌ Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
