import React, { useState } from "react";
import styles from "./Header.module.css";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/state/authSlice';

const Header = ({ currentView, setCurrentView, onNext, onPrev, title }) => {
    const dispatch = useDispatch();
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <button className={styles.button}>☰</button>
                <button className={styles.button}>Today</button>
                <h2 className={styles.headerTitle}>{title}</h2>
            </div>
            <div className={styles.headerCenter}>
                {["Daily", "Weekly", "Monthly", "Yearly"].map((view) => (
                    <button
                        key={view}
                        className={`${styles.button} ${
                            currentView === view ? styles.active : ""
                        }`}
                        onClick={() => setCurrentView(view)}
                    >
                        {view}
                    </button>
                ))}
                <button className={styles.navButton} onClick={onPrev}>
                    &lt;
                </button>
                <button className={styles.navButton} onClick={onNext}>
                    &gt;
                </button>
            </div>
            <div className={styles.headerRight}>
                <button className={styles.button} onClick={handleLogout}>
                    Logout
                </button>
                <div className={styles.createMenu}>
                    <button
                        className={styles.button}
                        onClick={() => setShowCreateMenu(!showCreateMenu)}
                    >
                        Create ▼
                    </button>
                    {showCreateMenu && (
                        <div className={styles.createDropdown}>
                            <div>New event</div>
                            <div>New calendar</div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
