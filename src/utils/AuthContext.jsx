import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();
export default AuthContext;


// user & pass
// manichat@gmail.com
// mani@7198435there$

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUserOnLoad();
    }, []);

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.warn(":: :: ", error);
        }

        setLoading(false);
    };

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try {
            const response = await account.createEmailSession(credentials.email, credentials.password);
            // console.log(":::: ", response);

            const accountDetails = await account.get();
            // console.log("::::::::: ", accountDetails);

            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("::: err", error);
        }
    };

    const handleUserLogout = async () => {
        await account.deleteSession("current");
        setUser(null);
    };

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault();

        if (credentials.password !== credentials.password2) {
            alert("Password do not match!");
            return;
        }

        try {
            let response = await account.create(ID.unique(), credentials.email, credentials.password, credentials.name);
            console.log(":: :: REGISTERED", response);

            handleUserLogin(e, credentials);
        } catch (error) {
            console.error(error);
        }
    };

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading....</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);