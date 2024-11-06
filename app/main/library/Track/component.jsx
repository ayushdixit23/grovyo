"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/AuthWrapper";
import axios from "axios";
import { API } from "../../../../Essentials";
import styles from "../../../CustomScrollbarComponent.module.css";
import { RxCross2 } from "react-icons/rx";

function page() {
  const { data: user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/payments/fetchorders/${user?.id}`);
      console.log(res.data);
      setOrders(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);
  const renderProduct = (product, qty) => (
    <div className="flex items-center w-full gap-2" key={product.id}>
      <div className="min-w-[45px] max-w-[50px] max-h-[50px] min-h-[45px]">
        <img
          loading="lazy"
          className="w-full h-full  object-cover rounded-xl"
          src={`${process.env.NEXT_PUBLIC_PRODUCT_URL}${product?.images[0]?.content}`}
          alt="pic"
        />
      </div>
      <div className="flex flex-col  w-full gap-1">
        <div className="text-[14px] truncate  font-medium">
          {product?.name.length > 40
            ? `${product?.name.slice(0, 40)}...`
            : product?.name}
        </div>
        <div className="flex justify-between items-center w-full text-black dark:text-white text-[12px]">
          <div>Qty: {qty}</div>
          <div>₹{Number(product?.price) * qty}</div>
        </div>
      </div>
    </div>
  );
  const renderOrderDetails = (order) => (
    <div
      className="flex flex-col gap-4 dark:bg-[#0D0F10] bg-[#fafafa] border-2 border-[#f5f5f5] dark:border dark:border-[#131619] p-4 rounded-xl mt-2"
      key={order.id}
    >
      <div className="flex justify-between border-b dark:border-[#131619] pb-3 items-center w-full">
        <div className="text-sm font-medium">{order?.orders?.timing}</div>
        <div
          className={`py-1 rounded-xl px-2 text-black text-[12px] ${
            order?.orders?.currentStatus === "cancelled"
              ? "bg-red-500"
              : "bg-green-400"
          }`}
        >
          Status: {order?.orders?.currentStatus}
        </div>
      </div>
      <div className="flex flex-col border-b  dark:border-[#131619] pb-3 gap-5 w-full">
        {order?.orders?.productId?.map((productId, index) =>
          renderProduct(productId, order?.orders?.data?.[index]?.qty)
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="border-r text-sm font-medium pr-2">
            {order?.orders?.quantity} Items
          </div>
          <div className="text-sm font-medium">₹{order?.orders?.total}</div>
        </div>
        <div
          onClick={() => setSelectedOrder(order)}
          className="text-xs bg-[#3b3b3b] cursor-pointer text-white p-2 px-4 rounded-xl font-medium"
        >
          View
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:flex h-[85.5vh]">
      <div
        className={`md:min-w-[390px] md:max-w-[390px] ${styles.customScrollbar} px-2 overflow-y-auto dark:bg-bluedark border-r-2
         border-[#d6d6d6] flex items-center pt-6 pn:max-sm:pt-40 flex-col`}
      >
        {/* <div className="flex flex-col gap-5 w-full">
          {orders.map((d, i) => (
            <>
              <div
                key={i}
                className="w-full flex flex-col gap-4 dark:bg-[#0D0F10] bg-[#fafafa] p-4 rounded-xl mt-4"
              >
                <div
                  className={`flex justify-between border-b pb-3 items-center w-full `}
                >
                  <div className="text-sm font-medium">{d?.orders?.timing}</div>
                  <div
                    className={`bg-green-200 py-1 rounded-xl px-2  text-[12px]  ${
                      d?.orders?.currentStatus === "cancelled"
                        ? "bg-red-500"
                        : "bg-green-400"
                    }`}
                  >
                    Status: {d?.orders?.currentStatus}
                  </div>
                </div>
                <div className="flex flex-col border-b pb-3 gap-5 w-full">
                  {d?.orders?.productId?.map((f, k) => (
                    <div key={k} className="flex items-center w-full gap-2">
                      <div className="min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px]">
                        <img
                          className="w-full h-full object-cover rounded-xl"
                          src={
                            process.env.NEXT_PUBLIC_PRODUCT_URL +
                            f?.images[0]?.content
                          }
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col w-full gap-1">
                        <div className="text-[12px] truncate font-medium">
                          {f?.name.length > 40
                            ? `${f?.name.slice(0, 40)}...`
                            : f?.name}
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <div className=" text-black w-full  dark:text-white text-[12px]">
                            Qty: {d?.orders?.data?.[k]?.qty}
                          </div>
                          <div className=" text-black dark:text-white text-[12px]">
                            ₹
                            {Number(d?.orders?.data?.[k]?.price) *
                              Number(d?.orders?.data?.[k]?.qty)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="border-r text-sm font-medium  pr-2">
                      {d?.orders?.quantity} Items
                    </div>
                    <div className="text-sm font-medium">
                      ₹{d?.orders?.total}
                    </div>
                  </div>
                  <div
                    onClick={() => setOrder(d)}
                    className="text-xs bg-[#1A1D21] cursor-pointer text-[#9B9C9E] p-2 px-4 rounded-xl font-medium"
                  >
                    View
                  </div>
                </div>
              </div>
            </>
          ))}
        </div> */}
        <div className="flex flex-col gap-2  w-full">
          {orders.map(renderOrderDetails)}
        </div>
      </div>
      {/* Right side */}
      {selectedOrder && (
        <div className="bg-green pn:max-sm:hidden w-full h-full flex flex-col items-center">
          <div className="min-w-[75%] mt-0 flex flex-col gap-4">
            <div className="flex flex-col rounded-xl dark:bg-[#121212]">
              <div className="flex justify-between p-2 items-center w-full">
                <div>Items in order</div>
                <div>{selectedOrder.orders?.quantity} Item</div>
              </div>
              <div className="flex flex-col pb-3 px-3 gap-5 w-full">
                {selectedOrder?.orders?.productId?.map((productId, index) =>
                  renderProduct(
                    productId,
                    selectedOrder?.orders?.data?.[index]?.qty
                  )
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col rounded-xl dark:bg-[#121212]">
              <div className="flex justify-between p-2 border-b px-3 items-center w-full">
                <div>Items in order</div>
                <div>{selectedOrder?.orders?.quantity} Item</div>
              </div>
              <div className="flex flex-col text-sm pb-3 mt-3 gap-5 w-full">
                <div className="flex justify-between px-3 items-center gap-2">
                  <div>Item total</div>
                  <div>₹ {selectedOrder?.orders?.total}</div>
                </div>
                <div className="flex justify-between px-3 items-center gap-2">
                  <div>Handling Charges</div>
                  <div>Free</div>
                </div>
                <div className="flex justify-between px-3 items-center gap-2">
                  <div>Delivery Charges</div>
                  <div>Free</div>
                </div>
                <div className="flex justify-between px-3 items-center gap-2">
                  <div>Bill total</div>
                  <div>₹ {selectedOrder?.orders?.total}</div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="flex flex-col rounded-xl dark:bg-[#121212]">
              <div className="flex justify-between p-2 border-b px-3 items-center w-full">
                <div>Order details</div>
                <div>{selectedOrder?.orders?.quantity} Item</div>
              </div>
              <div className="flex flex-col text-sm pb-3 mt-3 gap-5 w-full">
                <div className="flex justify-between px-3 items-center gap-2">
                  <div>Order ID</div>
                  <div>{selectedOrder?.orders?.orderId}</div>
                </div>
                <div className="flex justify-between px-3 items-center gap-2">
                  <div>Payment</div>
                  <div>{selectedOrder?.orders?.paymentMode}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:hidden">
        {selectedOrder && (
          <div className="fixed inset-0 w-screen z-40 flex justify-center items-center">
            <div className="w-full h-full pn:max-sm:pt-48 flex flex-col items-center">
              <div className="min-w-[75%] mt-0 bg-white dark:bg-[#0D0F10] p-4 rounded-xl flex flex-col gap-4">
                <div className="flex justify-end items-center w-full">
                  <div onClick={() => setSelectedOrder(null)}>
                    <RxCross2 />
                  </div>
                </div>
                <div className="flex flex-col rounded-xl dark:bg-[#121212]">
                  <div className="flex justify-between p-2 items-center w-full">
                    <div>Items in order</div>
                    <div>{selectedOrder.orders?.quantity} Item</div>
                  </div>
                  <div className="flex flex-col pb-3 px-3 gap-5 w-full">
                    {selectedOrder?.orders?.productId?.map((productId, index) =>
                      renderProduct(
                        productId,
                        selectedOrder?.orders?.data?.[index]?.qty
                      )
                    )}
                  </div>
                </div>
                {/* Order Summary */}
                <div className="flex flex-col rounded-xl dark:bg-[#121212]">
                  <div className="flex justify-between p-2 border-b px-3 items-center w-full">
                    <div>Items in order</div>
                    <div>{selectedOrder?.orders?.quantity} Item</div>
                  </div>
                  <div className="flex flex-col text-sm pb-3 mt-3 gap-5 w-full">
                    <div className="flex justify-between px-3 items-center gap-2">
                      <div>Item total</div>
                      <div>₹ {selectedOrder?.orders?.total}</div>
                    </div>
                    <div className="flex justify-between px-3 items-center gap-2">
                      <div>Handling Charges</div>
                      <div>Free</div>
                    </div>
                    <div className="flex justify-between px-3 items-center gap-2">
                      <div>Delivery Charges</div>
                      <div>Free</div>
                    </div>
                    <div className="flex justify-between px-3 items-center gap-2">
                      <div>Bill total</div>
                      <div>₹ {selectedOrder?.orders?.total}</div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex flex-col rounded-xl dark:bg-[#121212]">
                  <div className="flex justify-between p-2 border-b px-3 items-center w-full">
                    <div>Order details</div>
                    <div>{selectedOrder?.orders?.quantity} Item</div>
                  </div>
                  <div className="flex flex-col text-sm pb-3 mt-3 gap-5 w-full">
                    <div className="flex justify-between px-3 items-center gap-2">
                      <div>Order ID</div>
                      <div>{selectedOrder?.orders?.orderId}</div>
                    </div>
                    <div className="flex justify-between px-3 items-center gap-2">
                      <div>Payment</div>
                      <div>{selectedOrder?.orders?.paymentMode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
