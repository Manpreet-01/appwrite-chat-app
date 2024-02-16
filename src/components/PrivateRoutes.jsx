import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


export function PrivateRoutes() {
    const { user } = useAuth();

    return (
        <>
            {/* <h1>PrivateRoutes</h1> */}
            {user ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
}