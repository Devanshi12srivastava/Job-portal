import React, { useEffect } from "react";
import Navbar from "../ui/shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import axios from "axios";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        console.log("🟢 API Response:", res.data);
        if (res.data.success) {
         
       dispatch(setAllApplicants({ applications: res?.data?.job?.applications?.applicant }));

        }
      } catch (error) {
        console.log("❌ Fetch applicants error:", error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  const applications = applicants?.application || []; // ✅ safe access

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applications.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
