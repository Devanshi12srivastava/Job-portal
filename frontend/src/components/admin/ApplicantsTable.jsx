import React, { useEffect } from "react";
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

const ApplicantsTable = () => {
  // ✅ Mount check
  useEffect(() => {
    console.log("✅ Component mounted (ApplicantsTable)");
  }, []);

  console.log("🧩 Before useSelector");
  const { applicants } = useSelector((store) => store.application);
  console.log("🟢 After useSelector:", applicants);
  console.log("🌐 API Endpoint 👉", APPLICATION_API_END_POINT);

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
  const applications = applicants?.application || [];

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
          {applications.length > 0 ? (
            applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.phonenumber || "N/A"}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {item.applicant.profile.resumeOriginalName || "View Resume"}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt
                    ? item.applicant.createdAt.split("T")[0]
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">{item.status}</TableCell>
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
