import { Route, Routes } from 'react-router-dom'
import './App.css'
import BackendTest from './components/BackendTest'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {


  return (
    <>
      {/* <BackendTest/> */}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/expenses' element={}/>
        <Route path='/add' element={}/> */}
      </Routes>
    </>
  )
}

export default App
