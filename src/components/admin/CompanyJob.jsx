import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/CompanySlice1";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminjob";

const CompanyJob = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name,role"
            onChange={(e) => setinput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-purple-900 hover:bg-purple-800 cursor-pointer"
          >
            post new jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default CompanyJob;
