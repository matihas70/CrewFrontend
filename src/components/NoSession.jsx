import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom"
function NoSession() {
    const { token } = useAuth();

    return (
        token
            ? <Navigate to='/' />
            : <Outlet />
    )
}
export default NoSession