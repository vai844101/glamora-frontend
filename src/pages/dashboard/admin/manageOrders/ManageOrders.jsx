//import React from 'react'

import { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/orders/orderApi";
import { formatDate } from "../../../../utils/formateDate";
import { Link } from "react-router-dom";
import UpdateOrderModal from "./UpdateOrderModal";

//package for delete popup
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ManageOrders = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  console.log(orders)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleDeleteOrder = async (orderId) => {
    try{
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        await deleteOrder(orderId).unwrap();
        await Swal.fire(
          "Deleted!",
          "The Order has been deleted successfully.",
          "success"
        );
        refetch(); // Refetch the products after deletion
      }
    } catch (error) {
        console.error("Failed to delete Order", error);
        await Swal.fire(
          "Error!",
          "Something went wrong while deleting the product.",
          "error"
        );
      }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <div className="container p-6">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 mb-6 pb-2 relative">
        Manage Orders
        <span className="absolute inset-0 bg-white opacity-25 blur-sm animate-hologram"></span>
      </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Order ID
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Customer
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {order?.orderId}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {order?.email}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <span
                      className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {formatDate(order?.updatedAt)}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600 flex items-center space-x-4">
                    <Link to={`/shop`} className="text-blue-500 hover:text-blue-700">
                      View
                    </Link>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleEditOrder(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteOrder(order?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Update Order Modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-indigo-500";
    case "completed":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
export default ManageOrders;
