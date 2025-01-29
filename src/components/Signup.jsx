/* eslint-disable no-unused-vars */
// import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [message, setMessage] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //authApi
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const navigate = useNavigate()

  //handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    //console.log(data);

    //authApi
    try {
      await registerUser(data).unwrap();
      alert("User created successfully");
      navigate('/login')
    } catch (error) {
      setMessage("SignUp Failed")
    }
    
  };

  return (
    <section className="h-screen flex items-center justify-center bg-orange-50" style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 50%, #71b7e6 100%)" }}>
      <div className="max-w-sm border shadow bg-white mx-auto p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold pt-5 text-blue-500">Please SignUp</h2>
        <form onSubmit={handleSignUp} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
            type="text"
            name="username"
            id="username"
            placeholder="UserName"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={(e) => setUserName(e.target.value)}
          />
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
            SignUp
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Already have an account? <Link to="/login" className="text-red-700 px-1 underline">Login </Link>here.</p>
      </div>
    </section>
  );
};

export default Signup;
