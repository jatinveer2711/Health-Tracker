  import React from 'react';
  import { useState,useEffect } from 'react';
  import { useAuth } from "../assets/context/Authcontext";
  import axios from 'axios';
  import { ResponsiveContainer, BarChart, Bar, LineChart, Line,  CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
  const StatCard = ({ title, value, unit, color, icon }) => (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between border-t-4 ${color}`}>
      <div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <p className="text-neutral-400 font-medium">{title}</p>
        </div>
        <p className="mt-3 text-3xl font-bold text-white">
          {value} <span className="text-lg font-medium text-neutral-500">{unit}</span>
        </p>
      </div>
    </div>
  );
 

  export default function Monthly() {
      const [chartType, setChartType] = useState('line');

      const {token} = useAuth();
      const [monthlyData,setMonthlyData] = useState({
        reportMonthly : [] ,
          averageMonth : 0 ,
          averageCalories : 0,
          averageSleep : 0,
          averageWater : 0,
          weightMontlyReport:0,
          monthlyAvgWeight:0,
      });
      useEffect(()=>{
          const fetchMonthlyData = async()=>{
            try {
              const res = await axios.get('http://localhost:5000/api/monthly/getAll',{
                  headers:{
                      Authorization:`Bearer ${token}`
                  }
              })
              setMonthlyData(res.data);
            } catch (error) {
              console.error(error);
            }
          }
          fetchMonthlyData()
      },[token])

   

    return (
      <div className="min-h-screen bg-neutral-950 font-sans  text-neutral-200 p-4 sm:p-6 lg:p-8">
        <main className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <header>
            <h1 className="text-3xl md:text-4xl font-bold pt-16 tracking-tight text-white">
              📊 Monthly Health Dashboard
            </h1>
            <p className="mt-2 text-neutral-400">
              An overview of your health metrics for September 2025.
            </p>
          </header>

          {/* Summary Stat Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard title="Avg. Calories" value={monthlyData.averageCalories} unit="kcal" color="border-red-500" icon="🔥" />
            <StatCard title="Total Exercise" value={monthlyData.averageMonth} unit="minutes" color="border-yellow-500" icon="💪" />
            <StatCard title="Avg. Water" value={monthlyData.averageWater} unit="glasses" color="border-blue-400" icon="💧" />
            <StatCard title="Avg. Sleep" value={monthlyData.averageSleep} unit="houres" color="border-purple-400" icon="😴" />
            <StatCard title="Weight change" value={monthlyData.monthlyAvgWeight} unit="kg" color="border-orange-500" icon="⚖️" />
          </div>

          {/* Chart Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl">
            {/* Chart Header with Toggles */}
            <div className="p-4 sm:p-6 border-b border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Metrics Over Time</h2>
                <p className="text-sm text-neutral-400 mt-1">Visualize your daily progress.</p>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-neutral-800 p-1">
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    chartType === 'line' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Line
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    chartType === 'bar' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Bar
                </button>
              </div>
            </div>

            {/* Chart Canvas */}
            <div className="p-2 sm:p-4">
              <ResponsiveContainer width="100%" height={450}>
                {chartType === 'line' ? (
                  <LineChart data={monthlyData.reportMonthly} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        borderColor: '#4b5563',
                        borderRadius: '0.75rem',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
                    <Line type="monotone" dataKey="calories" stroke="#f87171" strokeWidth={2} name="Calories" dot={false} />
                    <Line type="monotone" dataKey="exercise" stroke="#60a5fa" strokeWidth={2} name="Exercise (min)" dot={false} />
                    <Line type="monotone" dataKey="water" stroke="#34d399" strokeWidth={2} name="Water (glasses)" dot={false} />
                    <Line type="monotone" dataKey="sleep" stroke="#fbbf24" strokeWidth={2} name="Sleep (hours)" dot={false} />
                    <Line type="monotone" dataKey="weight" stroke="#a78bfa" strokeWidth={2} name="Weight (kg)" dot={false} />
                  </LineChart>
                ) : (
                  <BarChart data={monthlyData.reportMonthly} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        borderColor: '#4b5563',
                        borderRadius: '0.75rem',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
                    <Bar dataKey="calories" fill="#f87171" name="Calories" />
                    <Bar dataKey="exercise" fill="#60a5fa" name="Exercise (min)" />
                    <Bar dataKey="water" fill="#34d399" name="Water (glasses)" />
                    <Bar dataKey="sleep" fill="#fbbf24" name="Sleep (hours)" />
                    <Bar dataKey="weight" fill="#a78bfa" name="Weight (kg)" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    )
  }
