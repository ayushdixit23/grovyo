"use client";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { API } from "@/Essentials";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState("");
  const router = useRouter();

  const path = usePathname();

  // const f = async (token) => {
  //   try {
  //     if (token) {
  //       const a = await checkToken(token)
  //       setData(a.payload)
  //       setAuth(true)
  //     } else {
  //       setAuth(false)
  //       setData("")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const sendTokenAndVerify = async () => {
  //   try {
  //     const token = Cookies.get("access_token");

  //     if (!token) {
  //       console.log("No token found in cookies.");
  //       return;
  //     }

  //     const res = await axios.get(`${API}/login/verifytoken/${token}`);
  //     if (res.data.success) {
  //       setData(res.data.data);
  //       setAuth(true);
  //     } else {
  //       Cookies.remove("access_token");
  //       router.push("/login");
  //     }
  //     console.log(res.data, "Response from token verification");
  //   } catch (error) {
  //     if (error.response.data.error === "Token expired") {
  //       toast.error(error.response.data.message);
  //     }
  //     Cookies.remove("access_token");
  //     router.push("/login");
  //   }
  // };

  const sendTokenAndVerify = async () => {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        console.log("No token found in cookies.");
        return;
      }

      const res = await axios.get(`${API}/login/verifytoken`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this header is set
        },
      });

      if (res.data.success) {
        setData(res.data.data);
        setAuth(true);
      } else {
        Cookies.remove("access_token");
        router.push("/login");
      }
    } catch (error) {
      if (path != "/") {
        if (error.response.data.error === "Token expired") {
          toast.error(error.response.data.message);
        }
      }
      Cookies.remove("access_token");
      router.push("/login");
    }
  };

  useEffect(() => {
    sendTokenAndVerify();
  }, []);

 

  const contextValue = useMemo(
    () => ({
      data,
      auth,
      setAuth,
      setData,
      // f,
    }),
    [data, auth]
  );

  // useEffect(() => {
  //   const token = Cookies.get("access_token") || null;
  //   f(token);
  // }, [setAuth, auth]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
