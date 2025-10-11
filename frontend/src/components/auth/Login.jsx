import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser} from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading}=useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        console.log(setUser);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally{
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-3 sm:px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-1/2 border border-gray-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center md:text-left">
            Login
          </h1>

          {/* Email */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Email
            </Label>
            <Input
              className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[380px] my-2 text-sm"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="enter"
            />
          </div>

          {/* Password */}
          <div className="my-2 flex flex-col items-start">
            <Label className="text-blue-900 font-medium text-base sm:text-lg md:text-xl mb-1">
              Password
            </Label>
            <Input
              className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[380px] my-2 text-sm"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="enter"
            />
          </div>

          {/* Role & Profile */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:m mt-4">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center justify-center md:justify-start gap-3">
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
              <div className="flex items-center space-x-2 ">
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
{
  loading ?<Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait </Button>: <Button type="submit" className="w-[380px] my-5 text-sm sm:text-base">
            Login
          </Button>

}
         
          <p className="text-center text-sm">
            Do not have account then?{" "}
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
