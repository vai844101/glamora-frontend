// import React from 'react'
/* eslint-disable react/prop-types */

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-6 flex-shrink-0 p-6 bg-white border rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800">Filters</h3>

      {/* Categories */}
      <div className="flex flex-col space-y-4">
        <h4 className="font-medium text-lg text-gray-700">Category</h4>
        <hr className="border-gray-300" />
        {filters.categories.map((category) => (
          <label
            key={category}
            className="flex items-center cursor-pointer hover:text-primary transition-all duration-200"
          >
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
              className="form-radio text-primary border-gray-300 focus:ring-primary transition-all duration-200"
            />
            <span className="ml-2 capitalize">{category}</span>
            {/* Optional Icon */}
            <i className={`ml-2 ri-${category.toLowerCase()}-line text-lg`} />
          </label>
        ))}
      </div>

      {/* Colors */}
      <div className="flex flex-col space-y-4">
        <h4 className="font-medium text-lg text-gray-700">Color</h4>
        <hr className="border-gray-300" />
        {filters.colors.map((color) => (
          <label
            key={color}
            className="flex items-center space-x-4 cursor-pointer hover:text-primary transition-all duration-200"
          >
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
              className="form-radio text-primary border-gray-300 focus:ring-primary transition-all duration-200"
            />

            {/* Color Preview */}
            <span
              className="w-6 h-6 rounded-full inline-block"
              style={{ backgroundColor: color }}
            ></span>

            {/* Color Text */}
            <span className="capitalize">{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col space-y-4">
        <h4 className="font-medium text-lg text-gray-700">Price</h4>
        <hr className="border-gray-300" />
        {filters.priceRanges.map((range) => (
          <label
            key={range.label}
            className="flex items-center cursor-pointer hover:text-primary transition-all duration-200"
          >
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min} - ${range.max}`}
              checked={
                filtersState.priceRange === `${range.min} - ${range.max}`
              }
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
              className="form-radio text-primary border-gray-300 focus:ring-primary transition-all duration-200"
            />
            <span className="ml-2">{range.label}</span>
            {/* Price Tooltip */}
            <span
              className="ml-2 text-xs text-gray-500"
              data-tooltip={`Range: $${range.min} - $${range.max}`}
            >
              <i className="ri-information-line"></i>
            </span>
          </label>
        ))}
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="mt-6 bg-primary py-2 px-6 text-white font-medium rounded-md w-full transition-all duration-300 hover:bg-primary-dark active:bg-primary-dark"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
