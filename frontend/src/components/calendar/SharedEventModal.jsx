import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import CalendarsSelector from "../selectors/CalendarsSelector";
import CalendarService from "../../api/services/CalendarService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchEventsForCalendars } from "../../features/state/event.slice";

const SharedEventModal = ({ isOpen, onClose, token }) => {
    const [selectedCalendarId, setSelectedCalendarId] = useState("");
    const [eventId, setEventId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
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
            <div style={{ padding: "20px", minWidth: "300px" }}>
                <h3 style={{ marginBottom: "15px", color: "var(--text-main)" }}>
                    Add Shared Event
                </h3>
                <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>
                    Choose a calendar to add this event to:
                </p>
                <CalendarsSelector
                    value={selectedCalendarId}
                    onChange={setSelectedCalendarId}
                    token={token}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "transparent",
                            border: "1px solid var(--text-muted)",
                            color: "var(--text-main)",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "var(--btn-bg-color)",
                            border: "none",
                            color: "var(--bg-color)",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SharedEventModal;
