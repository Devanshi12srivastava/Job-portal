import React from "react";
import Navbar from "./ui/shared/Navbar";
import JobDisplay from "./JobDisplay";
import FilterCard from "./FilterCard";

const Jobs = () => {
  const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15];
  return (
    <div>
      <Navbar />
     <div className="max-w-7xl mx-auto mt-5 px-4">
  <div className="flex gap-6">
    {/* Left Sidebar */}
    <div className="w-1/5">
      <FilterCard />
    </div>

    {/* Right Job Cards Area */}
    <div className="flex-1 overflow-y-auto pb-5">
      {jobsArray.length <= 0 ? (
        <span>Job Not Found</span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobsArray.map((item, index) => (
            <JobDisplay key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  </div>
  
</div>


    </div>
  );
};

export default Jobs;
