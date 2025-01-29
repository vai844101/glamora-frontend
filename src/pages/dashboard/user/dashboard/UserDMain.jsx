//import React from 'react'

import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/stats";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserStats from "./UserStats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (!stats) {
    return <div className="text-center text-gray-500">No data available.</div>;
  }

  //add chart
  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats.totalPayments,
          stats.totalReviews * 10,
          stats.totalPurchasedProducts * 10,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        hoverBorderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 16,
        weight: 'bold',
      },
      bodyFont: {
        size: 14,
      },
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    },
  };
  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-red-400">User DashBoard</h1>
        <p className="text-lg font-medium mt-4 mb-2 text-cyan-700">
          Hi, {user?.username}! Welcome to your user dashboard
        </p>
      </div>
      <UserStats stats={stats} />
      <div className="mb-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserDMain;
