import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";



export function RegisterPage() {
    const { handleUserRegister } = useAuth();
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className="auth--container">
            <div className="form--wrapper">

                <form onSubmit={e => handleUserRegister(e, credentials)}>
                    <div className="field--wrapper">
                        <label htmlFor="name">Name: </label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            value={credentials.name}
                            onChange={handleInputChange}
                            autoComplete="name"
                        />
                    </div>

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
                        <label htmlFor="password2">Password: </label>
                        <input
                            required
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="Confirm your password"
                            value={credentials.password2}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="field--wrapper">
                        <input
                            type="submit"
                            value="Register"
                            className="btn btn--lg btn--main"
                        />
                    </div>
                </form>

                <p>Already have an account? Login <Link to="/login">here</Link></p>
            </div>

        </div>
    );
}