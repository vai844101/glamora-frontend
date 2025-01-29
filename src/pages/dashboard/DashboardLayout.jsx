// import React from 'react'

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard/>;

      case "user":
        return <UserDashboard/>;

      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    // <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start  justify-start">
    //   <header className="lg:w-1/5 sm:w-2/5 w-full border">
    //     {renderDashboard()}
    //   </header>
    //   <main className="p-8 bg-white w-full border mt-5">
    //     <Outlet />
    //   </main>
    // </div>

    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start p-4 bg-gray-100 min-h-screen">
      <header className="lg:w-1/5 sm:w-2/5 w-full border bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          {/* <h1 className="text-xl font-bold">Dashboard</h1> */}
          
        </div>
        {renderDashboard()}
      </header>
      <main className="p-8 bg-white w-full border shadow-md rounded-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
