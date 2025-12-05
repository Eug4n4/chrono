import s from "./header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserIcon({ user, handleLogout }) {
    const [isUserActionsShown, showUserActions] = useState(false);

    return (
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
                <div className={s.userName}>
                    <p>{user.login}</p>
                </div>

                {isUserActionsShown && (
                    <div className={s.user_actions}>
                        <Link to="/settings">Settings</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}
