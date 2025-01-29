//import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewsByUserIdQuery } from "../../../redux/features/reviews/reviewsApi";
import { useNavigate } from "react-router-dom";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: reviewsData,
    error,
    isLoading,
  } = useGetReviewsByUserIdQuery(user?._id);
  const navigate = useNavigate();

  const reviews = reviewsData?.reviews || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium text-gray-500">Loading reviews...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-500">Failed to load reviews!</p>
      </div>
    );

  const handleCardClick = () => {
    navigate("/shop");
  };

  return (
    <div className="py-10 px-6 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">
          Your Reviews
        </h2>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-gray-800">
                    Rating:{" "}
                    <span className="text-yellow-500">{review?.rating} ★</span>
                  </p>
                  <span
                    className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full"
                    title={`Reviewed on ${new Date(
                      review?.createdAt
                    ).toLocaleDateString()}`}
                  >
                    {new Date(review?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  <strong>Comment:</strong> {review?.comment}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Product ID:</strong> {review?.productId}
                </p>
                <button 
                onClick={handleCardClick}
                className="bg-indigo-500 text-white px-4 py-2 rounded text-sm hover:bg-indigo-600 transition">
                  View Product
                </button>
              </div>
            ))}
            <div
              onClick={handleCardClick}
              className="bg-gray-100 flex flex-col items-center justify-center text-center rounded-lg p-6 border border-dashed hover:bg-indigo-500 hover:text-white cursor-pointer transition-all duration-300"
            >
              <div className="text-4xl font-bold mb-2">+</div>
              <p className="font-medium">Add New Review</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            You haven’t written any reviews yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
