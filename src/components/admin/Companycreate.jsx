import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../ui/shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/CompanySlice1";
import axios from "axios";
import { toast } from "sonner";

const Companycreate = () => {
    const navigate=useNavigate();
    const[companyName,setCompanyName]=useState("");
    const dispatch=useDispatch();
    const registerNewComapny = async()=>{
         try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto"></div>
      <div className="my-10">
        <h1>Company Name</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vero
          omnis officiis obcaecati alias illo{" "}
        </p>
      </div>
      <Label>company Name</Label>
      <Input type="text" className="my-2" placeholder="company" onChange={(e)=>setCompanyName(e.target.value)} />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
        <Button onClick={registerNewComapny}>Continue</Button>
      </div>
    </div>
  );
};

export default Companycreate;
