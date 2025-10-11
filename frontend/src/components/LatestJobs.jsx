import React from "react";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
  const LatestJob = () => {};
  return (
    <div className="max-w-7xl mx-auto my-16">
      <h1 className="text-4xl text-purple-900 font-bold ">
        {" "}
        Latest Job Openings!
        <span className="text-4xl text-red-500 font-bold"> Apply Fast</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-15">
        {randomJob.slice(0,6).map((item, index) => (
          <LatestJobCards />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
