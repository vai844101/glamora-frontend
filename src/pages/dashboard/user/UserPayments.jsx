//import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: ordersdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">No orders found!</div>;

  const orders = ordersdata?.orders || [];
  const totalPayment = orders
    ?.reduce((acc, order) => acc + order.amount, 0)
    .toFixed(2);

  return (
    <div className="py-10 px-6 max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-gray-50 shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Payment Summary</h1>
        <p className="text-gray-600 mt-2">
          View all your transactions in one place.
        </p>
      </div>

      {/* Total Payment */}
      <div className="bg-blue-600 text-white p-6 rounded-md shadow-md mb-8 flex items-center justify-between">
        <p className="text-lg font-medium">Total Spent</p>
        <span className="text-3xl font-bold">${totalPayment || "0.00"}</span>
      </div>

      {/* Order List */}
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order #{index + 1}
                </h2>
                <span
                  className={`py-1 px-3 text-sm rounded-full ${
                    item?.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : item?.status === "pending"
                      ? "bg-red-100 text-red-700"
                      : item?.status === "processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item?.status}
                </span>
              </div>
              <div className="text-gray-700">
                <p className="mb-1">
                  <strong>Amount:</strong> ${item?.amount.toFixed(2)}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {new Date(item?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>No orders found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPayments;
