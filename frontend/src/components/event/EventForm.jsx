import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../common/Modal";
import { createEvent, updateEvent } from "../../features/state/event.slice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const EventForm = ({ isOpen, onClose, calendarId, eventToEdit = null }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(eventToEdit?.name || "");
    const [start, setStart] = useState(eventToEdit?.start || "");
    const [end, setEnd] = useState(eventToEdit?.end || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const eventData = { name, start, end };
            if (eventToEdit) {
                await dispatch(
                    updateEvent({
                        calendarId,
                        eventId: eventToEdit._id,
                        eventData,
                    }),
                ).unwrap();
                showSuccessToast("Event updated successfully");
            } else {
                await dispatch(createEvent({ calendarId, eventData })).unwrap();
                showSuccessToast("Event created successfully");
            }
            onClose();
        } catch (error) {
            showErrorToast(error || "Failed to save event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>{eventToEdit ? "Edit Event" : "Create Event"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Start</label>
                    <input
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End</label>
                    <input
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </Modal>
    );
};

export default EventForm;
