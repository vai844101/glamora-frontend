/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="product__card bg-gradient-to-b from-white to-gray-50 shadow-md rounded-lg overflow-hidden border border-gray-200 hover:border-red-300 transition-transform duration-300 hover:scale-105"
        >
          {/* Product Image with Badge */}
          <div className="relative group">
            {product.oldPrice && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                Sale
              </span>
            )}
            <Link to={`/shop/${product._id}`}>
              <img
                className="h-64 w-full object-cover rounded-t-lg group-hover:brightness-90 transition-all duration-300"
                src={product.image}
                alt={product.name}
              />
            </Link>

            {/* Add-to-Cart Floating Button */}
            <div className="absolute bottom-3 right-3 hidden group-hover:flex">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="bg-primary p-3 rounded-full text-white shadow-lg hover:bg-primary-dark transition-all"
                title="Add to Cart"
              >
                <i className="ri-shopping-cart-2-line text-lg"></i>
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="p-4">
            <h4 className="text-lg font-semibold text-gray-800 truncate">
              {product.name}
            </h4>
            <div className="flex items-center space-x-2">
              <p className="text-primary font-bold text-xl">${product.price}</p>
              {product.oldPrice && (
                <p className="text-gray-400 text-sm line-through">
                  ${product.oldPrice}
                </p>
              )}
            </div>
            <div className="mt-2">
              <RatingStars rating={product.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
