import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: { applications: [] }, // 👈 fix shape
  },
  reducers: {
    setAllApplicants: (state, action) => {
      // ensure fallback even if API returns undefined
      state.applicants = action.payload || { applications: [] };
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
