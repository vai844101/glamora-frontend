//import React from 'react'

import { Link, NavLink, useNavigate } from "react-router-dom";
import {  useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/orders", label: "Orders" },
  { path: "/dashboard/payments", label: "Payments" },
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/reviews", label: "Reviews" },
];
const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      //alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log("Failed to log out", error);
    }
  };
  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="nav__logo">
          <Link to="/">
            <h3 className="font-white tracking-tight text-center text-4xl bg-gradient-to-t from-cyan-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent transition transform hover:scale-110">
              Glamora<span>.</span>
            </h3>
          </Link>
          <p className="text-md italic mt-5 text-gray-600 font-semibold tracking-wide">User DashBoard</p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5 font-semibold">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-black"
                }
                end
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-blue-700 font-extralight px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-primary-dark hover:scale-105 shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
