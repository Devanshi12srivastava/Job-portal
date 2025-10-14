import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobDisplay = ({job}) => {
  const navigate= useNavigate();
  // const JobId="bhbbnnbn"


      const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

  return (
    <div className="p-5 my-8 rounded-xl shadow-md bg-purple-100 border  border-gray-200 w-full hover:shadow-lg transition cursor-pointer">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg" />
        </Avatar>
        <div>
          <h1 className="font-medium text-gray-800 text-left">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500 text-left">India</p>
        </div>
      </div>
      <div>
    <h1 className="font-bold text-lg my-2 text-left text-red-800">{job?.title}</h1>
    <h1 className="text-sm text-gray-700 text-left">{job?.description} </h1>
  </div>
   <div className='flex items-center gap-3 mt-4'>
    <Badge className="text-purple-800 font-bold b" variant="ghost">{job?.position}</Badge>
    <Badge className="text-red-600 font-bold" variant="ghost">{job?.type}</Badge>
    <Badge className="text-green-900 font-bold" variant="ghost">{job?.salary}</Badge>
    </div>
    <div className="flex items-center gap-4 mt-4">
      <Button variant="outline" className="cursor-pointer hover:bg-gray-200" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
      <Button className="bg-purple-800 hover:bg-purple-600 cursor-pointer">Save for Later</Button>
    </div>
    </div>
  );
};
export default JobDisplay;