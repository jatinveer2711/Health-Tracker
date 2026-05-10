import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formdata, setFormdata] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    gender: "male", // default value
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        formdata
      );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <form
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold">Signup</h1>

        {/* name */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Name"
        />

        {/* lastname */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.lastname}
          onChange={handleChange}
          name="lastname"
          type="text"
          placeholder="Last name"
        />

        {/* email */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />

        {/* password */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />

        {/* age */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.age}
          onChange={handleChange}
          name="age"
          type="number"
          placeholder="Age"
        />

        {/* weight */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.weight}
          onChange={handleChange}
          name="weight"
          type="number"
          placeholder="Weight (kg)"
        />

        {/* height */}
        <input
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.height}
          onChange={handleChange}
          name="height"
          type="number"
          placeholder="Height (cm)"
        />

        {/* gender */}
        <select
          className="w-full p-2 border rounded hover:border-blue-600"
          value={formdata.gender}
          onChange={handleChange}
          name="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* button */}
        <button className="w-full p-2 border hover:bg-blue-800 rounded bg-blue-600 text-white">
          Signup
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
