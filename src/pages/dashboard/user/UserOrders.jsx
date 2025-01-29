//import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: orderdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  const orders = orderdata?.orders;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-500">No orders found!</p>
      </div>
    );

  return (
    <section className="py-10 px-6 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg">
        {/* Header Section */}
        <header className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Your Orders</h2>
          <button
            className="bg-white text-indigo-600 hover:text-indigo-700 text-sm font-semibold uppercase px-4 py-2 rounded transition-all"
            type="button"
          >
            See All
          </button>
        </header>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-indigo-100 text-indigo-600 uppercase text-sm">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {order?.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order?.status === "pending"
                          ? "bg-red-100 text-red-700"
                          : order?.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                      title={`Order is ${order?.status}`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    ${order?.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      to={`/orders/${order?._id}`}
                      className="text-indigo-600 underline hover:text-indigo-800 transition-all"
                    >
                      View Order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Orders Message */}
        {orders?.length === 0 && (
          <div className="text-center p-10 text-gray-500">
            <p>No orders found!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserOrders;
