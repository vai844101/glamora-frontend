// import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartModal from "../pages/shop/CartModal";

import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);
  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen);
  };

  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  //dropdown menus
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  //admin dropdown menus
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-product" },
  ];

  //user DropDown menu
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  //handle logout in dropdown
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("User Logout successfully! 🎉", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl max-auto px-4 flex justify-between items-center;">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/">Page</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contacts</Link>
          </li>
        </ul>

        {/* logo */}
        <div className="nav__logo ">
          <Link to="/">
            <h2 className="font-white tracking-tight text-center text-4xl bg-gradient-to-t from-cyan-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent transition transform hover:scale-110">
              Glamora.
            </h2>
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative flex items-center space-x-8">
          {/* Search Icon */}
          <span className="hover:text-primary transition-all duration-300 transform hover:scale-110">
            <Link to="/search">
              <i className="ri-search-line text-2xl"></i>
            </Link>
          </span>

          {/* Cart Icon */}
          <span className="relative hover:text-primary transition-all duration-300 transform hover:scale-110">
            <button onClick={handleCartToggle} className="flex items-center">
              <i className="ri-shopping-bag-line text-2xl"></i>
              <sup className="text-xs inline-block px-1.5 text-white rounded-full bg-primary text-center absolute top-0 right-0">
                {products.length}
              </sup>
            </button>
          </span>

          {/* User Icon and Dropdown */}
          <span className="relative">
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="user profile"
                  className="w-10 h-10 rounded-full cursor-pointer transition-all duration-300 transform hover:ring-4 hover:ring-primary hover:scale-105"
                />

                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <ul className="font-medium space-y-3 p-2">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items block text-sm p-2 hover:bg-primary-light hover:text-white rounded"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="dropdown-items block text-sm p-2 hover:bg-primary-light hover:text-white rounded"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="login">
                <i className="ri-user-line text-2xl hover:text-primary transition-all duration-300 transform hover:scale-110"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
