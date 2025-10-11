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
            <TableRow className="px-10">
                <TableHead className="px-5">Date</TableHead>
                <TableHead className="px-5">Job role</TableHead>
                <TableHead className="px-8">Company</TableHead>
                <TableHead className="text-right px-8">Status</TableHead>
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
