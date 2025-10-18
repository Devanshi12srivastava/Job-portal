import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobDisplay = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-4 sm:p-5 my-4 sm:my-8 rounded-xl shadow-md bg-purple-100 border border-gray-200 w-full hover:shadow-lg transition cursor-pointer">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div className="flex-1">
          <h1 className="font-medium text-gray-800 text-left text-sm sm:text-base truncate">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 text-left truncate">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-base sm:text-lg my-1 sm:my-2 text-left text-red-800">
          {job?.title}
        </h1>
        <h1 className="text-xs sm:text-sm text-gray-700 text-left">
          {job.description.length > 135
            ? job.description.slice(0, 135) + "....."
            : job.description}{" "}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
        <Badge className="text-purple-800 font-bold" variant="ghost">
          {job?.position} position
        </Badge>
        <Badge className="text-red-600 font-bold" variant="ghost">
          {job?.type}
        </Badge>
        <Badge className="text-green-900 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex mt-3 sm:mt-4">
        <Button
          variant="outline"
          className="cursor-pointer w-full bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-shadow-white text-xs sm:text-sm"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default JobDisplay;
