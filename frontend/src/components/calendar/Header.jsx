import React, { useState } from "react";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../features/state/authSlice";
import NewCalendarModal from "./NewCalendarModal";

const Header = ({ currentView, setCurrentView, onNext, onPrev, title, onToggleSidebar }) => {
    const dispatch = useDispatch();
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [isNewCalendarModalOpen, setIsNewCalendarModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleCalendarCreated = () => {
        // TODO: Refresh calendar list
        console.log("Calendar created successfully");
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <button 
                        className={styles.button}
                        onClick={onToggleSidebar}
                        title="Toggle sidebar"
                    >
                        ☰
                    </button>
                    <button className={styles.button}>Today</button>
                    <h2 className={styles.headerTitle}>{title}</h2>
                    <button className={styles.navButton} onClick={onPrev}>
                        &lt;
                    </button>
                    <button className={styles.navButton} onClick={onNext}>
                        &gt;
                    </button>
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
                </div>
                <div className={styles.headerRight}>
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
                                <div
                                    onClick={() => {
                                        setIsNewCalendarModalOpen(true);
                                        setShowCreateMenu(false);
                                    }}
                                >
                                    New calendar
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <NewCalendarModal
                isOpen={isNewCalendarModalOpen}
                onClose={() => setIsNewCalendarModalOpen(false)}
                onSuccess={handleCalendarCreated}
            />
        </>
    );
};

export default Header;
