import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen = true }) => {
    const [isOwnOpen, setIsOwnOpen] = useState(true);
    const [isDefaultOpen, setIsDefaultOpen] = useState(true);

    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        >
            <div
                className={styles.collapsibleHeader}
                onClick={() => setIsOwnOpen(!isOwnOpen)}
            >
                <span>Own</span>
                <span
                    className={`${styles.arrow} ${isOwnOpen ? styles.arrowDown : ""}`}
                >
                    ▼
                </span>
            </div>

            {isOwnOpen && (
                <div className={styles.collapsibleContent}>
                    <div className={styles.calendarItem}>
                        <input type="checkbox" id="own" defaultChecked />
                        <label htmlFor="own">My Calendar</label>
                    </div>
                </div>
            )}

            <div style={{ height: "16px" }} />

            <div
                className={styles.collapsibleHeader}
                onClick={() => setIsDefaultOpen(!isDefaultOpen)}
            >
                <span>Default</span>
                <span
                    className={`${styles.arrow} ${isDefaultOpen ? styles.arrowDown : ""}`}
                >
                    ▼
                </span>
            </div>

            {isDefaultOpen && (
                <div className={styles.collapsibleContent}>
                    <div className={styles.calendarItem}>
                        <input type="checkbox" id="holidays" defaultChecked />
                        <label htmlFor="holidays">Holidays</label>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
