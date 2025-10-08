import React from 'react'
import Signup from './pages/signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Water from './pages/WaterPage';
import Exercise from './pages/ExercisePage';
import Monthly from './pages/Monthly.jsx';
import Sleep from './pages/SleepPage';
import Weight from './pages/Wieghtpage';
import Diet from './pages/DietPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { useAuth } from './assets/context/Authcontext';
import Home from './pages/Home';

export default function App() {
  const {token} = useAuth()
  return (
    <Router>
     {token && <Navbar></Navbar>} 
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        {/* protected Route */}
              <Route path='/dashboard' element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}></Route>
              <Route path='/' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
              <Route path='/water' element={<ProtectedRoute><Water></Water></ProtectedRoute>}></Route>
              <Route path='/exercise' element={<ProtectedRoute><Exercise></Exercise></ProtectedRoute>}></Route>
              <Route path='/sleep' element={<ProtectedRoute><Sleep></Sleep></ProtectedRoute>}></Route>
              <Route path='/weight' element={<ProtectedRoute><Weight></Weight></ProtectedRoute>}></Route>
              <Route path='/diet' element={<ProtectedRoute><Diet></Diet></ProtectedRoute>}></Route>
              <Route path='/monthly' element={<ProtectedRoute><Monthly></Monthly></ProtectedRoute>}></Route>

      </Routes>
    </Router>
  )
}
