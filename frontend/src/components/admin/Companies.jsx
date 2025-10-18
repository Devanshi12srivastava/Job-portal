import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllcompanies from "@/hooks/useGetAllcompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/CompanySlice1";

const Companies = () => {
  useGetAllcompanies();
    const navigate=useNavigate();
    const[input,setinput]=useState("");
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    },[input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h4 className="font-bold text-xl text-fuchsia-800">
       Welcome to Your Hiring Workspace!😊</h4>
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit shadow-gray-400" placeholder="Filter by name.." onChange={(e)=>setinput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/companies/create")}className="bg-purple-900 hover:bg-purple-800 cursor-pointer" >
            New Company
          </Button>
         
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
