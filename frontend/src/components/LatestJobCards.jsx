import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCards = ({job}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job?._id}`)} className='p-4 sm:p-5 rounded-md shadow-xl bg-purple-100 border-2 border-gray-100 cursor-pointer hover:bg-purple-50 transition-all duration-300 w-full max-w-xs mx-auto'>
      {/* Company */}
     <div className="flex flex-col">
  {/* Horizontal row for logo + name */}
  <div className="flex items-center gap-2">
    <Avatar className="w-10 h-10">
      {job?.company?.logo ? (
        <AvatarImage src={job?.company?.logo} />
      ) : (
        <div className="flex items-center justify-center bg-purple-500 text-white font-bold rounded-full w-10 h-10">
          {job?.company?.name?.charAt(0)?.toUpperCase() || "C"}
        </div>
      )}
    </Avatar>
    <h1 className="font-semibold text-lg sm:text-xl text-purple-900 truncate">
      {job?.company?.name}
    </h1>
  </div>

  {/* Location below */}
  <p className="text-xs sm:text-sm text-gray-600 mt-1 text-left">
    {job?.location}
  </p>
</div>


      {/* Job Title */}
      <div className='mt-2 sm:mt-2'>
        <h1 className='font-bold text-base sm:text-lg text-left text-red-800 truncate'>{job?.title}</h1>
        <p className='text-xs sm:text-sm text-gray-600 text-left line-clamp-3'>
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap items-center gap-2 mt-3'>
        <Badge className="text-purple-800 font-bold" variant="ghost">{job?.position} position</Badge>
        <Badge className="text-red-600 font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-red-800" variant="ghost">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
