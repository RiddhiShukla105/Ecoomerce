import React,{useState,useEffect} from 'react'
import Button from '../component/product/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Admin/Nav';

const Register = () => {
    const [data,setData]=useState({
        name:"",
        email:"",
        mob_num:"",
        password:"",
        gst:"",
        b_name:""
    })
    const navigate=useNavigate()
    const handler=(e)=>{
      setData( {...data,[e.target.name]:e.target.value})
    }

    const onSave=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4004/seller",data)
        .then((res)=>{
            console.log(res.data);
            alert(res.data.message);
            setData(res.data)
            navigate("/seller")
        })
        .catch((error)=>{
            console.log(error)
        toast.error(error.response?.data?.message || "Error Occured", {
                   position: "top-right",
                   autoClose: 2000,
                 })}
        )
        e.target.reset();
        
    }
 return (
  <>
  {/* <Nav/> */}
  <div className="relative w-full min-h-screen flex justify-center items-center bg-[url('/img/contact_img.png')] bg-cover bg-center">
    
    <div className="absolute inset-0 bg-black/40"></div>

    <form 
      className="relative w-full max-w-lg bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/30"
      onSubmit={onSave}
    >
      <h2 className="text-4xl font-bold text-white text-center mb-2 tracking-wide">
        Start Your Business 
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="text-white font-semibold">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          onChange={handler}
          className="w-full p-2 mt-1 rounded-xl bg-white/90 text-black text-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-white font-semibold">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          onChange={handler}
          className="w-full p-2 mt-1 rounded-xl bg-white/90 text-black text-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mobile */}
      <div className="mb-4">
        <label className="text-white font-semibold">Mobile Number</label>
        <input
          type="text"
          name="mob_num"
          placeholder="Enter your Mobile Number"
          onChange={handler}
          className="w-full p-2 mt-1 rounded-xl bg-white/90 text-black text-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="text-white font-semibold">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={handler}
          className="w-full p-2 mt-1 rounded-xl bg-white/90 text-black text-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* GST */}
      <div className="mb-4">
        <label className="text-white font-semibold">GST Number</label>
        <input
          type="text"
          name="gst"
          placeholder="Enter your GST Number"
          onChange={handler}
          className="w-full p-2 mt-1 rounded-xl bg-white/90 text-black text-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Business Name */}
      <div className="mb-6">
        <label className="text-white font-semibold">Business Name</label>
        <input
          type="text"
          name="b_name"
          placeholder="Enter your Business Name"
          onChange={handler}
          className="w-full p-2 mt-1 rounded-xl bg-white/90 text-black text-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  </>
);

}

export default Register
