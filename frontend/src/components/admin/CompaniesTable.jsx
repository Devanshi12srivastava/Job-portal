import React, { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
const companies = useSelector(
  (store) => store.company?.companies ?? []
);
const searchCompanyByText = useSelector(
  (store) => store.company?.searchCompanyByText ?? ""
);
const navigate=useNavigate()
const [filterCompany,setfilterCompany]=useState(companies);
   useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setfilterCompany(filteredCompany);
    },[companies,searchCompanyByText])


  return (
    <div>
      <Table className="mx-auto">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead  className="text-lg">Logo</TableHead>
            <TableHead className="text-lg">Name</TableHead>
            <TableHead  className="text-lg">Date</TableHead>
            <TableHead  className="text-lg text-right pr-10">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No Companies
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id || company.name} className="text-left">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="mr-10" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 ">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)}className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4 cursor-pointer" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
