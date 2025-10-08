import express from "express";
import { login, register, logout,updateprofile } from "../controllers/usercontroller.js";
import isAuthenticated from "../middlewares/isAuthenticates.js";
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,updateprofile);


export default router; 