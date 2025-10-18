import { createSlice } from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./CompanySlice1";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminjobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
       searchedQuery:"",
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminjobs: (state, action) => {
      state.allAdminjobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminjobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;
