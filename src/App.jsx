import Home from "./Pages/Home"
import Profile from "./pages/Profile"
import { Link, Route, Routes } from "react-router-dom"
import './App.css'
import Urls from "./Consts/Urls.js"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Activated from "./pages/Activated"
import { useContext, useEffect, useState } from "react"
import NoSession from "./components/NoSession"
import Protected from "./components/Protected"
import AuthContext, { AuthProvider } from "./contexts/AuthProvider.jsx"
import useAuth from "./hooks/useAuth.js"
function App() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      await fetch(Urls.Back + "/Account/Refresh", options)
        .then(res => {
          if (res.status == 200) {
            setAuth({ token: res.text() });
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (loading)
      checkSession()
  })


  if (loading) {
    return (<div></div>)
  }
  return (
    <div className="App" >
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

    </div >
  )
}

export default App
