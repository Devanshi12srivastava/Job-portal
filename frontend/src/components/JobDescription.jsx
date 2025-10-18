import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Briefcase, MapPin, DollarSign, Users, Calendar } from "lucide-react";

const JobDescription = () => {
  const navigate=useNavigate()
  const { id: jobId } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setApplied] = useState(false);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      if (!jobId) return toast.error("Job ID not found.");

      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setApplied(
            res.data.job.applications?.some((app) => app.applicant === user?._id) || false
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Title + Apply Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Button variant="outline" className="cursor-pointer" onClick={()=>navigate('/jobs')}>Back</Button>
        <h1 className="text-3xl font-bold text-red-800">{singleJob?.title}</h1>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 font-semibold ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-600 text-white cursor-pointer"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge className="bg-purple-100 text-purple-800 font-semibold">{singleJob?.position} Position</Badge>
        <Badge className="bg-red-100 text-red-600 font-semibold">{singleJob?.jobType}</Badge>
        <Badge className="bg-green-100 text-green-900 font-semibold">{singleJob?.salary} LPA</Badge>
      </div>

      {/* Job Info */}
      <div className="space-y-4 text-gray-800">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <span className="font-medium ">Role:</span> {singleJob?.title}
        </div>
        <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-left">Job Description</h2>
        <p className="text-gray-700 text-left">{singleJob?.description}</p>
      </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Location:</span> {singleJob?.location}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Salary:</span> {singleJob?.salary} LPA
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Experience:</span> {singleJob?.experienceLevel} Years
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Applicants:</span> {singleJob?.applications?.length || 0}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Posted On:</span> {singleJob?.createdAt?.split("T")[0]}
        </div>
      </div>

      {/* Description */}
      
    </div>
  );
};

export default JobDescription;
