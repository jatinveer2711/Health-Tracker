import React, { useEffect, useState } from 'react';
import { useAuth } from '../assets/context/Authcontext';
import axios from 'axios'
import { PenBox,Trash2} from "lucide-react";

export default function WaterPage() {
  const {token} = useAuth()
  const [amount,setAmount] = useState("")
  const [enteries,setEnteries] = useState([]);
  const [editId,setEditID] = useState(null)
  const [editamount,setEditamount]  = useState({amount:""})

//get enteries
  const fetchEntries = async()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/water/getAll',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setEnteries(res.data)
    } catch (error) {
      console.error(error)
    }
  }

//create ernteries

const handleSumbit = async(e)=>{
  e.preventDefault();
  try {
     await axios.post('http://localhost:5000/api/water/create',{amount},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setAmount("")
    fetchEntries()
     
  } catch (error) {
    console.error(error)
  }
}
useEffect(()=>{
  fetchEntries()
},[token])

// delete 
const handleDelete = async(id)=>{
  try {
    const res = await axios.delete(`http://localhost:5000/api/water/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
      
    })
    alert("You want to delete this item")
    setEnteries(enteries.filter((entry)=>entry._id !== id))
  } catch (error) {
    console.error(error)
  }
}

//update water intake

const hanldeUpdate = async(e)=>{
  e.preventDefault()
  try {
    if(!editId) return;
    await axios.put(`http://localhost:5000/api/water/update/${editId}`,editamount,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setEditID(null)
    setEditamount({amount:""})
    fetchEntries()
  } catch (error) {
    console.error(error)
  }
}

  return (
    
     <div className='p-6 pt-20 max-w-md mx-auto'>
    <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>Water Tracker</h2>

    {/* Form Section */}
    <form onSubmit={handleSumbit} className='mb-6 flex gap-3 items-center'>
        <input
            className='flex-1 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
            placeholder='Enter amount in ml'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <button
            type='submit'
            className='bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
        >
            Add
        </button>
    </form>
      

      {/* update form */}


    {editId && (
      <form  onSubmit={hanldeUpdate} className="mb-6 flex flex-row gap-4 flex-wrap items-center">
        <input
    type="number"
    placeholder="Edit Amount"
    value={editamount.amount || ""}
    onChange={(e)=>setEditamount({...editamount, amount:Number(e.target.value)})}
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
        setEditamount({ amount:"" });
      }}
      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      Cancel
    </button>
  </div>
      </form>
    )}

    {/* List Section */}
    <ul className='space-y-4'>
        {enteries.map((entry) => (
            <li
                key={entry._id}
                className='bg-white p-4 rounded-xl shadow-lg flex justify-between items-center border border-gray-200'
            >
                <span className='text-lg font-bold text-blue-700'>
                    {entry.amount} ml
                </span>
                <span className='text-sm text-gray-500'>
                    {new Date(entry.date).toLocaleString()}
                </span>
                <button  className='text-red-400 hover:text-red-700'onClick={() => handleDelete(entry._id) }><Trash2 className="w-6 h-6" /></button>

                <button
              onClick={() => {
                setEditID(entry._id);
                setEditamount({ amount:entry.amount});
              }}
              className="text-gray-600 hover:text-blue-400 transition duration-200"
            >
              <PenBox className="w-6 h-6" />
            </button>
            </li>
        ))}
    </ul>
</div>
    
  )
}
