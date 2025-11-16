import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../features/state/authSlice";
import AuthService from "../../api/services/AuthService";

import s from "./header.module.css";

function Header() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading } = useSelector(
        (state) => state.auth,
    );
    const [isUserActionsShown, showUserActions] = useState(false);

    function handleLogout() {
        AuthService.logout();
        dispatch(logout());
    }

    function displayHeaderActions() {
        if (loading) {
            return null;
        }
        if (isAuthenticated) {
            return (
                <>
                    <div
                        className={s.avatar}
                        onClick={() => showUserActions(!isUserActionsShown)}
                    >
                        <div className={s.user_section}>
                            <div>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
                                    alt="avatar"
                                />
                            </div>
                            <div>
                                <p>{user.login}</p>
                            </div>
                            {isUserActionsShown && (
                                <div className={s.user_actions}>
                                    <Link to={"/settings"}>Settings</Link>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

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
                    <Link to={"/"} className={`${s.nav_link} ${s.logo}`}>
                        CHRONOS
                    </Link>
                </li>
                <li className={s.header_right}>{displayHeaderActions()}</li>
            </ul>
        </header>
    );
}

export default Header;
