import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Room } from "./pages/Room";
import { LoginPage } from "./pages/LoginPage";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import { RegisterPage } from "./pages/RegisterPage";


export function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        
                        <Route element={<PrivateRoutes />} >
                            <Route path="/" element={<Room />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}