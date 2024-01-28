import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom"
function Protected() {
    const { auth } = useAuth()
    const location = useLocation();
    return (
        auth?.token
            ? <Outlet />
            : <Navigate to="account/login" state={{ from: location }} replace />
    )
}
export default Protected