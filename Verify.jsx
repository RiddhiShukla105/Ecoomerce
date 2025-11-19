import React, { useState } from 'react'
import Button from '../component/product/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Verify = () => {

  const[form,setForm]=useState({
  email:"",
  password:""
})

const navigate=useNavigate()
const handler=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
      console.log(form);
}

const onSave=(e)=>{
  e.preventDefault();
  axios.post("http://localhost:4004/seller/login",form)
  .then((res)=>{
    setForm(res.data);
    navigate("/seller")
  }).catch((error)=>{
    console.log(error.message)
     toast.error(error.response?.data?.message || "Login failed", {
           position: "top-right",
           autoClose: 2000,
         })
  })
}
return (
  <div className="relative min-h-screen w-full flex justify-center items-center bg-[url('/img/contact_img.png')] bg-cover bg-center">

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Login Card */}
    <form
      className="
        relative w-[92%] sm:w-[85%] md:w-[70%] lg:w-[420px]
        bg-white/10 backdrop-blur-2xl 
        p-4 sm:p-10 md:p-12
        rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]
        border border-white/20 
        animate-fadeIn
      "
      onSubmit={onSave}
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-2 tracking-wide drop-shadow-lg">
        Seller Login
      </h1>

      <p className="text-center text-gray-200 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
        Access your dashboard and manage your store
      </p>

      {/* Email Input */}
      <div className="mb-4 sm:mb-5">
        <label className="text-white font-medium text-sm sm:text-base md:text-lg">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          onChange={handler}
          className="
            w-full p-3 mt-2 rounded-xl 
            bg-white/95 
            text-black text-sm sm:text-base md:text-lg 
            border border-gray-300 
            outline-none
            focus:ring-2 focus:ring-blue-500
            transition-all
          "
        />
      </div>

      {/* Password Input */}
      <div className="mb-5 sm:mb-6">
        <label className="text-white font-medium text-sm sm:text-base md:text-lg">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handler}
          placeholder="Enter your Password"
          className="
            w-full p-3 mt-2 rounded-xl 
            bg-white/95 
            text-black text-sm sm:text-base md:text-lg
            border border-gray-300 
            outline-none
            focus:ring-2 focus:ring-blue-500
            transition-all
          "
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="
          w-full bg-linear-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800
          text-white text-lg sm:text-xl font-semibold 
          py-3 rounded-xl 
          shadow-lg hover:shadow-2xl 
          transition-all duration-300
          active:scale-[0.97]
        "
      >
        Login
      </button>

      {/* Forgot Password */}
      <p className="text-center text-gray-200 mt-4 text-xs sm:text-sm md:text-base cursor-pointer hover:underline">
        Forgot Password?
      </p>

      {/* Divider */}
      <div className="my-5 sm:my-6 flex items-center gap-3 sm:gap-4">
        <div className="h-px flex-1 bg-white/30"></div>
        <span className="text-white/60 text-xs sm:text-sm">OR</span>
        <div className="h-px flex-1 bg-white/30"></div>
      </div>

      {/* Create Account */}
      <p className="text-center text-gray-100 text-xs sm:text-sm md:text-base">
        New Seller?{" "}
        <span className="text-blue-400 cursor-pointer hover:underline">
          <Link to="/register">Create an Account</Link>
        </span>
      </p>
    </form>
  </div>
);


}

export default Verify
