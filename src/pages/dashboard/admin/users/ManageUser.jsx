//import React from 'react'

import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../../redux/features/auth/authApi";
import UpdateUserModal from "./UpdateUserModal";


//package for delete popup
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
  //console.log(users);

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
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
        // If confirmed, proceed with the delete operation
        //console.log("Deleting product with ID:", productId); // Log the product ID
        await deleteUser(id).unwrap();
        await Swal.fire(
          "Deleted!",
          "The product has been deleted successfully.",
          "success"
        );
        refetch(); // Refetch the products after deletion
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      await Swal.fire(
        "Error!",
        "Something went wrong while deleting the product.",
        "error"
      );
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p className="mt-4 text-white text-lg">Loading, please wait...</p>
        </div>
      )}
      {error && <div>Error loading users data.</div>}
      <section className="py-0 bg-gradient-to-b from-blueGray-100 to-blueGray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">All Users</h3>
                <button
                  className="bg-white text-indigo-600 hover:text-indigo-700 font-bold px-5 py-2 text-sm rounded-full shadow-lg hover:shadow-xl transition ease-in-out duration-300"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-blueGray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      NO.
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      USER EMAIL
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      USER ROLE
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      EDIT or MANAGE
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blueGray-50 hover:shadow-md transition-all duration-300"
                      >
                        <td className="px-6 py-4 text-blueGray-600 text-sm font-medium border-b border-blueGray-200">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-blueGray-600 text-sm font-medium border-b border-blueGray-200">
                          {user?.email || "N/A"}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span
                            className={`rounded-full py-1 px-3 font-semibold text-sm transition-colors duration-200 ${
                              user?.role === "admin"
                                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                                : "bg-amber-300 text-black hover:bg-amber-400"
                            }`}
                            title={
                              user?.role === "admin"
                                ? "Administrator"
                                : "User Role"
                            }
                          >
                            {user?.role}
                          </span>
                        </td>

                        <td className="px-6 py-4 border-b border-blueGray-200">
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-indigo-500 text-white px-4 py-2 text-xs rounded-full shadow hover:bg-indigo-600 hover:shadow-md transition ease-in-out duration-200"
                          >
                            <i className="ri-edit-2-line"></i>
                            Edit
                          </button>
                        </td>
                        <td className="px-6 py-4 border-b border-blueGray-200">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 text-white px-4 py-2 text-xs rounded-full shadow hover:bg-red-600 hover:shadow-md transition ease-in-out duration-200"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <UpdateUserModal
        user={selectedUser}
          onClose={handleCloseModal}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
