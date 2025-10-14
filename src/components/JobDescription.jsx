import React, {useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitalyApplied =
    singleJob?.applications?.some(
      (application) => application?.applicant === user?._id
    ) || false;
  const [isApplied, setApplied] = useState(isInitalyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
  try {
    if (!jobId) {
      toast.error("Job ID not found.");
      return;
    }

    const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
      withCredentials: true,
    });

    console.log(res.data);

    if (res.data.success) {
      setApplied(true);
      const updateSingleJob = {
        ...singleJob,
        applications: [...singleJob.applications, { applicant: user?._id }],
      };
      dispatch(setSingleJob(updateSingleJob));
      toast.success(res.data.message);
    }
  } catch (error) {
    console.error("Apply job error:", error);
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};


  useEffect(() => {
    const fetchSinglejobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglejobs();
  }, [jobId, dispatch, user?._id]);
  return (
    <div className="text-left max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge className="text-purple-800 font-bold" variant="ghost">
              {singleJob?.position} position
            </Badge>
            <Badge className="text-red-600 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-green-900 font-bold" variant="ghost">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-800 hover:bg-purple-500 cursor-pointer"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
        {" "}
        {singleJob?.description}
      </h1>
      <div className="my-4">
        <h1 className="font-semibold my-1">
          Role:<span className="pl-4 text-gray-800">{singleJob?.title}</span>
        </h1>
        <h1 className="font-semibold my-1">
          Location:
          <span className="pl-4 text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-semibold my-1">
          Description:<span className="pl-4 text-gray-800"></span>
          {singleJob?.description}
        </h1>
        <h1 className="font-semibold my-1">
          Experience:
          <span className="pl-4 text-gray-800">
            {singleJob?.experienceLevel}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Salary:<span className="pl-4 text-gray-800">{singleJob?.salary}</span>
        </h1>
        <h1 className="font-semibold my-1">
          Type:<span className="pl-4 text-gray-800">{singleJob?.jobType}</span>
        </h1>
        <h1 className="font-semibold my-1">
          Total Applicants:
          <span className="pl-4 text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Posted:
          <span className="pl-4 text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
