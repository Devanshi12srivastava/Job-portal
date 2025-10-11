import React from 'react'
import { Badge } from "@/components/ui/badge"

const LatestJobCards = () => {
  return (
    <div className='p-4 sm:p-5 rounded-md shadow-xl bg-purple-100 border-2 border-gray-100 cursor-pointer hover:bg-purple-50 transition-all duration-300 w-full max-w-xs mx-auto'>
      {/* Company */}
      <div>
        <h1 className='font-semibold text-lg sm:text-xl text-left text-purple-900 truncate'>Company Name</h1>
        <p className='text-xs sm:text-sm text-gray-600 text-left'>India</p>
      </div>

      {/* Job Title */}
      <div className='mt-2 sm:mt-2'>
        <h1 className='font-bold text-base sm:text-lg text-left text-red-800 truncate'>Job Title</h1>
        <p className='text-xs sm:text-sm text-gray-600 text-left line-clamp-3'>
          Lorem ipsum dolor sit amet consectetur adipisicing sit amet consectetur adipisicing sit amet consectetur adipisicing.
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap items-center gap-2 mt-3'>
        <Badge className="text-purple-800 font-bold" variant="ghost">12 Position</Badge>
        <Badge className="text-red-600 font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-red-800" variant="ghost">10 Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
