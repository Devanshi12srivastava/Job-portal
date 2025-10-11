import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="text-left max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Title</h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge className="text-purple-800 font-bold" variant="ghost">
              10 Position
            </Badge>
            <Badge className="text-red-600 font-bold" variant="ghost">
              Full Time
            </Badge>
            <Badge className="text-green-900 font-bold" variant="ghost">
              10 Lpa
            </Badge>
          </div>
        </div>
        <Button
          disable={isApplied}
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
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:<span className="pl-4 text-gray-800">Frontend Developer</span>
        </h1>
        <h1 className="font-bold my-1">
          Loaction:<span className="pl-4 text-gray-800">Delhi</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:<span className="pl-4 text-gray-800"></span>Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Aspernatur rerum, porro
          consequatur sequi nesciunt vitae alias perspiciatis, temporibus
          asperiores beatae et sint in odio expedita praesentium suscipit, vero
          reprehenderit eaque.
        </h1>
        <h1 className="font-bold my-1">
          Experience:<span className="pl-4 text-gray-800">Freshers</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:<span className="pl-4 text-gray-800">10Lpa</span>
        </h1>
        <h1 className="font-bold my-1">
          Type:<span className="pl-4 text-gray-800">Full time</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:<span className="pl-4 text-gray-800">2</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted:<span className="pl-4 text-gray-800">2 days ago</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
