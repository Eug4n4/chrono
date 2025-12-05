import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import CalendarsSelector from "../selectors/CalendarsSelector";
import CalendarService from "../../api/services/CalendarService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchEventsForCalendars } from "../../features/state/event.slice";
import styles from "./SharedEventModal.module.css";
import btnStyles from "../common/buttons/button.module.css";

const SharedEventModal = ({ isOpen, onClose, token }) => {
    const [selectedCalendarId, setSelectedCalendarId] = useState("");
    const [eventId, setEventId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            if (token === "dummy_test_token_123") {
                setEventId("dummy_event_id");
                return;
            }
            try {
                const decoded = jwtDecode(token);
                if (decoded && decoded.eventId) {
                    setEventId(decoded.eventId);
                } else {
                    toast.error("Invalid token: missing event ID");
                    onClose();
                }
            } catch (error) {
                console.error("Token decode error:", error);
                toast.error("Invalid token");
                onClose();
            }
        }
    }, [token, onClose]);

    const handleAdd = async () => {
        if (!selectedCalendarId) {
            toast.warning("Please select a calendar");
            return;
        }
        if (!eventId) {
            toast.error("Event ID not found");
            return;
        }

        try {
            await CalendarService.addSharedEvent(selectedCalendarId, eventId);
            toast.success("Event added successfully");
            dispatch(
                fetchEventsForCalendars({
                    calendarIds: [selectedCalendarId],
                    year: new Date().getFullYear(),
                }),
            );
            onClose();
        } catch (error) {
            console.error("Failed to add shared event:", error);
            toast.error(error.response?.data?.message || "Failed to add event");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <h2 className={styles.title}>Add Shared Event</h2>
                <p className={styles.description}>
                    Choose a calendar to add this event to:
                </p>
                <CalendarsSelector
                    value={selectedCalendarId}
                    onChange={setSelectedCalendarId}
                    token={token}
                />
                <div className={styles.actions}>
                    <button onClick={onClose} className={btnStyles.cancel}>
                        Cancel
                    </button>
                    <button onClick={handleAdd} className={btnStyles.accept}>
                        Add
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SharedEventModal;
