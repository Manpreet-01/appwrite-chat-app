import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";


export function LoginPage() {
    const { user, handleUserLogin } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) navigate("/");
    }, []);

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className="auth--container">
            <div className="form--wrapper">

                <form onSubmit={e => handleUserLogin(e, credentials)}>
                    <div className="field--wrapper">
                        <label htmlFor="email">Email: </label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            autoComplete="username"
                        />
                    </div>

                    <div className="field--wrapper">
                        <label htmlFor="password">Password: </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="field--wrapper">
                        <input
                            type="submit"
                            value="Login"
                            className="btn btn--lg btn--main"
                        />
                    </div>
                </form>

                <p>Don't have an account? Register <Link to="/register">here</Link></p>
            </div>

        </div>
    );
}