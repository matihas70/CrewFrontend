import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom"
function Protected() {
    const { token } = useAuth()
    const location = useLocation();
    return (
        token
            ? <Outlet />
            : <Navigate to="account/login" />
    )
}
export default Protected