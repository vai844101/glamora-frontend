//import React from 'react'

import { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/features/products/productsApi";
//import { isAllOf } from "@reduxjs/toolkit";
import { formatDate } from "../../../../utils/formateDate";
import { Link } from "react-router-dom";

//package for delete popup
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const {
    data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  });
  //console.log(products);

  //pagination
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //delete button
  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (productId) => {
    // if (!productId) {
    //   console.error('Product ID is undefined');
    //   return;
    // }

    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // If confirmed, proceed with the delete operation
        //console.log("Deleting product with ID:", productId); // Log the product ID
        await deleteProduct(productId).unwrap();
        await Swal.fire(
          "Deleted!",
          "The product has been deleted successfully.",
          "success"
        );
        refetch(); // Refetch the products after deletion
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      await Swal.fire(
        "Error!",
        "Something went wrong while deleting the product.",
        "error"
      );
    }
  };
  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p className="mt-4 text-white text-lg">Loading, please wait...</p>
        </div>
      )}
      {error && <div>Error loading products.</div>}
      <section className="py-0 bg-gradient-to-b from-blueGray-100 to-blueGray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  All Products
                </h3>
                <button
                  className="bg-white text-indigo-600 hover:text-indigo-700 font-bold px-5 py-2 text-sm rounded-full shadow-lg hover:shadow-xl transition ease-in-out duration-300"
                  type="button"
                >
                  See all
                </button>
              </div>
              <p className="mt-2 text-indigo-200 text-sm">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                products
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-blueGray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      No.
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      Published Date
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      Edit or Manage
                    </th>
                    <th className="px-6 py-4 text-left text-blueGray-700 font-bold text-sm uppercase border-b-2 border-blueGray-200">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blueGray-50 hover:shadow-md transition-all duration-300"
                      >
                        <td className="px-6 py-4 text-blueGray-600 text-sm font-medium border-b border-blueGray-200">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-blueGray-600 text-sm font-medium border-b border-blueGray-200">
                          {product?.name}
                        </td>
                        <td className="px-6 py-4 text-blueGray-600 text-sm border-b border-blueGray-200">
                        {formatDate(product?.createdAt)}
                        </td>
                        <td className="px-6 py-4 border-b border-blueGray-200">
                          <Link
                            to={`/dashboard/update-product/${product._id}`}
                            className="bg-indigo-500 text-white px-4 py-2 text-xs rounded-full shadow hover:bg-indigo-600 hover:shadow-md transition ease-in-out duration-200"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="px-6 py-4 border-b border-blueGray-200">
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-red-500 text-white px-4 py-2 text-xs rounded-full shadow hover:bg-red-600 hover:shadow-md transition ease-in-out duration-200"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* pagination */}
        <div className="mt-6 flex items-center justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
            key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
