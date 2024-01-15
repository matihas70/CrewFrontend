import Home from "./Pages/Home"
import Profile from "./pages/Profile"
import { Link, Route, Routes } from "react-router-dom"
import './App.css'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Activated from "./pages/Activated"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='account'>
          <Route path="register" element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='activated' element={<Activated />}></Route>
        </Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>

    </div>
  )
}

export default App
