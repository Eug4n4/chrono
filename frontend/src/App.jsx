import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/404";
import SetNewPassword from "./pages/auth/SetNewPassword";
import PasswordReset from "./pages/auth/PasswordReset";
import EmailVerification from "./pages/auth/EmailVerification";
import CalendarPage from "./pages/calendar/CalendarPage";
import AppInitializer from "./components/AppInitializer";
import ProtectedRoute from "./components/accessRoutes/ProtectedRoute";
import GuestRoute from "./components/accessRoutes/GuestRoute";

function App() {
    return (
        <AppInitializer>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <Register />
                        </GuestRoute>
                    }
                />
                <Route
                    path="password-reset/:token"
                    element={
                        <GuestRoute>
                            <SetNewPassword />
                        </GuestRoute>
                    }
                />
                <Route
                    path="password-reset"
                    element={
                        <GuestRoute>
                            <PasswordReset />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/verify-email/:token"
                    element={<EmailVerification />}
                />
                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <CalendarPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AppInitializer>
    );
}

export default App;
