import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    //check role

    if (role !== user.role) {
      return res.status(400).send({
        message: "Account doesnot exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true
      });
  } catch (error) {
    console.log(error);
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

    //cloudianry
    let skillsArray
    if(skills){
    skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    //updating data
    if(fullname) user.fullname= fullname
    if(email) user.email = email
     if(phonenumber) user.phonenumber = phonenumber
     if(bio) user.profile.bio = bio
     if(skills) user.profile.skills =  skillsArray
    

    //resume comes later
    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "profile updated",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
     return res.status(500).json({
    message: "Internal Server Error",
    success: false,
    error: error.message,
  });
  }
};
