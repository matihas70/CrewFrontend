import Home from "./Pages/Home"
import Profile from "./pages/Profile"
import { Link, Route, Routes } from "react-router-dom"
import './App.css'
import Urls from "./Consts/Urls.js"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Activated from "./pages/Activated"
import { useContext, useEffect, useState } from "react"
import NoSession from "./components/application/NoSession"
import Protected from "./components/application/Protected"
import useAuth from "./hooks/useAuth.js"
import NavBar from "./components/application/NavBar"
import Connector from "./services/Connector.js"
function App() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      await Connector.CheckSession()
        .then(res => {
          if (res.status == 200) {
            return res.text();
          }
        }).then(token => {
          setAuth({ token });
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
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
          <Route element={<NavBar />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
          </Route>

        </Route>
      </Routes>

    </div >
  )
}

export default App
