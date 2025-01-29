/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUpdateOrderStatusMutation } from "../../../../redux/features/orders/orderApi";

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status);

  const [updateOrderStatus, { isLoading, error }] =
    useUpdateOrderStatusMutation();

  const handleUpdateOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: order?._id, status });
      onClose();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-amber-600"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">Failed to update status.</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateOrderStatus}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
