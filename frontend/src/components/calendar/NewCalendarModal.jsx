import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../common/Modal";
import LabeledInput from "../inputs/LabeledInput";
import LabeledTextarea from "../common/textarea/LabeledTextarea";
import Button from "../common/buttons/Button";
import buttonStyles from "../common/buttons/button.module.css";
import { createCalendar } from "../../features/state/calendar.slice";
import styles from "./NewCalendarModal.module.css";
import {
    showSuccessToast,
    showErrorToast,
    extractErrorMessage,
} from "../../utils/toast.jsx";

const NewCalendarModal = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Calendar name is required");
            return;
        }

        setLoading(true);
        setError("");
        try {
            await dispatch(
                createCalendar({
                    name: name.trim(),
                    description: description.trim(),
                }),
            ).unwrap();

            showSuccessToast("Calendar created successfully!");
            onSuccess();
            onClose();
            setName("");
            setDescription("");
        } catch (err) {
            const errorMessage =
                typeof err === "string" ? err : extractErrorMessage(err);
            showErrorToast(errorMessage);
            setError(errorMessage);
            console.error("Calendar creation failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className={styles.title}>Create New Calendar</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <LabeledInput
                    label="Name *"
                    htmlFor="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder=" "
                />
                <LabeledTextarea
                    label="Description"
                    htmlFor="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder=" "
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className={buttonStyles.cancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className={buttonStyles.accept}
                    >
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewCalendarModal;
