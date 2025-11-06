import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: { applications: [] },
  },
  reducers: {
    setAllApplicants: (state, action) => {
      console.log("🧩 Redux storing applicants:", action.payload);
      state.applicants = action.payload || { applications: [] };
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
