// frontend/src/hooks/useGetAppliedJobs.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const useGetAppliedJobs = (jobId) => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    if (!jobId) return;

    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${jobId}/applicants`,
          { withCredentials: true }
        );

        // ✅ Defensive check added
        if (res.data.success && Array.isArray(res.data.applicants)) {
          dispatch(setAllAppliedJobs(res.data.applicants));
        } else {
          dispatch(setAllAppliedJobs([])); // fallback if undefined
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        dispatch(setAllAppliedJobs([]));
      }
    };

    fetchAppliedJobs();
  }, [jobId, searchedQuery]); // keep searchedQuery if needed

};

export default useGetAppliedJobs;
