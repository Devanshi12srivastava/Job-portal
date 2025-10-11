import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className=" w-full">
      <div className="flex flex-wrap items-center justify-between mx-auto max-w-7xl px-4 py-2  sm:py-2">
        {/* Left: Logo */}
        <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Hire<span className="text-[#f80237] drop-shadow-md">Flow</span>
          </h1>
        </div>

        {/* Right: Navigation & User */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-8 md:gap-12 w-full sm:w-auto">
          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-medium text-sm sm:text-base">
            {["Home", "Jobs", "Browse"].map((link) => (
              <li
                key={link}
                className="text-lg sm:text-xl font-semibold text-purple-800 hover:text-purple-600 transition duration-300 relative"
              >
                <Link
                  to={link === "Home" ? "/" : link.toLowerCase()}
                  className="after:block  after:bg-purple-800 after:transition-all hover:after:w-full"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login / Signup or User Popover */}
          {!user ? (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2 sm:mt-0">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500 text-white px-4 py-2 rounded-md hover: transition-all duration-300 text-sm cursor-pointer sm:text-base">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-70 hover:to-pink-500 text-white px-4 py-2 rounded-md  hover: transition-all duration-300 text-sm cursor-pointer sm:text-base">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all duration-200">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 sm:w-80 py-4 mx-2 sm:mx-3.5 rounded-lg shadow-lg border border-gray-100">
                <div className="flex gap-4 items-center mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-800">Job Portal</h4>
                    <p className="text-sm text-gray-500">Welcome back!</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-purple-700 transition">
                    <User2 />
                    <Button variant="link" className="text-sm sm:text-base">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-purple-700 transition">
                    <LogOut />
                    <Button variant="link" className="text-sm sm:text-base">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-2" />
    </div>
  );
};

export default Navbar;
