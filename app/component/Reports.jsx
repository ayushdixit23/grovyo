import Link from "next/link";
import React from "react";

const Reports = ({ handleReport, setReports, reports, href }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-bluedark rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <div className="text-2xl font-semibold mb-4 text-center">Reports</div>
        <div className="space-y-3 text-sm">
          <div
            onClick={() => {
              if (reports.includes("CopyRight Infringement")) {
                setReports(
                  reports.filter(
                    (report) => report !== "CopyRight Infringement"
                  )
                );
              } else {
                setReports([...reports, "CopyRight Infringement"]);
              }
            }}
            className={`p-3 ${
              reports.includes("CopyRight Infringement")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            CopyRight Infringement
          </div>
          <div
            onClick={() => {
              if (reports.includes("Harrassment")) {
                setReports(
                  reports.filter((report) => report !== "Harrassment")
                );
              } else {
                setReports([...reports, "Harrassment"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Harrassment")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Harrassment
          </div>
          <div
            onClick={() => {
              if (reports.includes("Nudity")) {
                setReports(reports.filter((report) => report !== "Nudity"));
              } else {
                setReports([...reports, "Nudity"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Nudity")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Nudity
          </div>
          <div
            onClick={() => {
              if (reports.includes("Sexual Content")) {
                setReports(
                  reports.filter((report) => report !== "Sexual Content")
                );
              } else {
                setReports([...reports, "Sexual Content"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Sexual Content")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Sexual Content
          </div>
          <div
            onClick={() => {
              if (reports.includes("Spam")) {
                setReports(reports.filter((report) => report !== "Spam"));
              } else {
                setReports([...reports, "Spam"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Spam")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Spam
          </div>
          <div
            onClick={() => {
              if (reports.includes("Violence")) {
                setReports(reports.filter((report) => report !== "Violence"));
              } else {
                setReports([...reports, "Violence"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Violence")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Violence
          </div>
          <div
            onClick={() => {
              if (reports.includes("Hate Speech")) {
                setReports(
                  reports.filter((report) => report !== "Hate Speech")
                );
              } else {
                setReports([...reports, "Hate Speech"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Hate Speech")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Hate Speech
          </div>
          <div
            onClick={() => {
              if (reports.includes("Other")) {
                setReports(reports.filter((report) => report !== "Other"));
              } else {
                setReports([...reports, "Other"]);
              }
            }}
            className={`p-3 ${
              reports.includes("Other")
                ? "bg-[#0077ff85]"
                : "bg-gray-200 dark:bg-[#1A1D21]"
            } rounded-lg  dark:text-white  text-gray-800 cursor-pointer`}
          >
            Other
          </div>
          <div className="flex justify-between mt-4">
            <Link
              onClick={() => {
                setReports([]);
              }}
              href={href}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </Link>
            <Link
              onClick={handleReport}
              href={href}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
