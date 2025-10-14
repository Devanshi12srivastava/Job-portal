import React from "react";
import { Button } from "../button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
       toast.error(error.response?.data?.message || "Logout failed. Please try again.");  
      toast.error(error.response.data.message);
    }
  };

  const role = user?.role || "student";

  return (
    <div className="-m-4">
      <div className="flex flex-wrap items-center justify-between mx-auto max-w-7xl h-auto px-4 sm:px-6 md:h-16">
        {/* Logo */}
        <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-900">
            Hire<span className="text-[#F83002]">Flow</span>
          </h1>
        </div>

        {/* Links + Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <ul className="flex flex-col sm:flex-row font-medium items-center gap-3 sm:gap-6">
            {role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="text-sm sm:text-base">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="text-sm sm:text-base">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="text-2xl font-semibold text-fuchsia-700 ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-2xl font-semibold text-fuchsia-700 ">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="text-2xl font-semibold text-fuchsia-700 ">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Link to="/login" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500 text-white px-3 py-2 rounded-md transition-all duration-300 text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500 text-white px-3 py-2 rounded-md transition-all duration-300 text-sm">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 sm:w-80">
                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-200 border border-gray-300 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 h-auto sm:h-46">
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-center mb-2 sm:mb-3 text-center sm:text-left">
    <Avatar className="w-14 h-14 ring-2 ring-purple-400 shadow-md mx-auto sm:mx-2">
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="rounded-full object-cover"
      />
    </Avatar>

    <div className="overflow-hidden">
      <h4 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
        {user?.fullname}
      </h4>
      <p className="text-xs sm:text-sm text-gray-600 truncate">
        {user?.profile?.bio}
      </p>
    </div>
  </div>

  <div className="flex flex-col sm:flex-col my-2 sm:my-3 text-gray-700 text-sm gap-2 sm:gap-3 items-center sm:items-start">
    {role === "student" && (
      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors duration-200">
        <User2 size={16} className="text-purple-500" />
        <Button variant="link" className="p-0 text-sm font-medium">
          <Link to="/profile">View Profile</Link>
        </Button>
      </div>
    )}

    <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-red-600 transition-colors duration-200">
      <LogOut size={16} className="text-red-500" />
      <Button
        onClick={logoutHandler}
        variant="link"
        className="p-0 text-sm font-medium"
      >
        Logout
      </Button>
    </div>
  </div>
</div>


              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;