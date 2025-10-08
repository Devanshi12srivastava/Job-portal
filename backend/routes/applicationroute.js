import express from "express";
import isAuthenticated from "../middlewares/isAuthenticates.js";
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controllers/applicationcontroller.js";
const router = express.Router();
router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);


export default router; 