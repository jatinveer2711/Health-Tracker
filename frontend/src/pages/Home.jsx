// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
<div className="relative flex flex-col justify-center items-center min-h-screen bg-neutral-950 overflow-hidden p-6">
  {/* Subtle Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black"></div>
  <div className="absolute inset-0 bg-[url('/path/to/dark-noise.png')] opacity-10"></div>

  {/* Card */}
  <div className="relative z-10 text-center bg-neutral-900/95 rounded-3xl border border-neutral-800 p-10 md:p-14 max-w-3xl w-full shadow-2xl backdrop-blur-sm animate-fade-in-up">
    
    {/* Title */}
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5 text-neutral-50 animate-fade-in-up">
      Health <span className="text-cyan-400">Tracker</span>
    </h1>

    {/* Subtitle */}
    <p 
      className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in-up"
      style={{ animationDelay: "0.3s" }}
    >
      Stay consistent with your <span className="text-cyan-400 font-medium">diet</span>, 
      <span className="text-cyan-400 font-medium"> workouts</span>, 
      <span className="text-cyan-400 font-medium"> sleep</span>, and more — 
      all in one dashboard.
    </p>

    {/* CTA Button */}
    <button
      onClick={() => navigate("/dashboard")}
      className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl 
                 bg-cyan-600 text-white font-semibold text-lg tracking-wide
                 shadow-lg shadow-cyan-500/30 
                 hover:bg-cyan-500 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-neutral-900 animate-fade-in-up"
      style={{ animationDelay: "0.6s" }}
    >
      <span>Go to Dashboard</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
</div>

   

  );
}

