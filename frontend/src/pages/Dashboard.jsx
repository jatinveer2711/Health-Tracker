import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useAuth } from "../assets/context/Authcontext"; // Adjust path according to your project

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
     totalExercises: 0,
    totalCalories: 0,
    totalSleephours: 0,
    totalWaterintake: 0,
    latesWeight: 0,
    height: 0,
    weight: 0,
    weeklyHistory: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.log("Dashboard fetch error:", error);
      }
    };
    fetchData();
  }, [token]);

  const heightInM = stats.height / 100;
  const weighINkg = stats.latesWeight || stats.weight;
  const bMI = heightInM && weighINkg ? (weighINkg / (heightInM * heightInM)).toFixed(2) : "N/A";

  let bmiStatus;
  if (bMI !== "N/A") {
    const bmiValue = parseFloat(bMI);
    if (bmiValue < 18.5) bmiStatus = "Underweight";
    else if (bmiValue >= 18.5 && bmiValue <= 24.9) bmiStatus = "Normal weight";
    else bmiStatus = "Overweight";
  } else {
    bmiStatus = "N/A";
  }

  // Dynamic BMI indicator position (example)
  const getBmiPosition = () => {
    if (bMI === "N/A") return "0%";
    const value = parseFloat(bMI);
    if (value < 18.5) return "0%";
    else if (value <= 24.9) return "35%";
    else if (value <= 30) return "70%";
    else return "100%";
  };

  return (
    <div className="p-6 pt-20 bg-gray-200">
      <h1 className="text-2xl font-bold mb-6">📊 Health Dashboard</h1>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {/* Calories Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500 transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Calories</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalCalories} KCAL</p>
        </div>

        {/* Water Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500 transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Water</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalWaterintake} ml</p>
        </div>

        {/* Exercise Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500 transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Exercise</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalExercises} min</p>
        </div>

        {/* Sleep Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-500 transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Sleep</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalSleephours} hr</p>
        </div>

        {/* Weight Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-500 transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Weight</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {stats.latesWeight ? `${stats.latesWeight} KG` : "No record"}
          </p>
        </div>
      </div>

      {/* BMI Section */}
      <div className="w-full max-w-sm mb-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl">
        <div className="mb-6 text-left">
          <h2 className="text-xl font-bold text-gray-800">Body Mass Index (BMI)</h2>
          <p className="text-sm text-gray-500">A measure of your body fat based on height and weight.</p>
        </div>
        <div className="text-center">
          <p className="text-6xl font-extrabold text-blue-600">{bMI}</p>
          <p className="text-lg font-semibold text-blue-800">{bmiStatus}</p>
        </div>

        {/* Visual Scale */}
        <div className="mt-8">
          <div className="relative h-2 w-full rounded-full bg-gray-200">
            <div className="absolute h-2 w-1/4 rounded-l-full bg-blue-300"></div>
            <div className="absolute left-1/4 h-2 w-1/4 bg-green-400"></div>
            <div className="absolute left-2/4 h-2 w-1/4 bg-yellow-400"></div>
            <div className="absolute left-3/4 h-2 w-1/4 rounded-r-full bg-red-400"></div>

            {/* Indicator */}
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 shadow-lg"
              style={{ left: getBmiPosition() }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-gray-500">
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 text-center">
          <p className="text-sm text-gray-600">
            A healthy BMI range is between <span className="font-bold text-gray-800">18.5</span> and{" "}
            <span className="font-bold text-gray-800">24.9</span>.
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Calories */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Weekly Calories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.weeklyHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#d1fae5", borderRadius: "8px", border: "none" }}
                labelStyle={{ fontWeight: "bold", color: "#065f46" }}
                itemStyle={{ color: "#10b981", fontWeight: 500 }}
                formatter={(value, name) => [`${value} kcal`, name]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
              <Bar dataKey="calories" fill="#4ade80" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Exercise */}
        <div className="p-4 bg-white rounded-2xl shadow hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-3">Weekly Exercise (minutes)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.weeklyHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff7ed", borderRadius: "8px", border: "none" }}
                labelStyle={{ fontWeight: "bold", color: "#b45309" }}
                itemStyle={{ color: "#d97706", fontWeight: 500 }}
                formatter={(value, name) => [`${value} min`, name]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
              <Area type="monotone" dataKey="exercise" stroke="#FFD700" fill="rgba(255, 215, 0, 0.3)" strokeWidth={3} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Sleep */}
        <div className="p-4 bg-white rounded-2xl shadow hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-3">Weekly Sleep (hours)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.weeklyHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#f3e8ff", borderRadius: "8px", border: "none" }}
                labelStyle={{ fontWeight: "bold", color: "#6b21a8" }}
                itemStyle={{ color: "#7e22ce", fontWeight: 500 }}
                formatter={(value, name) => [`${value} hrs`, name]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
              <Line type="monotone" dataKey="sleep" stroke="#800080" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Water */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Weekly Water Intake</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.weeklyHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#dbeafe", borderRadius: "8px", border: "none" }}
                labelStyle={{ fontWeight: "bold", color: "#1d4ed8" }}
                itemStyle={{ color: "#2563eb", fontWeight: 500 }}
                formatter={(value, name) => [`${value} ml`, name]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
              <Line type="monotone" dataKey="water" stroke="#60a5fa" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weight Progress */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 lg:col-span-2 hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Weight Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.weeklyHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fef3c7", borderRadius: "8px", border: "none" }}
                labelStyle={{ fontWeight: "bold", color: "#ea580c" }}
                itemStyle={{ color: "#b45309", fontWeight: 500 }}
                formatter={(value, name) => [`${value} kg`, name]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
              <Line type="monotone" dataKey="weight" stroke="#f97316" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
