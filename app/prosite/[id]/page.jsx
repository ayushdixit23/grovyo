"use client";
import { API } from "@/Essentials";
// import { API } from "@/Essentials";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

function Page({ params }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodeUsernameAndNumber = useCallback((encodedString) => {
    return decodeURIComponent(encodedString);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API}/getprositefull`, {
        username: decodeUsernameAndNumber(params.id),
      });
      // const res = await axios.post(`${API}/product/getprositefull`, {
      //   username: decodeUsernameAndNumber(params.id),
      // });
      setData(res.data?.prosite);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.id, decodeUsernameAndNumber]);

  useEffect(() => {
    if (params.id) {
      fetchData();
    }
    // No cleanup needed for setting loading state
  }, [params.id, fetchData]);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] bg-slate-200 dark:bg-slate-800  flex justify-center items-center p-6">
        <div className="animate-pulse h-full w-full rounded-2xl overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[100vh] w-[100vw] bg-slate-400 flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-400 flex justify-center items-center">
      {data ? (
        <div
          dangerouslySetInnerHTML={{ __html: data }}
          className="h-full w-full"
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Page;
