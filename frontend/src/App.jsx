import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/404/404";
import SetNewPassword from "./pages/auth/SetNewPassword";
import PasswordReset from "./pages/auth/PasswordReset";
import EmailVerification from "./pages/auth/EmailVerification";
import CalendarPage from "./pages/calendar/CalendarPage";
import AppInitializer from "./components/AppInitializer";
import ProtectedRoute from "./components/accessRoutes/ProtectedRoute";
import GuestRoute from "./components/accessRoutes/GuestRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/common/Header";
import LandingPage from "./pages/Landing";
import CreateEventPage from "./pages/event/CreateEventPage.jsx";

function Layout() {
    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

function SecondLayout() {
    return (
        <>
            <Header />
            {Layout()}
        </>
    );
}

function App() {
    return (
        <AppInitializer>
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<SecondLayout />}>
                        <Route path="/" element={<LandingPage />} />
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
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route
                        path="/calendar"
                        element={
                            <ProtectedRoute>
                                <CalendarPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-event"
                        element={
                            <ProtectedRoute>
                                <CreateEventPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
            <ToastContainer theme="dark" />
        </AppInitializer>
    );
}

export default App;
