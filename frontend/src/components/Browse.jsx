import React, { useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import JobDisplay from "./JobDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-3 sm:px-4">
        <h1 className="font-bold text-xl sm:text-2xl my-5 sm:my-10 text-fuchsia-700">
          Search Results
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {allJobs.map((job) => (
            <JobDisplay key={job?._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Browse;
