import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-15">
        <span className=" mx-auto px-4 py-2 text-purple-900 text-2xl font-medium">
          Where ambition meets opportunity!
        </span>
        <h1 className="text-5xl font-bold text-purple-950">
          Your Career Adventure{" "}
          <span className="text-red-600">
            <br /> Starts Here
          </span>
        </h1>
        <h2 className="text-xl text-pink-950">
          Your career deserves the right path. Explore opportunities, connect
          with recruiters, and land your dream role😊
        </h2>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full "
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full hover:cursor-pointer bg-fuchsia-800"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
