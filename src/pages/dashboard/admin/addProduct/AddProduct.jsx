/* eslint-disable no-unused-vars */
//import React from 'react'

import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Skin Care", value: "skin-care" },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  //console.log(user);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState("");

  const [AddProduct, { isLoading, error }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.description ||
      !product.color
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      await AddProduct({ ...product, image, author: user?._id }).unwrap();
      toast.success("Product added successfully!", {
        position: "top-right",
      });
      setProduct({ name: "", category: "", color: "", price: "", description: "" });
      setImage("");
      navigate("/shop");
    } catch (error) {
      console.log("Failed to submit product", error);
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center">Add New Product</h2>
          <p className="mt-2 text-center text-sm opacity-75">
            Fill out the details below to add a new product to your glamora.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <TextInput
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter product name"
          />

          <SelectInput
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            options={categories}
          />

          <SelectInput
            label="Colors"
            name="color"
            value={product.color}
            onChange={handleChange}
            options={colors}
          />

          <TextInput
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter price (e.g., $50)"
          />

          <UploadImage
            name="image"
            id="image"
            value={(e) => setImage(e.target.value)}
            placeholder="Upload Image"
            setImage={setImage}
          />
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={product.description}
              placeholder="Write a product description"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
