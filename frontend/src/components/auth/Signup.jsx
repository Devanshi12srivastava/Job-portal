import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFile = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-purple-800 text-2xl sm:text-3xl font-bold py-2 text-center">
        Signup to <span className="text-red-500">Hire Flow!</span>
      </h1>
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-[320px] sm:max-w-md md:max-w-lg border border-gray-300 bg-gray shadow-md rounded-md p-4 sm:p-6 my-6"
        >
          {/* Full Name */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Full Name
            </Label>
            <Input
              className="w-full my-2 text-sm"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter"
            />
          </div>

          {/* Email */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Email
            </Label>
            <Input
              className="w-full my-2 text-sm"
              type="text"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter"
            />
          </div>

          {/* Phone Number */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Phone Number
            </Label>
            <Input
              className="w-full my-2 text-sm"
              type="number"
              name="phonenumber"
              value={input.phonenumber}
              onChange={changeEventHandler}
              placeholder="Enter"
            />
          </div>

          {/* Password */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Password
            </Label>
            <Input
              className="w-full my-2 text-sm"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter"
            />
          </div>

          {/* Role & Profile */}
          <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

            
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4 flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 text-sm sm:text-base bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
            >
              Signup
            </Button>
          )}

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
