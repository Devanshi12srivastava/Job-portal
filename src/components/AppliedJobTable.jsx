import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow,TableBody,TableCell } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJObTAble = () => {
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
    <TableHead className="px-3 sm:px-8 py-3 text-base sm:text-lg text-left border-b border-gray-300 text-fuchsia-900">
      Company
    </TableHead>
    <TableHead className="px-3 sm:px-8 py-3 text-base sm:text-lg text-right border-b border-gray-300 text-fuchsia-900">
      Status
    </TableHead>
  </TableRow>
</TableHeader>

        <TableBody>{
            [1,2,3,4].map((item,index)=>(
                <TableRow key={index} >
                    <TableCell>12-10-25</TableCell>
                     <TableCell>Fullstack developer</TableCell>
                      <TableCell>Google</TableCell>
                     <TableCell className="text-right"><Badge>Selected</Badge></TableCell>

                    
                </TableRow>
            ))
        }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJObTAble
