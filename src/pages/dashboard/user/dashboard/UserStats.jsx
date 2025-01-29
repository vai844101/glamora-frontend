/* eslint-disable react/prop-types */
//import React from 'react'

const UserStats = ({ stats }) => {
  return (
    <div className="my-5 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold">${stats?.totalPayments}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-400 cursor-pointer hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
          <p className="text-2xl font-bold">{stats?.totalReviews}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-yellow-200 cursor-pointer hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Total Purchased Products </h2>
          <p className="text-2xl font-bold">{stats?.totalPurchasedProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
