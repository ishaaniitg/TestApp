import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
function Dashboard() {
  const navigate = useNavigate()
  const [msg,setmsg] = useState('')
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('home');

  const token = localStorage.getItem('token') // get Token stored locally now to proceed to new Route
  useEffect(() => {
  const fetchData = async () => {

      if (!token) { // if there is no token when opening in new browser , navigate to Login
      navigate('/login');
      return;
    }

    try {
      if(token){
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard` , { // req sent with header : auth method to verify the token on the incoming request 
        headers :{
          Authorization : `Bearer ${token}` // token sent back to backend to verify user
        }
       }
      )
      if (res.data.success) {
        setmsg(res.data.message)
      }
     }
    } catch (err) {

      console.log(err); // error if no token was received , / basically token session expired 
    localStorage.removeItem('token'); // removes token from local storage
    navigate('/login') // navigates

    } finally {
        setLoading(false); // ✅ stop loading no matter what
      }
  }

  fetchData()
}, [])

  return (
      <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">My Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => setActive('home')}
            className={`px-4 py-2 rounded-md cursor-pointer hover:scale-105 ${
              active === 'home' ? 'bg-purple-100 text-purple-800 font-semibold' : 'hover:bg-gray-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActive('about')}
            className={`px-4 py-2 rounded-md cursor-pointer hover:scale-105 ${
              active === 'about' ? 'bg-purple-100 text-purple-800 font-semibold' : 'hover:bg-gray-200'
            }`}
          >
            About Me
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center">
          {active === 'home' && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Home 👋</h2>
              <p className="text-gray-600">This is My simple dashboard homepage. I am currently planning to build a tech stack AI WEBSITE  here </p>
            </>
          )}
          {active === 'about' && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">About Me</h2>
              <p className="text-gray-600">
                Hi, I'm Ishaan. I'm a passionate Coder , Problem Solver &  learning MERN stack and building secure apps with JWT, React, and Node.js!
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
