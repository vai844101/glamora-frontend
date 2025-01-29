// import React from 'react'
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";


const SingleProduct = () => {
  const { id } = useParams();
  //console.log("Product ID from URL:", id); // Debug log

  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <>
      <section className="section__container bg-gradient-to-r from-primary-light via-white to-primary-light py-10 px-6 sm:px-8 md:px-10">
        <h2 className="section__header text-4xl font-extrabold text-center text-primary mb-8 capitalize">
          Single Product Page
        </h2>

        <div className="section__subheader text-lg text-gray-700 flex justify-center items-center space-x-4">
          <span className="hover:text-primary transition-all duration-300 transform hover:scale-105">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line text-gray-600 hover:text-primary transition-all duration-300 transform hover:scale-110"></i>
          <span className="hover:text-primary transition-all duration-300 transform hover:scale-105">
            <Link to="/Shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line text-gray-600 hover:text-primary transition-all duration-300 transform hover:scale-110"></i>
          <span className="text-primary font-semibold text-xl drop-shadow-lg">
            {singleProduct?.name}
          </span>
        </div>
      </section>

      <section className="section__container mt-16 px-8">
        <div className="flex flex-col items-center md:flex-row gap-16 bg-white rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-102 hover:shadow-2xl hover:border-primary hover:border-2 p-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg group">
            <img
              className="w-full h-80 object-cover transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-90 rounded-lg"
              src={singleProduct.image}
              alt={singleProduct.name}
            />
            <div className="absolute top-4 right-4 bg-white bg-opacity-60 p-2 rounded-full hidden group-hover:block">
              <i className="ri-search-line text-xl text-primary"></i>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 w-full">
            <h3 className="text-4xl font-bold text-gray-900 mb-6 hover:text-primary transition-all duration-300">
              {singleProduct?.name}
            </h3>
            <p className="text-3xl text-primary font-semibold mb-4">
              ${singleProduct?.price}
              {singleProduct?.oldPrice && (
                <span className="ml-2 text-gray-500 text-lg line-through">
                  ${singleProduct?.oldPrice}
                </span>
              )}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {singleProduct?.description}
            </p>

            {/* Additional Product Details */}
            <div className="flex flex-col space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-800">Category:</strong>{" "}
                {singleProduct?.category}
              </p>
              <p>
                <strong className="text-gray-800">Color:</strong>{" "}
                {singleProduct?.color}
              </p>
              <div className="flex gap-2 items-center">
                <strong className="text-gray-800">Rating: </strong>
                <RatingStars rating={singleProduct?.rating} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className="mt-8 px-8 py-3 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-3"
            >
              <i className="ri-shopping-cart-2-line text-lg"></i> Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* display Reviews on single product details page */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
