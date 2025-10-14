import {createSlice} from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./CompanySlice1";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminjobs:[],
        singleJob:null,
        searchJobByText:"",
       
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAlllAdminjobs:(state,action)=>{
              state.allAdminjobs=action.payload 
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload
        }
    }
});
export const {setAllJobs,setSingleJob,setAlllAdminjobs,setSearchJobByText} = jobSlice.actions;
export default jobSlice.reducer;