import React from 'react'
import Register from './components/Register'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <Navbar/>
      {/* <Register/> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>

    </div>
  )
}

export default App
