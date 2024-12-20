"use client";
import React, { useEffect, useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import axios from "axios";
import { API } from "@/Essentials";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Products = ({ params }) => {
  const [data, setData] = useState(null);
  const { data: user, auth } = useAuthContext();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % (data?.images.length || 0));
  };
  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + data?.images.length) % (data?.images.length || 0)
    );
  };

  useEffect(() => {
    if (data && data.images && data.images.length > 1) {
      const interval = setInterval(nextSlide, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/fetchSingleProduct/${params?.id}`);
      setData(res.data.product);
      setId(res.data.product.creator);
      setUrl(res.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (auth) {
        const res = await axios.post(
          `${API}/addtocart/${user?.id}/${params?.id}`,
          {
            quantity: 1,
          }
        );
        if (res.data.success) {
          toast.success("Item added to cart!");
        }
      } else {
        toast.error("You are Not Logged In");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    try {
      if (auth) {
        const res = await axios.post(
          `${API}/addtocart/${user?.id}/${params?.id}`,
          {
            quantity: 1,
          }
        );
        if (res.data.success) {
          toast.success("Item added to cart!");
          router.push("/main/library/Cart");
        }
      } else {
        toast.error("You are Not Logged In");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleThumbnailClick = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    if (params?.id) {
      fetchProducts();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="h-[100vh] bg-white dark:bg-bluedark w-full pn:max-sm:flex-col flex flex-row-reverse items-center justify-between">
        <div className="h-full w-[50%] pn:max-sm:h-[50%] px-10 flex flex-col justify-center gap-2 items-start pn:max-sm:w-full">
          <div className="h-[40px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[10px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[10px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[10px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[10px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[10px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[10px] w-full bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-[40px] w-[100px] bg-slate-200 animate-pulse rounded-md"></div>
        </div>
        <div className="h-full pn:max-sm:h-[50%] w-[50%] px-10 flex flex-col justify-center gap-2 items-center pn:max-sm:w-full">
          <div className="h-[300px] w-[300px] bg-slate-200 animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-[2%] max-h-screen dark:bg-bluedark">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 p-[2%] md:w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-7 pn:max-md:gap-3 md:w-[95%]">
            <div className="md:col-span-1 pn:max-md:order-2 p-4 bg-white dark:bg-bluedark sm:bg-[#F6F6F6]">
              <div className="flex md:justify-center gap-4 items-center w-full md:flex-col">
                {data?.images?.map((d, i) => (
                  <div
                    onClick={() => handleThumbnailClick(i)}
                    key={i}
                    className="max-w-[70px] max-h-[70px]"
                  >
                    <img src={url + d?.content} alt="list" />
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden relative md:col-span-3 max-h-[600px] pn:max-md:order-1 bg-black w-[100%] rounded-xl ">
              {data?.images?.length > 1 && (
                <>
                  <div className="absolute top-0 left-0 w-full z-30 h-full">
                    <div className="flex justify-center h-full items-center">
                      <div className="flex justify-between items-center w-full px-4">
                        <div onClick={prevSlide} className="text-4xl">
                          <FaChevronLeft />
                        </div>
                        <div onClick={nextSlide} className="text-4xl">
                          <FaChevronRight />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center bottom-0 right-0 absolute pb-5 w-full z-40 ">
                    {data?.images?.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 duration-500 rounded-full mx-2 ${
                          index === activeSlide ? "bg-blue-500" : "bg-white"
                        }`}
                      ></div>
                    ))}
                  </div>
                </>
              )}
              <div
                className="relative flex z-20 h-full transition-transform duration-500 transform"
                style={{
                  transform: `translateX(-${activeSlide * 100}%)`,
                }}
              >
                {data?.images.map((slide, index) => (
                  <div
                    key={index}
                    className="h-full w-full flex-col object-contain flex-shrink-0 bg-lightgray flex items-center justify-center text-black text-2xl"
                  >
                    <img src={url + slide?.content} alt="hlo" />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 pn:max-md:order-3 p-[3%] sm:px-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <h1 className="sm:text-[27px] text-xl font-semibold text-[#3C4242] dark:text-white leading-snug lg:w-[100%]">
                    {data?.name}
                  </h1>
                  <div className="sm:text-2xl text-xl font-semibold">
                    ₹<del className="text-red-600">{data?.price}</del>{" "}
                    {data?.discountedprice}
                  </div>
                  <div className="text-sm flex py-2 pn:max-sm:hidden items-center gap-6">
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center gap-2  text-white p-2 px-9 rounded-xl bg-black justify-center"
                    >
                      <BsFillCartPlusFill />
                      <p>Add to cart</p>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="flex items-center gap-2 dark:bg-[#323d4e] cursor-pointer dark:text-white bg-white text-black border border-black p-2  px-9 rounded-xl"
                    >
                      BUY NOW
                    </button>
                  </div>
                  <div className="fixed bottom-0 left-0 w-full dark:bg-bluedark bg-white sm:hidden">
                    <div className="bg-white dark:bg-bluedark flex justify-center items-center gap-2 p-2 w-full">
                      <button
                        onClick={handleBuyNow}
                        className="text-sm p-3 px-4 cursor-pointer text-black dark:bg-[#323d4e] dark:text-white bg-white border border-black rounded-xl w-[50%]"
                      >
                        BUY NOW
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="text-sm p-3 px-4 flex justify-center items-center gap-2 text-white bg-black border border-black rounded-xl w-[50%]"
                      >
                        <BsFillCartPlusFill />
                        <p>Add to Cart</p>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full h-1 pn:max-sm:hidden border-t mt-5 border-black"></div>
                <div>
                  <div>
                    <h1 className="font-semibold py-2 text-sm">
                      Product Description :
                    </h1>
                    <div
                      style={{ marginBottom: "3rem" }}
                      className="font-medium text-sm"
                    >
                      {data?.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
