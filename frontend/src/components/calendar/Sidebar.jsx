import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "lucide-react";
import {
    toggleCalendar,
    toggleHolidays,
} from "../../features/state/calendar.slice";
import DetailsModal from "../common/details/DetailsModal";
import { calendarDetailsAvailableViews } from "../common/details/available.views";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import AuthService from "../../api/services/AuthService";
import { logout } from "../../features/state/auth.slice";
import Logo from "../common/Logo.jsx";

const Sidebar = ({
    isOpen = true,
    currentView,
    setCurrentView,
    onClose,
    onToday,
    setIsNewCalendarModalOpen,
    filterTypes = [],
    setFilterTypes,
    filterTags = [],
    setFilterTags,
}) => {
    const [isViewOpen, setIsViewOpen] = useState(true);
    const [isActionsOpen, setIsActionsOpen] = useState(true);
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(true);
    const [isOwnOpen, setIsOwnOpen] = useState(true);
    const [isGuestOpen, setIsGuestOpen] = useState(true);
    const [isDefaultOpen, setIsDefaultOpen] = useState(true);
    const [selectedCalendarId, setSelectedCalendarId] = useState(null);
    const [isDefaultCalendarDetailsOpen, setIsDefaultCalendarDetailsOpen] =
        useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { calendars, guestCalendars, activeCalendars, showHolidays } =
        useSelector((state) => state.calendars);
    const { user } = useSelector((state) => state.auth);
    const { tags } = useSelector((state) => state.tags);

    const eventTypes = [
        { label: "Task", value: "task" },
        { label: "Arrangement", value: "arrangement" },
        { label: "Reminder", value: "reminder" },
    ];

    const toggleType = (typeValue) => {
        if (filterTypes.includes(typeValue)) {
            setFilterTypes(filterTypes.filter((t) => t !== typeValue));
        } else {
            setFilterTypes([...filterTypes, typeValue]);
        }
    };

    const toggleTag = (tagId) => {
        if (filterTags.includes(tagId)) {
            setFilterTags(filterTags.filter((t) => t !== tagId));
        } else {
            setFilterTags([...filterTags, tagId]);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        dispatch(logout());
    };

    return (
        <>
            {isOpen && <div className={styles.backdrop} onClick={onClose} />}
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
            >
                <div className={styles.sidebarLogo}>
                    <Logo />
                </div>
                <div
                    className={`${styles.collapsibleHeader} ${styles.mobileOnly}`}
                    onClick={() => setIsActionsOpen(!isActionsOpen)}
                >
                    <span>Actions</span>
                    <span
                        className={`${styles.arrow} ${isActionsOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isActionsOpen && (
                    <div
                        className={`${styles.collapsibleContent} ${styles.mobileOnly}`}
                    >
                        <div
                            className={styles.calendarItem}
                            onClick={() => {
                                if (onToday) onToday();
                                if (window.innerWidth < 1024 && onClose)
                                    onClose();
                            }}
                        >
                            Today
                        </div>
                        <div
                            className={styles.calendarItem}
                            onClick={() => {
                                navigate("/create-event");
                                if (window.innerWidth < 1024 && onClose)
                                    onClose();
                            }}
                        >
                            New Event
                        </div>
                        <div
                            className={styles.calendarItem}
                            onClick={() => {
                                if (setIsNewCalendarModalOpen)
                                    setIsNewCalendarModalOpen(true);
                                if (window.innerWidth < 1024 && onClose)
                                    onClose();
                            }}
                        >
                            New Calendar
                        </div>
                    </div>
                )}

                <div
                    className={`${styles.collapsibleHeader} ${styles.mobileOnly}`}
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                    <span>Filters</span>
                    <span
                        className={`${styles.arrow} ${isFiltersOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isFiltersOpen && (
                    <div className={`${styles.collapsibleContent} ${styles.mobileOnly}`}>
                        <div className={styles.filterSectionTitle}>TYPE</div>
                        {eventTypes.map((type) => (
                            <div
                                key={type.value}
                                className={styles.calendarItem}
                                onClick={() => toggleType(type.value)}
                            >
                                <input
                                    type="checkbox"
                                    checked={filterTypes.includes(type.value)}
                                    readOnly
                                />
                                <label>{type.label}</label>
                            </div>
                        ))}
                        <div className={styles.filterSectionTitle} style={{marginTop: '8px'}}>TAGS</div>
                        {tags.map((tag) => (
                            <div
                                key={tag._id}
                                className={styles.calendarItem}
                                onClick={() => toggleTag(tag._id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={filterTags.includes(tag._id)}
                                    readOnly
                                />
                                <label>{tag.name}</label>
                            </div>
                        ))}
                    </div>
                )}

                <div
                    className={`${styles.collapsibleHeader} ${styles.mobileOnly}`}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <span>Profile</span>
                    <span
                        className={`${styles.arrow} ${isProfileOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isProfileOpen && user && (
                    <div className={`${styles.collapsibleContent} ${styles.mobileOnly}`}>
                        <div className={styles.calendarItem}>
                            <div className={styles.userProfile}>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
                                    alt="avatar"
                                    className={styles.userAvatar}
                                />
                                <span>{user.login}</span>
                            </div>
                        </div>
                        <div
                            className={styles.calendarItem}
                            onClick={() => {
                                navigate("/settings");
                                if (window.innerWidth < 1024 && onClose) onClose();
                            }}
                        >
                            Settings
                        </div>
                        <div
                            className={styles.calendarItem}
                            onClick={() => {
                                handleLogout();
                                if (window.innerWidth < 1024 && onClose) onClose();
                            }}
                        >
                            Logout
                        </div>
                    </div>
                )}

                <div
                    className={`${styles.collapsibleHeader} ${styles.mobileOnly}`}
                    onClick={() => setIsViewOpen(!isViewOpen)}
                >
                    <span>Views</span>
                    <span
                        className={`${styles.arrow} ${isViewOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isViewOpen && (
                    <div
                        className={`${styles.collapsibleContent} ${styles.mobileOnly}`}
                    >
                        {["Daily", "Weekly", "Monthly", "Yearly"].map(
                            (view) => (
                                <div
                                    key={view}
                                    className={`${styles.calendarItem} ${
                                        currentView === view
                                            ? styles.activeView
                                            : ""
                                    }`}
                                    onClick={() => {
                                        if (setCurrentView)
                                            setCurrentView(view);
                                        if (window.innerWidth < 1024 && onClose)
                                            onClose();
                                    }}
                                >
                                    {view}
                                </div>
                            ),
                        )}
                    </div>
                )}

                <div
                    className={styles.collapsibleHeader}
                    onClick={() => setIsOwnOpen(!isOwnOpen)}
                >
                    <span>My Calendars</span>
                    <span
                        className={`${styles.arrow} ${isOwnOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isOwnOpen && (
                    <div className={styles.collapsibleContent}>
                        {calendars.slice(1).map((calendar) => (
                            <div
                                className={styles.calendarItem}
                                key={calendar._id}
                            >
                                <input
                                    type="checkbox"
                                    id={`cal-${calendar._id}`}
                                    checked={activeCalendars.includes(
                                        calendar._id,
                                    )}
                                    onChange={() =>
                                        dispatch(toggleCalendar(calendar._id))
                                    }
                                />
                                <label htmlFor={`cal-${calendar._id}`}>
                                    {calendar.name}
                                </label>
                                <Settings
                                    size={24}
                                    className={styles.calendar_details}
                                    onClick={() =>
                                        setSelectedCalendarId(calendar._id)
                                    }
                                />
                                {selectedCalendarId === calendar._id && (
                                    <DetailsModal
                                        views={calendarDetailsAvailableViews}
                                        purpose={{ ...calendar, isOwner: true }}
                                        isOpen={true}
                                        onClose={() =>
                                            setSelectedCalendarId(null)
                                        }
                                        type="calendar"
                                    />
                                )}
                            </div>
                        ))}
                        {calendars.length <= 1 && (
                            <div className={styles.emptyState}>
                                No other calendars found
                            </div>
                        )}
                    </div>
                )}

                <div
                    className={styles.collapsibleHeader}
                    onClick={() => setIsDefaultOpen(!isDefaultOpen)}
                >
                    <span>Default Calendars</span>
                    <span
                        className={`${styles.arrow} ${isDefaultOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isDefaultOpen && (
                    <div className={styles.collapsibleContent}>
                        {calendars.length > 0 && (
                            <div
                                className={styles.calendarItem}
                                key={calendars[0]._id}
                            >
                                <label style={{ marginLeft: 0 }}>
                                    {calendars[0].name}
                                </label>
                                <Settings
                                    size={24}
                                    className={styles.calendar_details}
                                    onClick={() =>
                                        setIsDefaultCalendarDetailsOpen(true)
                                    }
                                />
                                <DetailsModal
                                    views={calendarDetailsAvailableViews}
                                    purpose={{
                                        ...calendars[0],
                                        isOwner: true,
                                        isDefault: true,
                                    }}
                                    isOpen={isDefaultCalendarDetailsOpen}
                                    onClose={() =>
                                        setIsDefaultCalendarDetailsOpen(false)
                                    }
                                    type="calendar"
                                />
                            </div>
                        )}
                        <div className={styles.calendarItem}>
                            <input
                                type="checkbox"
                                id="holiday-calendar"
                                checked={showHolidays}
                                onChange={() => dispatch(toggleHolidays())}
                            />
                            <label htmlFor="holiday-calendar">Holidays</label>
                        </div>
                    </div>
                )}

                <div
                    className={styles.collapsibleHeader}
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                >
                    <span>Shared Calendars</span>
                    <span
                        className={`${styles.arrow} ${isGuestOpen ? styles.arrowDown : ""}`}
                    >
                        ▼
                    </span>
                </div>

                {isGuestOpen && (
                    <div className={styles.collapsibleContent}>
                        {guestCalendars.map((calendar) => (
                            <div
                                className={styles.calendarItem}
                                key={calendar._id}
                            >
                                <input
                                    type="checkbox"
                                    id={`cal-${calendar._id}`}
                                    checked={activeCalendars.includes(
                                        calendar._id,
                                    )}
                                    onChange={() =>
                                        dispatch(toggleCalendar(calendar._id))
                                    }
                                />
                                <label htmlFor={`cal-${calendar._id}`}>
                                    {calendar.name}
                                </label>
                                <Settings
                                    size={24}
                                    className={styles.calendar_details}
                                    onClick={() =>
                                        setSelectedCalendarId(calendar._id)
                                    }
                                />
                                {selectedCalendarId === calendar._id && (
                                    <DetailsModal
                                        views={calendarDetailsAvailableViews}
                                        purpose={{
                                            ...calendar,
                                            isOwner: false,
                                        }}
                                        isOpen={true}
                                        onClose={() =>
                                            setSelectedCalendarId(null)
                                        }
                                        type="calendar"
                                    />
                                )}
                            </div>
                        ))}
                        {guestCalendars.length === 0 && (
                            <div className={styles.emptyState}>
                                No shared calendars
                            </div>
                        )}
                    </div>
                )}
            </aside>
        </>
    );
};

export default Sidebar;
