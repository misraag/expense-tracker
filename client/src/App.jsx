import { Route, Routes } from 'react-router-dom'
import './App.css'
import BackendTest from './components/BackendTest'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Expenses from './pages/Expenses'

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <>
      {/* <BackendTest/> */}
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/expenses' element={<Expenses user={user}/>}/>

      </Routes>
    </>
  )
}

export default App
