import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "New Delhi",
      "Noida",
      "Mumbai",
      "Lucknow",
      "Gurgaon",
      "Pune",
      "Banglore",
      "Hydrabad",
      "Allahabad",
      "Kanpur",
      "Indore",
      "surat",
      "Jhamshedpur",
      "Trichy",
      "Warangal",
      "Surathkal",
      "Patna",
      "Gwaliaor",
      "Kerala",
      "Chennai",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "MERN Stack Developer",
       "Graduate Engineer",
      "AI/ML Engineer",
      "Software Develoer",
      "Frontend Developer",
      "Full Stack Developer",
      "Payment Systems Engineer",
     " Cloud Engineer",
      " Product Manager",
      "UI/UX Engineer",
      "DevOps Developer",
      " Cybersecurity Analyst",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "3 LPA",
      "5 LPA",
      "8 LPA",
      "10 LPA",
      "4 LPA",
      "12 LPA",
      "15 LPA",
      "20 LPA",
      "25 LPA",
      "30 LPA",
    ],
  },
  {
    filterType: "Experience",
    array: [
      "0 Years",
      "1 Years",
      "2 Years",
      "25 Years",
      "5  Years",
      "10 Years",
      "12 Years",
      "Internship",
      ,
    ],
  },
];

const FilterCard = () => {
  const [selectValue, setSelectValue] = useState("");
  const dispatch = useDispatch();
  const handlerChange = (value) => {
    setSelectValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectValue));
    console.log(selectValue);
  }, [selectValue]);

  return (
    <div className="w-full">
      <h1 className="mt-2 text-lg font-bold text-red-800 text-left">
        {" "}
        Filter Jobs
      </h1>
      <hr className="mt-3" />
      <RadioGroup value={selectValue} onValueChange={handlerChange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-medium text-lg text-left text-purple-950">
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-3">
                  <RadioGroupItem   className="w-5 h-5 border-2 border-purple-200 rounded-full relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400" value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
