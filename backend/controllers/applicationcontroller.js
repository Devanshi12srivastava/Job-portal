import { Application } from "../models/applicationmodel.js";
import { Job } from "../models/jobmodel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).send({
        message: "job id is required",
        success: false,
      });
    }
    //check if the user has alreay applied for job
    const existingApp = await Application.findOne({
      job: jobId,
      appliacant: userId,
    });
    if (existingApp) {
      return res.status(400).send({
        message: "you have already applied for the job",
        success: false,
      });
    }
    //check if job exist or not

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({
        message: "job not found",
        success: false,
      });
    }
    //create a new application
    const newAppliaction = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newAppliaction._id);
    await job.save();
    return res.status(201).send({
      message: "job applied",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).send({
        message: "No applications",
        success: false,
      });
    }
    return res.status(200).send({
      application,
      success: true,
    });
  } catch (error) {}
};
//admin dekhe ga kitna user ne apply kiya
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).send({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).send({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// reject or select

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).send({
        message: "status is required",
        success: false,
      });
    }
    //find application by applicanton id

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).send({
        message: "application not found",
        success: false,
      });
    }
    //update

    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).send({
      message: "updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
