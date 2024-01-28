import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom"
function NoSession() {
    const { auth } = useAuth();

    return (
        auth?.token
            ? <Navigate to='/' />
            : <Outlet />
    )
}
export default NoSession