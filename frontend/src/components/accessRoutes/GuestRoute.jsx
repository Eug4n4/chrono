import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return !isAuthenticated ? children : <Navigate to="/calendar" />;
};

export default GuestRoute;
