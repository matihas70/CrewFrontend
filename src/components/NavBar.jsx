import useAuth from "../hooks/useAuth"
import "../styles/NavBar.css"
import { useNavigate, Outlet } from 'react-router-dom'
import Urls from "../Consts/Urls"
function NavBar() {

    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const logout = async (e) => {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(Urls.Back + "/Account/Logout", options)
            .then(res => {
                if (res.status == 204) {
                    setAuth(null);
                    navigate('/account/login');
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }
    return (
        <>
            <nav>
                <div className="logout">
                    <span onClick={logout}>Logout</span>
                </div>
            </nav>
            <Outlet />
        </>

    )
}
export default NavBar