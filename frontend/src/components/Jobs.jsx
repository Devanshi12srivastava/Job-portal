import React, { useEffect, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import JobDisplay from "./JobDisplay";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);

useEffect(() => {
  if (!searchedQuery || allJobs.length === 0) {
    setFilterJobs(allJobs);
    return;
  }

  const query = searchedQuery.toLowerCase().trim();

  // extract number from query (e.g. "12 LPA" -> 12)
  const numericQuery = parseFloat(query.replace(/[^\d.]/g, ""));

  const filtered = allJobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const description = job.description?.toLowerCase() || "";
    const location = job.location?.toLowerCase() || "";
    const experience = job.experience?.toString().toLowerCase() || "";
    const salary = job.salary; // keep as number

    // salary match logic
    let salaryMatch = false;
    if (!isNaN(numericQuery) && salary) {
      // simple logic: match if numericQuery is contained in salary
      // e.g. 12 LPA -> 12 -> 1200000
      salaryMatch = salary.toString().includes(numericQuery.toString());
    }

    return (
      title.includes(query) ||
      description.includes(query) ||
      location.includes(query) ||
      experience.includes(query) ||
      salaryMatch
    );
  });

  setFilterJobs(filtered);
}, [searchedQuery, allJobs]);



  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-1/5">
            <FilterCard />
          </div>

          {/* Right Job Cards Area */}
          <div className="flex-1 overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={job?._id}
                  >
                    {" "}
                    <JobDisplay job={job} />{" "}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
