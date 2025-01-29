/* eslint-disable react/prop-types */
//import React from 'react'

import { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../../redux/features/auth/authApi";

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);

  const [updateUserRole] = useUpdateUserRoleMutation();
  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      alert("Updated role Successfully!")
      onRoleUpdate()
      onClose();
    } catch (error) {
      console.error("Failed to Update user role", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit User Role
      </h2>
      
      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Email
        </label>
        <input
          type="email"
          value={user?.email}
          readOnly
          className="w-full bg-gray-200 text-gray-700 shadow-inner rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
        />
      </div>
      
      {/* Role Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-200 text-gray-700 shadow-inner rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold shadow-md hover:from-gray-400 hover:to-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
        >
          Cancel
        </button>
        
        {/* Save Button */}
        <button
          onClick={handleUpdateRole}
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-200"
        >
          Save
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default UpdateUserModal;
