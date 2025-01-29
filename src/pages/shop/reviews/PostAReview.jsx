/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";

//Post a New Review
const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
    }
    console.log(newComment)
    try {
      const response = await postReview(newComment).unwrap();
      alert("Comment posted successfully!");
      setComment('');
      setRating(0);
      refetch();

    } catch (error) {
      alert(error.message);
    }

    handleClose();
  }

  return (
    <div
  className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 px-6 ${
    isModalOpen ? "block opacity-100 scale-100" : "hidden opacity-0 scale-95"
  } transition-all duration-500 ease-in-out transform`}
>
  <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-96 z-50 max-w-md overflow-hidden">
    <h2 className="text-2xl font-semibold mb-6 text-pink-600 text-center">
      Post A Review
    </h2>

    {/* Star Rating */}
    <div className="flex items-center justify-center mb-6 space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRating(star)}
          className="cursor-pointer text-yellow-500 text-2xl transition-all duration-200 transform hover:scale-110"
        >
          {rating >= star ? (
            <i className="ri-star-fill"></i>
          ) : (
            <i className="ri-star-line"></i>
          )}
        </span>
      ))}
    </div>

    {/* Textarea for comment */}
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      rows="4"
      maxLength="300"
      placeholder="Write your review here..."
      className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-200"
    ></textarea>

    {/* Character count */}
    <div className="text-sm text-gray-500 text-right mb-6">
      {comment.length} / 300 characters
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-4">
      <button
        onClick={handleClose}
        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200"
      >
        Submit
      </button>
    </div>
  </div>
</div>


  );
};

export default PostAReview
