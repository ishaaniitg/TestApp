import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom'
function Reg() {
  const navigate = useNavigate()
  const [name,setname] = useState('')
    const [email , setemail] = useState('')
    const [password , setPassword] = useState('')
     const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const res =  await axios.post(`${process.env.API_URL}/register`  , {name ,email , password} )
          if(res.data.success){
            console.log(res);
            navigate('/login')
          }
        } catch (error) {
            alert('error occured')
            console.log(error);
        }
     }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            required
            onChange={(e) => setname(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            onChange={(e) => setemail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer "
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  )
}

export default Reg
