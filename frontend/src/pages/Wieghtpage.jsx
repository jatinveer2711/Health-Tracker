import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../assets/context/Authcontext";
import { PenBox,Trash2} from "lucide-react";


export default function WeightPage() {
  const { token } = useAuth();
  const [weight, setWeight] = useState("");
  const [weights, setWeights] = useState([]); // store history
  const [editId,setEditID] = useState(null)
  const [editWeight,setEditWeight] = useState({weight:""})
  // fetch weights (latest first)
  const fetchWeights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/weight/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeights(res.data);
      console.log(res.data) // response is an array
    } catch (error) {
      console.error("Error fetching weights:", error);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, [token]);

  // submit new weight
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/weight/create",
        { weight: Number(weight) }, // ensure number
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWeight("");
      fetchWeights(); // refresh list
    } catch (error) {
      console.error("Error adding weight:", error);
    }
  };


  // hanlde delete 

  const handleDelete = async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/weight/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      alert("you sure to delete this item ?")
      setWeights(weights.filter((w)=>w._id !==id))
      
    } catch (error) {
      console.error(error)
    }
  }


  // handle update 

  const handleUpdate = async(e)=>{
    e.preventDefault()
    try {
      if(!editId) return;
      await axios.put(`http://localhost:5000/api/weight/update/${editId}`,editWeight,{
    headers:{
      Authorization:`Bearer ${token}`
    }})
    setEditID(null)
    setEditWeight({weight:""})
    fetchWeights()
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center pt-20">
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
    <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
      Weight Tracker 🏋️‍♂️
    </h1>

    {/* Weight Form */}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="number"
          placeholder="Enter weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 placeholder-gray-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl hover:bg-orange-700 transition duration-300 transform hover:scale-105 shadow-md"
      >
        Add Weight
      </button>
    </form>

    ---
    {/* update form */}


    {editId && (
      <form className="mb-6 flex flex-row gap-4 flex-wrap items-center" onSubmit={handleUpdate}>
        <input
    type="number"
    placeholder="Edit Weight"
    value={editWeight.weight || ""}
    onChange={(e) => setEditWeight({ ...editWeight, weight:Number(e.target.value)})}
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
        setEditWeight({ weight:"" });
      }}
      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      Cancel
    </button>
  </div>
      </form>
    )}

    {/* Latest Weight */}
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Measurement</h2>
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <p className="text-3xl font-extrabold text-orange-600">
          {weights.length > 0 ? `${weights[0].weight} kg` : "No record yet"}
        </p>
      </div>
    </div>

    ---

    {/* Weight History */}
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">History</h2>
      <ul className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {weights.map((w) => (
          <li
            key={w._id}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
          >
            <span className="text-lg font-medium text-gray-800">
              {w.weight} kg
            </span>
            <span className="text-sm text-gray-500 font-light">
              {new Date(w.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
           <button
  onClick={() => handleDelete(w._id)}
  className="p-1 sm:p-2 text-orange-300 hover:text-orange-500 transition-colors duration-200"
>
  <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
</button>

             <button 
              onClick={() => {
                setEditID(w._id);
                setEditWeight({ weight:w.weight});
              }}
              className="text-gray-600 hover:text-green-400 transition duration-200"
            >
              <PenBox className="w-6 h-6" />
            </button>

          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
  );
}
