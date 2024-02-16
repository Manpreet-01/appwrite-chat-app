import { LogIn, LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext";

export function Header() {
    const {user, handleUserLogout} = useAuth();

    return (
        <div id="header--wrapper">
            {user ? (
                <>
                    Welcome {user.name}
                    <LogOut onClick={handleUserLogout} className="header--link" />
                </>
            ) : (
                <LogIn className="header--link" />
            )}
        </div>
    );
}