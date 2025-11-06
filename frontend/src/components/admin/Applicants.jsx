import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllApplicants } from "../redux/applicationSlice";

const Applicants = () => {
  const dispatch = useDispatch();

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("/api/v1/job/get-job-applicants");
      console.log("📦 Full API response:", res.data);

      if (res.data.success) {
        const applications = res.data.job?.applications || [];
        console.log("✅ Dispatching applications:", applications);
        dispatch(setAllApplicants({ applications }));
      }
    } catch (error) {
      console.error("❌ Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Applicants</h2>
    </div>
  );
};

export default Applicants;
