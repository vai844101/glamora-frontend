/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// import React from 'react's

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from "../redux/features/auth/authSlice";


const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation();
  const navigate = useNavigate();
  

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
        email,
        password
    }

    try {
      const response = await loginUser(data).unwrap();
      //console.log(response);
      const {token, user} = response;
      dispatch(setUser({user}))
      toast.success("User Login successfully! 🎉", {
        position: "top-right" 
      });
      navigate("/")
    } catch (error) {
      setMessage("please provide a valid email and password")
    }
  }
  return (
    <section className="h-screen flex items-center justify-center bg-cyan-100" style={{ background: "linear-gradient(135deg, #71b7e6, #9b59b6)" }} >
      <div className="max-w-sm border shadow bg-white mx-auto p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold pt-5 text-blue-500">Please Login</h2>
        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            Login
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-red-700 px-1 underline">Signup </Link>here.</p>
      </div>
    </section>
    
  );
};

export default Login;
