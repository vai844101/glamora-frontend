/* eslint-disable react/prop-types */
//import React from 'react'

import { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../../../../utils/baseURL";

const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // base64 functionality
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // request to upload a file
  const uploadSingleImage = (base64) => {
    setLoading(true);
    axios
      .post(`${getBaseURL()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;
        setUrl(imageUrl);
        alert("Image uploaded successfully");
        setImage(imageUrl);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log("Error uploading image", error);
        setLoading(false);
      });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length == 1) {
      const base64 = await convertBase64(files[0]);
      //console.log("Base64 String:", base64);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Upload Image
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
      />

      {loading && (
        <div className="mt-2 text-sm text-blue-500 animate-pulse">
          Product uploading...
        </div>
      )}

      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Immage uploaded successfully</p>
          <img
            src={url}
            alt="uploaded image"
            className="mt-2 w-40 h-40 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
