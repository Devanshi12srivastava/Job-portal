import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];
console.log("✅ ApplicantsTable component mounted");

const ApplicantsTable = () => {
 console.log("✅ Component mounted");
console.log("🧩 before useSelector");
const { applicants } = useSelector((store) => store.application);
console.log("🟢 after useSelector", applicants);
console.log("API Endpoint 👉", APPLICATION_API_END_POINT);


  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(applicants?.applications) &&
          applicants.applications.length > 0 ? (
            applicants.application.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="text-left">
                  {item?.applicant?.fullname || "N/A"}
                </TableCell>
                <TableCell className="text-left">
                  {item?.applicant?.email || "N/A"}
                </TableCell>
                <TableCell className="text-left">
                  {item?.applicant?.phonenumber || "N/A"}
                </TableCell>
                <TableCell className="text-left">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName ||
                        "View Resume"}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="text-left">
                  {item?.applicant?.createdAt
                    ? item.applicant.createdAt.split("T")[0]
                    : "N/A"}
                </TableCell>

                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer hover:font-medium"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="text-center py-6">
                No applicants yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
