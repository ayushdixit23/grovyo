"use client";
import React, { useState, useEffect } from "react";
import { MdLinkedCamera } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputOTPPattern } from "@/components/ui/InputOTPPattern";
import toast from "react-hot-toast";
import {
  initOTPless,
  phoneAuth,
  verifyOTP,
} from "@/app/(utitlies)/utils/otpUtils";
import axios from "axios";
import { API } from "@/Essentials";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileNoPattern = /^[0-9]{10}$/;

const Page = () => {
  const [formData, setFormData] = useState({
    profileImg: null,
    fullName: "",
    username: "",
    dob: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    bio: "Hi, I am on Grovyo",
    gender: "Male",
  });
  const [isValidUserName, setIsValidUserName] = useState(null);
  const { setData, setAuth } = useAuthContext();
  const router = useRouter();
  const [form, setForm] = useState("register");
  const [errors, setErrors] = useState({});
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    initOTPless(() => {
      console.log("OTPless initialized");
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUserNameChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      username: value,
    }));

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        checkUserNameValidity(value);
      }, 1000)
    );
  };

  const cookiesSetter = (res) => {
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

      router.push("/main/feed/newForYou");
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username) {
        toast.error("Please Enter Username first");
      }

      if (!formData.fullName) {
        toast.error("Please Enter fullname first");
      }

      if (!formData.fullName) {
        toast.error("Please Enter DOB first");
      }

      const [year, month, day] = formData.dob.split("-");
      const formattedDOB = `${day}/${month}/${year}`;

      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", 91 + formData.mobileNo);
      formDataToSend.append("fullname", formData.fullName);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("dob", formattedDOB);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("image", formData.profileImg);

      const res = await axios.post(`${API}/createUser`, formDataToSend);
      if (res.data.success) {
        cookiesSetter(res);
        toast.success("Signup successful!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImg: file,
      }));
    }
  };

  const handleDOBChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const validateForm = () => {
    let validationErrors = {};

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (!emailPattern.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!mobileNoPattern.test(formData.mobileNo)) {
      validationErrors.mobileNo = "Mobile number must be 10 digits";
    }

    if (formData.username && !isValidUserName) {
      validationErrors.username = "Username already exits";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const checkIfEmailOrPhoneExists = async () => {
    try {
      const res = await axios.post(`${API}/checkIfEmailOrPhoneExists`, {
        email: formData.email,
        phone: 91 + formData.mobileNo,
      });
      if (res.data.success) {
        await phoneAuth(formData.mobileNo);
        setForm("otp");
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form === "register") {
      if (validateForm()) {
        setLoading(true);
        try {
          await checkIfEmailOrPhoneExists();
        } catch (error) {
          toast.error(error.message || "Error requesting OTP");
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Form Validation Failed");
      }
    } else if (form === "otp") {
      if (!otpSent) {
        toast.error("Please request OTP first");
        return;
      }
      setLoading(true);
      try {
        const verified = await verifyOTP(formData.mobileNo, otpCode);
        if (verified) {
          toast.success("OTP Verified Successfully");
          await createUser(e);
        } else {
          toast.error("OTP Verification Failed");
        }
      } catch (error) {
        console.error(
          "OTP Verification Error: ",
          error.message,
          error.response || error
        );
        toast.error("An error occurred during OTP verification");
      } finally {
        setLoading(false);
      }
    }
  };

  const checkUserNameValidity = async (username) => {
    if (!username) return; // If no username, don't call the API

    try {
      const res = await axios.post(`${API}/checkusername`, { username });

      if (res.data.success) {
        if (res.data.userexists) {
          setIsValidUserName(false); // Username exists
          setErrors({ username: "Username already Exits" });
        } else {
          setIsValidUserName(true); // Username is available
          setErrors({ username: null });
        }
      }
    } catch (error) {
      console.log("Error checking username", error);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.username &&
      formData.dob &&
      formData.email &&
      formData.profileImg &&
      formData.mobileNo &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  // const handleResendOTP = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  //     await phoneAuth(formData.mobileNo);
  //     setOtpSent(true);
  //     toast.success("OTP resent successfully");
  //   } catch (error) {
  //     toast.error(error.message || "Error resending OTP");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container flex items-center h-full justify-center w-full ">
      <div className="flex flex-col justify-center items-center max-h-[85%] overflow-y-scroll no-scrollbar sm:bg-[#E9E9E9] sm:dark:bg-[#242729f3] rounded-2xl  p-5 w-full max-w-[430px]">
        {form === "register" ? (
          <form onSubmit={handleSubmit} className="w-full gap-4 flex flex-col ">
            <label
              htmlFor="imageInput"
              className="relative group cursor-pointer mb-1 flex justify-center"
            >
              <div className="w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center border border-[#555555] border-dashed">
                {formData.profileImg ? (
                  <img
                    src={URL.createObjectURL(formData.profileImg)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MdLinkedCamera className="text-3xl text-white" />
                )}
              </div>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {formData.profileImg && (
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => document.getElementById("imageInput").click()}
                  className="bg-transparent text-white border-none text-xs font-bold py-2 hover:bg-transparent px-4 rounded "
                >
                  Change
                </Button>
              </div>
            )}

            <div className="flex flex-col justify-start w-full ">
              <h3 className="text-3xl font-semibold mb-4 text-white">
                Sign up
              </h3>
              <p className="text-xs text-white/60 mb-4">
                Let's get you all set up so you can access your personal
                account.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex gap-2 ">
                  <Input
                    className={` border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex gap-2 ">
                  <Input
                    className={`w-full  px-4 py-2 border ${
                      errors.username ? "border-red-500" : "border-[#363A3D]"
                    } focus:border-[#9B9C9E] bg-[#1A1D21] text-white rounded-md focus:outline-none`}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleUserNameChange}
                  />

                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleDOBChange(e.target.value)}
                    className={`w-full px-4 text-sm py-1 border ${
                      errors.dob ? "border-red-500" : "border-[#363A3D]"
                    } focus:border-[#9B9C9E] bg-[#1A1D21] text-white rounded-md focus:outline-none`}
                  />
                </div>

                {errors.username && (
                  <p className="text-red-500 text-xs -mt-2">
                    {errors.username}
                  </p>
                )}

                <div className="flex gap-2 ">
                  <Input
                    className={`w-1/2  border ${
                      errors.email ? "border-red-500" : "border-[#363A3D]"
                    } focus:border-[#9B9C9E] bg-[#1A1D21] text-white`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    className={`w-1/2  border ${
                      errors.mobileNo ? "border-red-500" : "border-[#363A3D]"
                    } focus:border-[#9B9C9E] bg-[#1A1D21] text-white`}
                    type="tel"
                    name="mobileNo"
                    placeholder="Mobile No."
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                )}
                {errors.mobileNo && (
                  <p className="text-red-500 text-sm mb-2">{errors.mobileNo}</p>
                )}

                <div className="flex gap-2 text-sm ">
                  <div
                    onClick={() => setFormData({ ...formData, gender: "Male" })}
                    className={`px-7 p-2 mb-2 w-full cursor-pointer flex justify-center items-center border border-[#363A3D]  rounded-lg ${
                      formData.gender === "Male"
                        ? "bg-[#0366D6]"
                        : "bg-[#1A1D21]"
                    }`}
                  >
                    Male
                  </div>
                  <div
                    onClick={() =>
                      setFormData({ ...formData, gender: "Female" })
                    }
                    className={`px-7 p-2 mb-2 w-full cursor-pointer flex justify-center items-center border border-[#363A3D]  rounded-lg ${
                      formData.gender === "Female"
                        ? "bg-[#0366D6]"
                        : "bg-[#1A1D21]"
                    }`}
                  >
                    Female
                  </div>
                  <div
                    onClick={() =>
                      setFormData({ ...formData, gender: "Other" })
                    }
                    className={`px-7 p-2 mb-2 w-full cursor-pointer flex justify-center items-center border border-[#363A3D]  rounded-lg ${
                      formData.gender === "Other"
                        ? "bg-[#0366D6]"
                        : "bg-[#1A1D21]"
                    }`}
                  >
                    Other
                  </div>
                </div>

                <div className="flex gap-2 ">
                  <Input
                    className={` border ${
                      errors.password ? "border-red-500" : "border-[#363A3D]"
                    } focus:border-[#9B9C9E] bg-[#1A1D21] text-white`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />

                  <Input
                    className={` border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-[#363A3D]"
                    } focus:border-[#9B9C9E] bg-[#1A1D21] text-white`}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm ">
                    {errors.confirmPassword}
                  </p>
                )}

                <Textarea
                  className="border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white "
                  name="bio"
                  placeholder="Bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`bg-[#0366D6] text-white w-full ${
                loading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || !isFormValid()}
            >
              {form === "register" ? "Submit" : "Verify OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col gap-1">
              <h3 className="text-3xl font-semibold  text-white">
                OTP Verification
              </h3>
              <p className="text-xs text-white/60 ">
                Please enter the OTP sent to your mobile number.
              </p>
            </div>

            <InputOTPPattern
              className=" border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white"
              value={otpCode}
              setValue={setOtpCode}
            />
            <Button
              type="submit"
              className={`bg-[#0366D6] text-white w-full mt-3 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Verify OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
