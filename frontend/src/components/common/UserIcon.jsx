import { useState } from "react";
import SettingsModal from "../settings/SettingsModal";
import Button from "./buttons/Button";

import s from "./header.module.css";

export default function UserIcon({ user, handleLogout }) {
    const [isUserActionsShown, showUserActions] = useState(false);
    const [isSettingsShown, setIsSettingsShown] = useState(false);

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
                <div>
                    <p>{user.login}</p>
                </div>

                {isUserActionsShown && (
                    <div className={s.user_actions}>
                        <Button
                            className=""
                            onClick={() => setIsSettingsShown(true)}
                        >
                            Settings
                        </Button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            <SettingsModal
                user={user}
                isOpen={isSettingsShown}
                onClose={() => setIsSettingsShown(false)}
            />
        </div>
    );
}
