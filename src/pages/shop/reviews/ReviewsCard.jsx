/* eslint-disable no-undef */
// import React from 'react'

import { useState } from "react";
import commentorIcon from "../../../assets/avatar.png";
import RatingStars from "../../../components/RatingStars";
import { formatDate } from "../../../utils/formateDate";
import PostAReview from "./PostAReview";

// eslint-disable-next-line react/prop-types
const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = productReviews || [];
  //console.log(reviews);

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-8 bg-white p-8 rounded-lg shadow-xl">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              All Comments
            </h3>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className="mt-8 group border-b pb-8">
                  <div className="flex gap-4 items-center">
                    <img
                      src={commentorIcon}
                      alt="User Icon"
                      className="w-16 h-16 rounded-full object-cover cursor-pointer group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-blue-500 capitalize">
                        {review?.userId?.username}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        {formatDate(review?.updatedAt)}
                      </p>
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>
                  <div className="text-gray-700 mt-6 bg-gray-100 p-6 rounded-lg shadow-md group-hover:bg-gray-50 transition-all duration-300">
                    <p className="text-sm">{review?.comment}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => handleLikeReview(review.id)}
                      className="text-primary flex items-center gap-2 hover:text-primary-dark transition-all duration-300"
                    >
                      <i className="ri-heart-3-line text-xl"></i> Like
                    </button>
                    <button
                      onClick={() => handleReplyReview(review.id)}
                      className="text-primary flex items-center gap-2 hover:text-primary-dark transition-all duration-300"
                    >
                      <i className="ri-reply-line text-xl"></i> Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-500">No reviews yet!</p>
        )}
      </div>

      {/* Add Review Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleOpenReviewModal}
          className="px-8 py-4 bg-primary text-white font-semibold rounded-md shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      <PostAReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModel}
      />
    </div>
  );
};

export default ReviewsCard;
