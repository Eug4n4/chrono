import React, { useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/state/auth.slice";
import { fetchCalendars } from "../../features/state/calendar.slice";
import NewCalendarModal from "./NewCalendarModal";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "./FilterDropdown";
import Logo from "../common/Logo.jsx";
import UserIcon from "../common/UserIcon.jsx";
import AuthService from "../../api/services/AuthService.js";
import { Plus, Calendar } from "lucide-react";

const Header = ({
    currentView,
    setCurrentView,
    onNext,
    onPrev,
    onToday,
    title,
    onToggleSidebar,
    isSidebarOpen,
    filterTypes,
    setFilterTypes,
    filterTags,
    setFilterTags,
}) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [isNewCalendarModalOpen, setIsNewCalendarModalOpen] = useState(false);

    const handleLogout = () => {
        AuthService.logout();
        dispatch(logout());
    };

    const handleCalendarCreated = () => {
        dispatch(fetchCalendars());
    };
    const handleClick = () => {
        navigate("/create-event");
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.logoContainer}>
                        <Logo />
                    </div>
                    <button
                        className={`${styles.button} ${isSidebarOpen ? styles.active : ""}`}
                        onClick={onToggleSidebar}
                        title="Toggle sidebar"
                    >
                        ☰
                    </button>
                    <button
                        className={styles.button}
                        onClick={onToday}
                        title="Today"
                    >
                        <Calendar size={18} />
                        <span className={styles.buttonText}>Today</span>
                    </button>
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
                    <FilterDropdown
                        selectedTypes={filterTypes}
                        setSelectedTypes={setFilterTypes}
                        selectedTags={filterTags}
                        setSelectedTags={setFilterTags}
                    />
                    <div className={styles.createMenu}>
                        <button
                            className={`${styles.button} ${showCreateMenu ? styles.active : ""}`}
                            onClick={() => setShowCreateMenu(!showCreateMenu)}
                        >
                            <Plus size={18} />
                            <span className={styles.buttonText}>Create</span>
                            <span className={styles.arrow}>▼</span>
                        </button>
                        {showCreateMenu && (
                            <div className={styles.createDropdown}>
                                <div
                                    onClick={handleClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    New event
                                </div>
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
                    {user && (
                        <UserIcon user={user} handleLogout={handleLogout} />
                    )}
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
