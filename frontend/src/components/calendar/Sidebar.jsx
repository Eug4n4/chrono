import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleCalendar } from "../../features/state/calendar.slice";

const Sidebar = ({ isOpen = true }) => {
    const [isOwnOpen, setIsOwnOpen] = useState(true);
    const [isGuestOpen, setIsGuestOpen] = useState(true);
    const dispatch = useDispatch();
    const { calendars, guestCalendars, activeCalendars } = useSelector(
        (state) => state.calendars,
    );

    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        >
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
                    {calendars.map((calendar) => (
                        <div className={styles.calendarItem} key={calendar._id}>
                            <input
                                type="checkbox"
                                id={`cal-${calendar._id}`}
                                checked={activeCalendars.includes(calendar._id)}
                                onChange={() =>
                                    dispatch(toggleCalendar(calendar._id))
                                }
                            />
                            <label htmlFor={`cal-${calendar._id}`}>
                                {calendar.name}
                            </label>
                        </div>
                    ))}
                    {calendars.length === 0 && (
                        <div className={styles.emptyState}>
                            No calendars found
                        </div>
                    )}
                </div>
            )}

            <div style={{ height: "16px" }} />

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
                        <div className={styles.calendarItem} key={calendar._id}>
                            <input
                                type="checkbox"
                                id={`cal-${calendar._id}`}
                                checked={activeCalendars.includes(calendar._id)}
                                onChange={() =>
                                    dispatch(toggleCalendar(calendar._id))
                                }
                            />
                            <label htmlFor={`cal-${calendar._id}`}>
                                {calendar.name}
                            </label>
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
    );
};

export default Sidebar;
