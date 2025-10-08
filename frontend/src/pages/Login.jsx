import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../assets/context/Authcontext.jsx'


export default function Login() {

  //usestates
  const [formdata,setFormdata]=useState({
    email:"",
  password:"",})
  const {login} = useAuth()

  
  const [error,setError]=useState("");
  const navigate = useNavigate();

  //functions
  const handleChange = (e)=>{
      setFormdata({...formdata,[e.target.name]:e.target.value})
  }

  const handleSumbit = async (e)=>{
    e.preventDefault();
    setError("");

    try {
      const res =  await axios.post('http://localhost:5000/api/users/login',formdata)

      if( res.status==200){
        login(res.data.token)
        navigate('/')
      }
    } catch (error) {
      setError(error.response?.data?.message || "login  failed")
    }
  }


  




  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-300 '>
      <form className='bg-white p-6 rounded-2xl shadow-md w-80 space-y-4'onSubmit={handleSumbit}>
        <h1 className='text-center text-2xl font-bold'>Login</h1>
        

       


        <input className='w-full p-2 border rounded hover:border-blue-600'
         value={formdata.email} 
          onChange={handleChange}
          name='email'
           type='text'
            placeholder='Email' >
             </input>

        <input className='w-full p-2 border rounded hover:border-blue-600' 
         value={formdata.password} 
         onChange={handleChange} 
         name='password'
         type='password' 
         placeholder=' Password' >
        </input>

        

       


        


        <button className='w-full p-2 gap-y-5 border hover:bg-blue-800 rounded bg-blue-600'>login</button>
        {error && <p className="text-red-500 text-sm">{error}</p>} 
        <p className="mt-3 text-center text-sm text-gray-600">
    Dont have a account?{" "}
    <a href="/signup" className="text-blue-600 hover:underline">
      Signup
    </a>
  </p>
      </form>
      
    </div>
  )
}


