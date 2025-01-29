// import React from 'react'

import { useState } from "react";
import productsData from "../../data/products.json";
import ProductCards from "../shop/ProductCards";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };
  return (
    <>
      <section className="section__container bg-gradient-to-r from-primary-light via-white to-primary-light border rounded-lg shadow-xl p-10 mb-14">
        <h2 className="section__header text-4xl font-extrabold text-center text-primary capitalize mb-6">
          Search Products
        </h2>
        <p className="section__subheader text-xl text-center text-gray-700 mb-8">
          Explore a wide range of categories, from trendy apparel to stylish
          accessories. Find your perfect match today!
        </p>
      </section>

      <section className="section__container p-8">
        <div className="w-full mb-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="relative w-full max-w-4xl">
            <input
              type="text"
              placeholder="Search for Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar w-full p-4 pl-12 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:shadow-lg focus:outline-none transition-all duration-300 transform-gpu"
            />
            <i className="ri-search-line absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-xl"></i>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="clear-btn absolute top-1/2 right-4 transform -translate-y-1/2 text-xl text-gray-500 transition-all duration-300"
              >
                <i className="ri-close-line"></i>
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-3 px-10 bg-primary text-white rounded-lg hover:bg-primary-dark active:bg-primary-dark transition-all duration-300"
          >
            Search
          </button>
        </div>

        <div>
          {filteredProducts.length > 0 ? (
            <ProductCards products={filteredProducts} />
          ) : (
            <p className="text-center text-xl font-semibold text-gray-500 mt-10 font-serif">
              No products found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
