import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
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
      <h1 className="text-purple-800 text-2xl sm:text-3xl font-bold my-6 sm:my-8 text-center">
        Login to <span className="text-red-500">Hire Flow!</span>
      </h1>
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-[320px] sm:max-w-md md:max-w-lg border border-gray-300 bg-gray shadow-md rounded-md p-4 sm:p-6 my-6"
        >
          {/* Email */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Email
            </Label>
            <Input
              className="w-full my-2 text-sm"
              type="email"
              name="email"
              value={input.email}
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

          {/* Role */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
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
              Login
            </Button>
          )}

          <p className="text-center text-sm mt-2">
            Do not have account?{" "}
            <Link to="/signup" className="text-blue-800 font-medium">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
