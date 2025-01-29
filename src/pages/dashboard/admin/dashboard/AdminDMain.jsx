import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/stats";
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        <p className="mt-4 text-white text-lg">Loading, please wait...</p>
      </div>
    );
  }  
  if (error) return <div className="text-center py-10 text-red-500">Failed to load stats</div>;
  if (!stats) return <div className="text-center py-10">No stats found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg mb-6">
          Hi, <span className="font-semibold">{user?.username}</span>! Welcome to your admin dashboard.
        </p>
        <AdminStats stats={stats} />
        <AdminStatsChart stats={stats}/>
      </div>
    </div>
  );
};

export default AdminDMain;
