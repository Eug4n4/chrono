import React, { useState } from "react";
import Modal from "../common/Modal";
import CalendarService from "../../api/services/CalendarService";
import styles from "./NewCalendarModal.module.css";

const NewCalendarModal = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Calendar name is required");
            return;
        }

        setLoading(true);
        setError("");
        try {
            await CalendarService.createCalendar({
                name: name.trim(),
                description: description.trim(),
            });
            onSuccess();
            onClose();
            setName("");
            setDescription("");
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to create calendar",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Create New Calendar</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.actions}>
                    <button type="button" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default NewCalendarModal;
