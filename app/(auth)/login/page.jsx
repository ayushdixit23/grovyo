"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "../../../Essentials";
import { CgSpinner } from "react-icons/cg";
import Cookies from "js-cookie";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import { QRCodeSVG } from "qrcode.react";
import { RiLoader4Line } from "react-icons/ri";
import { reportErrorToServer } from "@/app/(utitlies)/utils/useful";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineMailOutline } from "react-icons/md";
import { useSocketContext } from "@/app/(utitlies)/utils/SocketWrapper";
import {
  initOTPless,
  phoneAuth,
  verifyOTP,
} from "@/app/(utitlies)/utils/otpUtils";
import { InputOTPPattern } from "@/components/ui/InputOTPPattern";

function page() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const emailOtpRef = useRef();
  const [showOTP, setShowOTP] = useState(false);
  const { setAuth, setData } = useAuthContext();
  const otpInputRef = useRef(null);
  const [change, setChange] = useState(1);
  const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [email, setEmail] = useState("ayush23@gmail.com");
  // // const [pass, setPass] = useState("12345678");
  const [load, setLoad] = useState(false);
  const [loadingqr, setLoadingqr] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");
  const { socket, socketId } = useSocketContext();
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");

  // const handleOtpChange = (otp) => {
  //   try {
  //     setOtp(otp);
  //   } catch (error) {
  //     toast.error("Something Went Wrong!");
  //     console.log(error);
  //   }
  // };

  // const handleEmailOtpChange = (otp) => {
  //   try {
  //     setEmailOtp(otp);
  //   } catch (error) {
  //     toast.error("Something Went Wrong!");
  //     console.log(error);
  //   }
  // };

  const verifyOtpEmail = async (e) => {
    e.preventDefault();
    try {
      if (emailOtp.length !== 6) {
        toast.error("Enter 6 digit otp!");
        return;
      }

      const data = {
        email,
        otp: emailOtp,
      };
      const res = await axios.post(`${API}/login/emailotplogin`, data);
      if (!res.data.success) {
        if (res.data.userexists === false) {
          toast.error("User Not Found!");
          return;
        } else if (res.data.otpSuccess === false) {
          toast.error("Otp Verification Failed!");
          return;
        } else {
          toast.error("Something Went Wrong!");
          return;
        }
      } else {
        const a = await cookiesSetter(res);
        if (a === true) {
          toast.success("Login successful");
          router.push("/main/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtpEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter the Email!");
      return;
    }
    try {
      const data = {
        email,
      };
      const res = await axios.post(`${API}/login/requestOtp`, data);
      if (!res.data.success) {
        if (res.data.emailFound === false) {
          toast.error("Email Not Found!");
          return;
        } else {
          toast.error("Something Went Wrong!");
          return;
        }
      } else {
        setShowEmailOtp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let otpCapture = document.getElementById("send-email-otp");
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (email) {
          sendOtpEmail(event);
        }
      }
    };

    if (otpCapture) {
      otpCapture.addEventListener("keypress", handleKeyPress);
    }
    return () => {
      if (otpCapture) {
        otpCapture.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [email]);

  useEffect(() => {
    const verifyOtp = emailOtpRef.current;
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (emailOtp.length === 6) {
          verifyOtpEmail(event);
        }
      }
    };

    if (verifyOtp) {
      verifyOtp.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (verifyOtp) {
        verifyOtp.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [emailOtp, emailOtpRef]);

  useEffect(() => {
    if (socketId) {
      setQRCodeValue(socketId);
    }
  }, [socketId]);

  useEffect(() => {
    socket?.on("qr-rec", async (id) => {
      setLoadingqr(true);
      const res = await axios.post(`${API}/login/webcheckqr`, {
        id,
      });
      if (res.data?.success) {
        const check = await cookiesSetter(res);
        if (check === true) {
          router.push("/main/feed/newForYou");
        }
        setTimeout(() => {
          setLoadingqr(false);
        }, 6000);
      }
    });

    return () => {
      socket?.off("qr-rec");
    };
  }, [socket]);

  console.log(socket?.id, "socket", qrCodeValue);

  const cookiesSetter = async (res) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      localStorage.setItem("username", res.data?.data?.username);

      Cookies.set("access_token", res.data.access_token, {
        expires: expirationDate,
      });
      Cookies.set("refresh_token", res.data.refresh_token, {
        expires: expirationDate,
      });

      setData(res.data?.data);
      setAuth(true);
      toast.success("Login Successfull!");
      router.push("/main/feed/newForYou");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchid = async () => {
    try {
      await axios
        .post(`${API}/login/webapplogin`, { phone: "91" + number })
        .then(async function (res) {
          if (res.data.success === true) {
            if (res.data.userexists) {
              await cookiesSetter(res);
            } else {
              toast.error("Seems like you don't have an account in the app.");
            }
          } else {
            toast.error("Something went wrong...");
          }
        })
        .catch(async function (error) {
          const data = {
            name: "POST",
            message: error?.message || "Unknown error",
            code: error.response?.status || "No status",
            path: `${API}/login/webapplogin`,
            syscall: error?.name || "Unknown syscall",
            stack: error?.stack || "No stack trace",
            userId: null,
            timestamp: new Date().toISOString(),
            platform: "web-app",
          };
          await reportErrorToServer(data);
          toast.error("Something went wrong...");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    setLoad(true);
    try {
      const res = await axios.post(`${API}/login/loginOnlyWithEmail`, {
        email,
      });
      if (res.data.success) {
        if (res.data.userexists) {
          await cookiesSetter(res);
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } else {
        toast.error("Wrong Details");
      }
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
    setLoad(false);
  };

  useEffect(() => {
    let otpCapture = document.getElementById("send-otp");
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (number.length === 10) {
          sendPhoneOtp(event);
        }
      }
    };

    if (otpCapture) {
      otpCapture.addEventListener("keypress", handleKeyPress);
    }
    return () => {
      if (otpCapture) {
        otpCapture.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [number]);

  useEffect(() => {
    const verifyOtp = otpInputRef.current;
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (otp.length === 6) {
          verificationOfPhone(event);
        }
      }
    };

    if (verifyOtp) {
      verifyOtp.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (verifyOtp) {
        verifyOtp.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [otp, otpInputRef]);

  useEffect(() => {
    initOTPless(() => {
      console.log("OTPless initialized");
    });
  }, []);

  const sendPhoneOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await phoneAuth(number);
    setLoading(false);
    setShowOTP(true);
    toast.success("Otp Sent Successfully!");
  };

  const verificationOfPhone = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const verified = await verifyOTP(number, otp);
      if (verified) {
        toast.success("OTP Verified Successfully");
        await fetchid();
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const phoneAuth = (e) => {
  //   e.preventDefault();

  //   if (number.length !== 10) {
  //     return toast.error("Please Enter 10 digit number");
  //   }
  //   setLoading(true);

  //   window?.OTPlessSignin.initiate({
  //     channel: "PHONE",
  //     phone: number,
  //     countryCode: "+91",
  //   });

  //   setLoading(false);
  //   setShowOTP(true);
  //   toast.success("Otp Sent Successfully!");
  // };

  // const verifyOTP = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const result = await window?.OTPlessSignin.verify({
  //       channel: "PHONE",
  //       phone: number,
  //       otp: otp,
  //       countryCode: "+91",
  //     });

  //     if (result.success) {
  //       await fetchid();
  //     } else {
  //       toast.error("OTP Verification Failed");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("OTP Verification Error:", error);
  //     toast.error("An error occurred during OTP verification");
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const callback = (userinfo) => {
  //   const mobileMap = otplessUser?.identities.find(
  //     (item) => item.identityType === "MOBILE"
  //   )?.identityValue;

  //   const token = otplessUser?.token;

  //   const mobile = mobileMap?.identityValue;
  // };

  // useEffect(() => initOTPless(callback), []);

  return (
    <div
      className="min-w-full flex justify-center
	items-center sm:h-screen h-full"
    >
      <div
        className={`${
          loadingqr
            ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
            : "hidden -z-50"
        } `}
      >
        <div className="animate-spin">
          <RiLoader4Line className="text-3xl" />
        </div>
      </div>
      <Toaster toastOptions={{ duration: 4000 }} />

      <div id="recaptcha-container"></div>

      <div className="lg:w-[55%] pn:max-sm:mt-6 max-w-[430px] md:w-[80%] sm:bg-[#E9E9E9] sm:dark:bg-[#242729f3] p-5 rounded-xl">
        <div className="h-full flex flex-col">
          <div className="mb-5 flex gap-3  justify-center  items-center flex-col">
            <div className="relative bg-white border-2 border-[#f3f3f3] dark:border-white p-3 rounded-lg">
              <QRCodeSVG
                style={{
                  width: "200px",
                  height: "200px",
                }}
                className="w-[180px] h-[180px]"
                value={qrCodeValue}
              />
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="max-w-[70%] text-sm font-medium text-black dark:text-[#E4E4E4] text-center">
                Use your phone camera to scan this code to log in instanly
              </div>
            </div>
            <div className="text-xl font-semibold">Sign in with QR code</div>

            <div className="flex  items-center justify-center w-full">
              <hr className="flex-grow border-t text-[#686B6E] border-[#363A3D] " />
              <span className="px-3  text-sm font-medium text-[#686B6E] bg-transparent ">
                or Sign in with
              </span>
              <hr className="flex-grow border-t text-[#686B6E] border-[#363A3D]" />
            </div>

            <div className="w-full flex justify-center flex-col items-center">
              <div className="flex justify-center items-center gap-2 w-full sm:w-[90%]">
                <div
                  onClick={() => {
                    if (showEmailOtp) {
                      return;
                    } else {
                      setChange(1);
                    }
                  }}
                  className={`flex ${
                    showEmailOtp ? "cursor-not-allowed" : "cursor-pointer"
                  } justify-center items-center  ${
                    change == 1
                      ? "bg-[#000000] text-white"
                      : "dark:bg-[#1A1D21] bg-[#DEE1E5] text-[#686B6E]"
                  } rounded-xl  text-sm p-2  w-full gap-3`}
                >
                  <div>
                    <FaPhoneAlt />
                  </div>
                  <div>Phone Number</div>
                </div>
                <div
                  onClick={() => {
                    if (showOTP) {
                      return;
                    } else {
                      setChange(2);
                    }
                  }}
                  className={`flex ${
                    showOTP ? "cursor-not-allowed" : "cursor-pointer"
                  } justify-center ${
                    change == 2
                      ? "bg-[#000000] text-white"
                      : "dark:bg-[#1A1D21] bg-[#DEE1E5] text-[#686B6E]"
                  }  text-sm p-2 items-center rounded-xl w-full gap-3`}
                >
                  <div>
                    <MdEmail />
                  </div>
                  <div>Email</div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-[90%]">
                {/* phone */}

                {showOTP ? (
                  <div className="mt-2 w-full flex flex-col gap-6 justify-center  items-center">
                    <div
                      ref={otpInputRef}
                      className=" w-full flex gap-4 justify-center mt-3 items-center"
                    >
                      <InputOTPPattern
                        size="w-12 h-12"
                        className=" border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white"
                        value={otp}
                        setValue={setOtp}
                      />
                    </div>
                    <div
                      //onClick={onSignup}
                      onClick={verificationOfPhone}
                      className="h-[50px] w-full select-none cursor-pointer bg-[#0066ff] flex items-center justify-center rounded-2xl text-white "
                    >
                      {loading && (
                        <CgSpinner size={20} className="m-1 animate-spin" />
                      )}
                      <span className={`${loading ? "hidden" : ""} `}>
                        Continue
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      change === 1
                        ? "flex justify-start flex-col w-full mt-2 items-start  py-4"
                        : "hidden"
                    }`}
                  >
                    <div className="w-full dark:bg-[#1A1D21] bg-[#DEE1E5] flex items-center rounded-2xl">
                      <div className="dark:text-white pl-2">+91</div>
                      <div className="h-[20px] ml-2 border-r border-[#acafb2]" />
                      <input
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            sendPhoneOtp(e);
                          }
                        }}
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Phone no."
                        className="h-[50px] w-full text-black dark:text-[#fff] outline-none dark:bg-[#1A1D21] bg-[#DEE1E5] rounded-r-2xl px-2 p-2 "
                      />
                    </div>

                    <div
                      className={`w-full ${change === 1 ? "py-3" : "hidden"} `}
                    >
                      <div
                        onClick={sendPhoneOtp}
                        // onClick={fetchid}
                        className="h-[50px] w-full select-none cursor-pointer bg-[#0066ff] flex items-center justify-center rounded-2xl text-white "
                      >
                        {loading && (
                          <CgSpinner size={20} className="m-1 animate-spin" />
                        )}
                        <span className={`${loading ? "hidden" : ""} `}>
                          Continue
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* email */}
                <div
                  className={`w-full flex flex-col mt-4 gap-2 ${
                    change === 2 ? "" : "hidden"
                  }`}
                >
                  {showEmailOtp && (
                    <>
                      <div
                        ref={otpInputRef}
                        className=" w-full flex gap-4 justify-center items-center"
                      >
                        <InputOTPPattern
                          size="w-7 h-7"
                          className=" border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white"
                          value={emailOtp}
                          setValue={setEmailOtp}
                        />
                      </div>
                      <div className="py-2 ">
                        <div
                          //onClick={onSignup}
                          onClick={verifyOtpEmail}
                          className="h-[50px] w-full select-none cursor-pointer bg-[#0066ff] flex items-center justify-center rounded-2xl text-white "
                        >
                          {loading && (
                            <CgSpinner size={20} className="m-1 animate-spin" />
                          )}
                          <span className={`${loading ? "hidden" : ""} `}>
                            Continue
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {showEmailOtp === false && (
                    <>
                      <div className="flex items-center rounded-2xl px-3 dark:bg-[#1A1D21] bg-[#DEE1E5]">
                        <div className="">
                          <MdOutlineMailOutline />
                        </div>
                        <input
                          id="send-email-otp"
                          type="email"
                          className=" w-full text-black dark:text-[#fff] placeholder:text-sm outline-none rounded-2xl dark:bg-[#1A1D21] bg-[#DEE1E5] p-3 px-2"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="py-2 ">
                        <div
                          //onClick={onSignup}
                          onClick={sendOtpEmail}
                          // onClick={handleCreate}
                          className="h-[50px] w-full select-none cursor-pointer bg-[#0066ff] flex items-center justify-center rounded-2xl text-white "
                        >
                          {loading && (
                            <CgSpinner size={20} className="m-1 animate-spin" />
                          )}
                          <span className={`${loading ? "hidden" : ""} `}>
                            Continue
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* <div className="flex items-center rounded-2xl px-3 dark:bg-[#1A1D21] bg-[#DEE1E5]">
                    <div className="">
                      <RiLockPasswordLine />
                    </div>
                    <input
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          // onSignup();
                          handleCreate();
                        }
                      }}
                      type="password"
                      className=" w-full text-black dark:text-[#fff] placeholder:text-sm outline-none rounded-2xl dark:bg-[#1A1D21] bg-[#DEE1E5] p-3 px-2"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
