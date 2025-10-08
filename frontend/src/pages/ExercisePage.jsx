import React, { useEffect, useState } from "react";
import { useAuth } from "../assets/context/Authcontext";
import axios from "axios";
import { DeleteIcon ,Trash2,PenBox} from "lucide-react";


export default function Exercise() {
  const { token } = useAuth();
  const [exercise, setExercise] = useState({ type: "", duration: "" ,caloriesBurned:""});
  const [allExercises, setAllExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId,setEditID] = useState(null)
   const [editExercise, seteditExercise] = useState({ type:"",duration:"",caloriesBurned:"" });

  // Fetch all exercises
  const fetchExercises = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/exercise/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllExercises(res.data);
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/exercise/create", exercise, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExercise({ type: "", duration: "" ,caloriesBurned:""}); // Reset form
      fetchExercises(); // Refresh the list
    } catch (err) {
      console.error("Error adding exercise:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExercises();
    }
  }, [token]);


  //handle delete

  const handleDelete = async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/exercise/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      alert("you sure ?")
      setAllExercises(allExercises.filter((ex) => ex._id !== id));
    } catch (error) {
      console.error(error)
    }
  };

  //handle update 

  const hanldeUpdate = async(e)=>{
    e.preventDefault()
    try {
      if(!editId) return;
      await axios.put(`http://localhost:5000/api/exercise/update/${editId}`,editExercise,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
       
      )
      setEditID(null);
      seteditExercise({duration:"",type:"",caloriesBurned:""})
      fetchExercises()
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
          Exercise Tracker
        </h1>
        <p className="text-center text-gray-600">
          Add your daily workouts and track your progress.
        </p>

        {/* Exercise Form */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Exercise</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="exercise-type" className="sr-only">
                Exercise Type
              </label>
              <input
                id="exercise-type"
                type="text"
                placeholder="Exercise Type (e.g., Running)"
                value={exercise.type}
                onChange={(e) =>
                  setExercise({ ...exercise, type: e.target.value })
                }
                className="w-full border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="sr-only">
                Duration
              </label>
              <input
                id="duration"
                type="number"
                placeholder="Duration (minutes)"
                value={exercise.duration}
                onChange={(e) =>
                  setExercise({ ...exercise, duration: e.target.value })
                }
                className="w-full border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="exercise-type" className="sr-only">
                Exercise Type
              </label>
              <input
                id="exercise-type"
                type="text"
                placeholder="how much calories burned"
                value={exercise.caloriesBurned}
                onChange={(e) =>
                  setExercise({ ...exercise, caloriesBurned: e.target.value })
                }
                className="w-full border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Exercise
            </button>
          </form>
        </div>

        {/* update form */}

        {editId && (
          <form onSubmit={hanldeUpdate} className="mb-6 flex gap-3">
            <input
            type="text"
            placeholder="Edit type"
            value={editExercise.type}
            onChange={(e) => seteditExercise({ ...editExercise, type: e.target.value })}
            className="border px-3 py-2 rounded"
          />

           <input
            type="number"
            placeholder="Edit duration"
            value={editExercise.duration}
            onChange={(e) => seteditExercise({ ...editExercise, duration: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          

          <input
            type="number"
            placeholder="Edit calories burned"
            value={editExercise.caloriesBurned}
            onChange={(e) => seteditExercise({ ...editExercise, caloriesBurned: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Update
          </button>

          <button
            type="button"
            onClick={() => {
              setEditID(null);
              setExercise({ type: "" ,caloriesBurned:"",duration:""});
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          </form>
        )}

        {/* Exercise List */}
        <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Exercises</h2>
  {isLoading ? (
    <p className="text-center text-gray-500">Loading exercises...</p>
  ) : error ? (
    <p className="text-center text-red-500">{error}</p>
  ) : allExercises.length > 0 ? (
    <ul className="space-y-4">
      {allExercises.map((ex) => (
        <li
          key={ex._id}
          className="bg-gray-100 p-4 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center transition-colors hover:bg-gray-200 gap-4"
        >
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full">
            <span className="text-lg text-gray-800 font-medium">
              {ex.type}
            </span>
            <span className="text-base text-gray-600 font-semibold md:text-lg">
              {ex.duration} min
            </span>
            <span className="text-base text-gray-600 font-semibold md:text-lg">
              {ex.caloriesBurned} cal
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(ex._id)}
              className="text-gray-600 hover:text-red-500 transition duration-200"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                setEditID(ex._id);
                seteditExercise({ duration: ex.duration, type: ex.type, caloriesBurned: ex.caloriesBurned });
              }}
              className="text-gray-600 hover:text-yellow-400 transition duration-200"
            >
              <PenBox className="w-6 h-6" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-500">
      You haven't added any exercises yet.
    </p>
  )}
</div>
      </div>
    </div>
  );
}

