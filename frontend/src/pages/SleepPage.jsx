import React, { useEffect, useState } from 'react';
import { useAuth } from '../assets/context/Authcontext';
import axios from 'axios';
import { Trash2,PenBox} from "lucide-react";


export default function SleepPage() {
  const {token} = useAuth();
  const [sleep,setSleep] = useState({hours:"",quality:""})
  const [allsleep,setAllsleep]=useState([])
  const [editId,setEditID]=useState(null)
  const [editSleep,setEditSleep]=useState({hours:"",quality:""})


  //fetch sleep data
  const fetchSleep = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/sleep/getAll',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setAllsleep(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  //add sleep data 

  const handleSumbit = async(e)=>{
     e.preventDefault();
     try {
      await axios.post('http://localhost:5000/api/sleep/create',sleep,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setSleep({hours:"",quality:""})
      fetchSleep()
     } catch (error) {
      console.error(error)
     }
  }
  useEffect(()=>{
    fetchSleep()
  },[token])


  // handle delete

  const handleDelete = async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/sleep/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      alert("you want to delete this item ?")
      setAllsleep(allsleep.filter((sl)=>sl._id !==id))
    } catch (error) {
      console.error(error)
    }
  }


  // update 

  const hanldeUpdate = async(e)=>{
    e.preventDefault()
    try {
      if(!editId) return
      const res = await axios.put(`http://localhost:5000/api/sleep/update/${editId}`,editSleep,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setEditID(null)
      setEditSleep({hours:"",quality:""})
      fetchSleep()
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
          <div className="min-h-screen bg-slate-100 p-4 flex flex-col items-center justify-center font-sans">
  <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full">
    <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-10">
      Sleep Tracker 🌙
    </h1>

    {/* update form */}


    {editId && (
   <form onSubmit={hanldeUpdate} className="mb-6 flex flex-row gap-4 flex-wrap items-center">
  <input
    type="text"
    placeholder="Edit hours"
    value={editSleep.hours}
    onChange={(e) => setEditSleep({ ...editSleep, hours: e.target.value })}
    className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  
  <input
    type="text"
    placeholder="Edit quality"
    value={editSleep.quality}
    onChange={(e) => setEditSleep({ ...editSleep, quality: e.target.value })}
    className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <div className="flex gap-3">
    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
      Update
    </button>
    <button
      type="button"
      onClick={() => {
        setEditID(null);
        setEditSleep({ quality: "", hours: "" });
      }}
      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      Cancel
    </button>
  </div>
</form>
        )}



    {/* Sleep Form */}
    <form onSubmit={handleSumbit} className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="Hours"
            value={sleep.hours}
            onChange={(e) => setSleep({ ...sleep, hours: e.target.value })}
            className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-slate-500 text-lg font-medium"
            required
            min="0"
            step="0.1"
          />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Quality (e.g., 'Good', 'Restless')"
            value={sleep.quality}
            onChange={(e) => setSleep({ ...sleep, quality: e.target.value })}
            className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-slate-500 text-lg font-medium"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg"
      >
        Add Sleep Record
      </button>
   
    </form>

    ---
   
    

  

    {/* Sleep List */}
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
        Your Sleep History
      </h2>
      {allsleep.length === 0 ? (
        <p className="text-center text-slate-500 font-medium p-4 rounded-lg bg-slate-50 border border-dashed border-slate-300">
          No sleep records yet. Add your first entry above!
        </p>
      ) : (
        <ul className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {allsleep.map((sl) => (
            <li
              key={sl._id}
              className="bg-indigo-50 p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 hover:shadow-md"
            >
              <div className="flex-grow">
                <span className="text-2xl font-extrabold text-indigo-700">
                  {sl.hours}h
                </span>
                <span className="text-xl font-medium text-slate-600 ml-2">
                  <span className="text-indigo-400">•</span> {sl.quality}
                </span>
              </div>
              <span className="text-sm text-slate-500 font-light mt-2 sm:mt-0">
                {new Date(sl.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <button onClick={() => handleDelete(sl._id)}><Trash2 className=" p-2 rounded-full text-purple-600 hover:bg-red-100 hover:text-purple-950 transition-colors" /></button>
              <button
              onClick={() => {
                setEditID(sl._id);
                setEditSleep({ hours: sl.hours, quality:sl.quality});
              }}
              className="text-gray-600 hover:text-yellow-400 transition duration-200"
            >
              <PenBox className="w-6 h-6" />
            </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>
  )
}
