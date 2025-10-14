import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
// import { setAllJobs } from "@/redux/jobSlice";


  // const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
  const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    console.log("✅ allJobs from Redux:", allJobs);
  
  return (
    <div className="max-w-7xl mx-auto my-16">
      <h1 className="text-4xl text-purple-900 font-bold ">
        {" "}
        Latest Job Openings!
        <span className="text-4xl text-red-500 font-bold"> Apply Fast</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-15">
                        {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }

      </div>
    </div>
  );
};


export default LatestJobs;
