import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../features/state/auth.slice";
import AuthService from "../../api/services/AuthService";

import s from "./header.module.css";
import Logo from "./Logo.jsx";
import UserIcon from "./UserIcon.jsx";

function Header() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading } = useSelector(
        (state) => state.auth,
    );
    function handleLogout() {
        AuthService.logout();
        dispatch(logout());
    }

    function displayHeaderActions() {
        if (loading) {
            return null;
        }
        if (user) {
            return (
                <>
                    <UserIcon user={user} handleLogout={handleLogout} />
                    <Link className={s.nav_link} to={"/calendar"}>
                        GO TO CALENDAR
                    </Link>
                </>
            );
        }
        return (
            <>
                <NavLink to={"/login"} className={s.nav_link}>
                    Login
                </NavLink>
                <NavLink
                    to={"/register"}
                    className={`${s.nav_link} ${s.register}`}
                >
                    Register
                </NavLink>
            </>
        );
    }

    return (
        <header className={s.header}>
            <ul className={s.header_list}>
                <li>
                    <Logo />
                </li>
                <li className={s.header_right}>{displayHeaderActions()}</li>
            </ul>
        </header>
    );
}

export default Header;
