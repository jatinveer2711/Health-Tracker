import React, { useState } from 'react';
import { useAuth } from '../assets/context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // icon for mobile menu

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle

  const handleLogout = () => {
    logout();
    alert("You want to logout");
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600/70 backdrop-blur-md text-white px-6 py-3 flex justify-between items-center transition-all duration-300 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <Link to="/dashboard">Health Tracker</Link>
      </h1>

      {/* Hamburger Button (Mobile) */}
      <button
        className="md:hidden flex items-center text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Links Section */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600/95 md:bg-transparent 
        flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 
        px-6 py-4 md:p-0 transition-all duration-300 
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'}`}
      >
        {token ? (
          <>
            <Link to="/" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <Link to="/exercise" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Exercise
            </Link>
            <Link to="/diet" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Diet
            </Link>
            <Link to="/water" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Water
            </Link>
            <Link to="/sleep" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Sleep
            </Link>
            <Link to="/weight" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Weight
            </Link>
            <Link to="/monthly" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Monthly Report
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-200 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
