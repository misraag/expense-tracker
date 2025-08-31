import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import BackendTest from './components/BackendTest'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Expenses from './pages/Expenses'
import AddExpense from './pages/AddExpense'
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <>
      {/* <BackendTest/> */}
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/expenses' element={<Expenses user={user}/>}/>
        <Route path="/add" element={<AddExpense user={user}/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />

      </Routes>
    </>
  )
}

export default App
