import React, { useEffect, useState } from 'react';
import { useAuth } from '../assets/context/Authcontext';
import axios, { all } from 'axios';
import { PenBox,Trash2} from "lucide-react";

export default function DietPage() {
  const { token } = useAuth();
  const [foodata, setFoodata] = useState({
    foodtype: "",
    calories: "",
    fats: "",
    protein: "",
    carbs: "",
  });
  const [allfooddata, setAllfoodata] = useState([]);
  const [editId,setEditID] = useState(null)
  const [editDiet,setEditDiet] = useState({
     foodtype: "",
    calories: "",
    fats: "",
    protein: "",
    carbs: "",
  })

  // Fetch diet
  const fetchDiet = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/diet/getAll', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllfoodata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Create food data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/diet/create', foodata, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFoodata({ foodtype: "", calories: "", fats: "", protein: "", carbs: "" });
      fetchDiet();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiet();
  }, [token]);


  //  delete

  const handleDelete = async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/diet/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      alert("you sure ?")
      setAllfoodata(allfooddata.filter((food) => food._id !== id));
    } catch (error) {
      console.error(error)
    }
  }

  //  handle update

  const hanldeUpdate = async(e)=>{
    e.preventDefault()
    try {
      if(!editId) return;
      const res = await axios.put(`http://localhost:5000/api/diet/update/${editId}`,editDiet,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setEditID(null)
      setEditDiet({foodtype: "", calories: "", fats: "", protein: "", carbs: "" });
      fetchDiet()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='bg-gray-50 min-h-screen p-6 pt-20 max-w-3xl mx-auto font-sans'>
  <h1 className='text-4xl font-extrabold mb-2 text-center text-gray-800 tracking-tight'>
    Diet Tracker
  </h1>
  <p className='text-center text-gray-500 mb-8'>
    Log your food to keep track of calories and macronutrients.
  </p>

  {/*  create Form */}
  <form className='mb-8 space-y-5 bg-white p-8 rounded-2xl shadow-lg border border-gray-100' onSubmit={handleSubmit}>
    <div className="space-y-2">
      <label htmlFor="food-name" className="text-gray-700 font-medium">Food Name</label>
      <input
        id="food-name"
        type="text"
        placeholder="e.g., Grilled Chicken Salad"
        value={foodata.foodtype}
        onChange={(e) => setFoodata({ ...foodata, foodtype: e.target.value })}
        className="border border-gray-300 p-3 rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        required
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="calories" className="text-gray-700 font-medium">Calories</label>
      <input
        id="calories"
        type="number"
        placeholder="Total Calories (kcal)"
        value={foodata.calories}
        onChange={(e) => setFoodata({ ...foodata, calories: e.target.value })}
        className="border border-gray-300 p-3 rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="space-y-2">
        <label htmlFor="fats" className="text-gray-700 font-medium">Fats (g)</label>
        <input
          id="fats"
          type="number"
          placeholder="0"
          value={foodata.fats}
          onChange={(e) => setFoodata({ ...foodata, fats: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="protein" className="text-gray-700 font-medium">Protein (g)</label>
        <input
          id="protein"
          type="number"
          placeholder="0"
          value={foodata.protein}
          onChange={(e) => setFoodata({ ...foodata, protein: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="carbs" className="text-gray-700 font-medium">Carbs (g)</label>
        <input
          id="carbs"
          type="number"
          placeholder="0"
          value={foodata.carbs}
          onChange={(e) => setFoodata({ ...foodata, carbs: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>
    </div>

    <button type='submit' className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full font-semibold shadow-md transition duration-300 ease-in-out'>
      Add Food
    </button>
  </form>

  {/* update form */}
  {editId && (
    <form onSubmit={hanldeUpdate} className="mb-6 flex flex-row gap-4 flex-wrap items-center">
      <input
    type="text"
    placeholder="Edit Calories"
    value={editDiet.calories}
    onChange={(e) => setEditDiet({ ...editDiet, calories: e.target.value })}
    className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="text"
    placeholder="Edit foodtype"
    value={editDiet.foodtype}
    onChange={(e) => setEditDiet({ ...editDiet, foodtype: e.target.value })}
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
        setEditDiet({ calories:"" });
      }}
      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      Cancel
    </button>
  </div>
    </form>
  )}

  {/* Diet List */}
  <div className="space-y-4">
    {allfooddata.length === 0 ? (
      <p className="text-gray-500 text-center py-4">No diet records yet.</p>
    ) : (
      allfooddata.map((item) => (
        <div key={item._id} className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex justify-between items-start transition duration-300 hover:shadow-lg">
          <div className="flex-1">
            <h2 className="font-bold text-xl text-gray-800 mb-1">{item.foodtype}</h2>
            <div className="text-gray-500 text-sm flex flex-wrap gap-x-4">
              <span><span className="font-semibold text-gray-700">{item.calories}</span> kcal</span>
              <span><span className="font-semibold text-gray-700">{item.fats}</span>g Fats</span>
              <span><span className="font-semibold text-gray-700">{item.protein}</span>g Protein</span>
              <span><span className="font-semibold text-gray-700">{item.carbs}</span>g Carbs</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => handleDelete(item._id)}
            className="text-red-500 hover:text-red-700 ml-4 transition duration-200"
          >
            <Trash2 className="w-6 h-6" />
          </button>
          <button
              onClick={() => {
                setEditID(item._id);
                setEditDiet({ foodtype: item.foodtype, calories:item.calories});
              }}
              className="text-gray-600 hover:text-green-400 transition duration-200"
            >
              <PenBox className="w-6 h-6" />
            </button>
        </div>
      ))
    )}
  </div>
</div>
  );
}
