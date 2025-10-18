import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Postjob = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setinput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 w-[800px] border border-gray-300 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2">
            <div className="p-2">
              <Label className="text-lg">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="p-2">
              <Label className="text-lg">No. of position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>
          {companies.length > 0 && (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem
                      key={company._id}
                      value={company?.name?.toLowerCase()}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-[380px] my-5 text-sm sm:text-base bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
            >
              Post
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Postjob;
