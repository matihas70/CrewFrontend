import Home from "./Pages/Home"
import Profile from "./pages/Profile"
import { Link, Route, Routes } from "react-router-dom"
import './App.css'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Activated from "./pages/Activated"
import { useContext, useEffect, useState } from "react"
import NoSession from "./components/NoSession"
import Protected from "./components/Protected"
import AuthContext from "./contexts/AuthProvider.jsx"
function App() {
  //const auth = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route element={<NoSession />}>
          <Route path='account'>
            <Route path="register" element={<Register />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='activated' element={<Activated />}></Route>
          </Route>
        </Route>
        <Route element={<Protected />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Route>
      </Routes>

    </div>
  )
}

export default App
