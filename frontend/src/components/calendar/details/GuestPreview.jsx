import React from "react";
import s from "./guest.preview.module.css";

function GuestPreview({ guest, onRemove }) {
    const { user } = guest;
    const avatarUrl = user.avatar
        ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
        : null;

    return (
        <div className={s.guest_preview}>
            <div className={s.left_section}>
                <div className={s.avatar}>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={user.login} />
                    ) : (
                        <div className={s.avatar_placeholder}>
                            {user.login.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className={s.info}>
                    <div className={s.login}>{user.login}</div>
                    <div className={s.email}>{user.email}</div>
                </div>
            </div>
            {onRemove && (
                <button
                    className={s.remove_btn}
                    onClick={() => onRemove(guest)}
                    title="Remove"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default GuestPreview;
