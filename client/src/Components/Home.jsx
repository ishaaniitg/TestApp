import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Site</h1>
      <p className="text-gray-700 mb-4">This is a public home page accessible to everyone.</p>

      <div className="flex gap-4">
        <NavLink to="/Register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register
        </NavLink>
        <NavLink to="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Go to Dashboard
        </NavLink>
      </div>
    </div>
  )
}

export default Home

