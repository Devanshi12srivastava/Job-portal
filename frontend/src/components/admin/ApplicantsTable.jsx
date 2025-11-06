import React from "react";
import { useSelector } from "react-redux";

const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);

  console.log("🟣 applicants from Redux:", applicants);

  if (!applicants || !Array.isArray(applicants.applications)) {
    return <p>Loading applicants...</p>;
  }

  const data = applicants.applications;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Applicants List</h2>

      {data.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Bio</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 border">{app.applicant?.fullname}</td>
                <td className="p-2 border">{app.applicant?.email}</td>
                <td className="p-2 border">{app.applicant?.phonenumber}</td>
                <td className="p-2 border">{app.applicant?.profile?.bio}</td>
                <td className="p-2 border">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicantsTable;
