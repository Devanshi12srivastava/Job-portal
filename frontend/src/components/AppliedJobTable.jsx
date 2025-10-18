import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow,TableBody,TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJObTAble = () => {
  const {allAppliedJobs}=useSelector(store=>store.job)
  return (
    <div>
      <Table>
        <TableCaption>
            A list of applied job
        </TableCaption>
        <TableHeader>
  <TableRow className="text-fuchsia-900 font-semibold">
    <TableHead className="px-3 sm:px-5 py-3 text-base sm:text-lg text-center border-b border-gray-300 text-fuchsia-900">
      Date
    </TableHead>
    <TableHead className="px-3 sm:px-5 py-3 text-base sm:text-lg text-center border-b border-gray-300 text-fuchsia-900">
      Job Role
    </TableHead>
    <TableHead className="px-3 sm:px-8 py-3 text-base sm:text-lg  border-b border-gray-300 text-fuchsia-900">
      Company
    </TableHead>
    <TableHead className="px-3 sm:px-8 py-3 text-base sm:text-lg text-right border-b border-gray-300 text-fuchsia-900">
      Status
    </TableHead>
  </TableRow>
</TableHeader>

        <TableBody>{
            allAppliedJobs.length<=0 ?<span> No applied Jobs</span> : allAppliedJobs.map((item)=>(
                <TableRow key={item?._id} >
                    <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                     <TableCell>{item?.job?.title}</TableCell>
                      <TableCell className="text-left">{item?.job?.company?.name}</TableCell>
                     <TableCell className="text-right"><Badge className={`${item?.status==='rejected'?'bg-red-500':item.status==='pending'?'bg-gray-500':'bg-green-500'}`}>{item.status.toUpperCase()}</Badge></TableCell>

                    
                </TableRow>
            ))
        }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJObTAble
