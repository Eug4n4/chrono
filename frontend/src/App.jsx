import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/404";
import SetNewPassword from "./pages/auth/SetNewPassword";
import PasswordReset from "./pages/auth/PasswordReset";
import EmailVerification from "./pages/auth/EmailVerification";
import CalendarPage from "./pages/calendar/CalendarPage";

function Layout() {
    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="password-reset/:token"
                    element={<SetNewPassword />}
                />
                <Route path="password-reset" element={<PasswordReset />} />
                <Route
                    path="/verify-email/:token"
                    element={<EmailVerification />}
                />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
