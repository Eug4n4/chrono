import Input from "../inputs/Input.jsx";
import React, { useState } from "react";
import TypeSelector from "../selectors/TypeSelector.jsx";
import TagsSelectors from "../selectors/TagsSelectors.jsx";
import TaskForm from "./TaskForm.jsx";
import ArrangementForm from "./ArrangementForm.jsx";
import ReminderForm from "./ReminderForm.jsx";
import ColorChosen from "./ColorChosen.jsx";
import styles from "./create.event.module.css";
import {
    showErrorToast,
    showSuccessToast,
    showWarningToast,
} from "../../utils/toast.jsx";
import CalendarsSelector from "../selectors/CalendarsSelector.jsx";
import { useNavigate } from "react-router-dom";
import EventService from "../../api/services/EventService";

const EventCreateForm = () => {
    const [calendarId, setCalendarId] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState({
        start: { date: "", time: "" },
        end: { date: "", time: "" },
        reminder: { date: "", time: "" },
    });
    const [type, setType] = useState("task");
    const [tags, setTags] = useState([]);
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!calendarId) {
            showWarningToast("Calendar not chosen!");
            setLoading(false);
            return;
        }
        if (!name.trim()) {
            showWarningToast("Input name!");
            setLoading(false);
            return;
        }
        if (!color) {
            showWarningToast("Input color!");
            setLoading(false);
            return;
        }
        if (!date.start.date || !date.start.time) {
            showWarningToast("Input start date!");
            setLoading(false);
            return;
        }
        try {
            const startDate = new Date(`${date.start.date}T${date.start.time}`);
            let eventData = { name, type, color, tags };
            eventData.start = startDate;
            if (type === "task") {
                if (!description) {
                    showWarningToast("Input description!");
                    setLoading(false);
                    return;
                }
                if (!date.end.date || !date.end.time) {
                    showWarningToast("Input end date!");
                    setLoading(false);
                    return;
                }
                eventData.description = description;
                const endDate = new Date(`${date.end.date}T${date.end.time}`);
                if (startDate >= endDate) {
                    showWarningToast(
                        "The start date cannot be later than the end date!",
                    );
                    return;
                }
                eventData.end = endDate;
            } else if (type === "reminder") {
                if (!date.start.date || !date.start.time) {
                    showWarningToast("Input reminder date!");
                    setLoading(false);
                    return;
                }
                const reminderDate = new Date(
                    `${date.reminder.date}T${date.reminder.time}`,
                );
                if (startDate <= reminderDate) {
                    showWarningToast(
                        "The remainder date cannot be later than the start date!",
                    );
                    return;
                }
                eventData.remindAfter = reminderDate;
            } else {
                if (!date.end.date || !date.end.time) {
                    showWarningToast("Input end date!");
                    setLoading(false);
                    return;
                }
                const endDate = new Date(`${date.end.date}T${date.end.time}`);
                if (startDate >= endDate) {
                    showWarningToast(
                        "The start date cannot be later than the end date!",
                    );
                    return;
                }
                eventData.end = endDate;
            }
            await EventService.createEvent(calendarId, eventData);
            showSuccessToast("Event created successfully");
            navigate("/calendar");
        } catch (error) {
            showErrorToast(error || "Failed to save event");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className={styles.create_container}>
                <h2>Create event</h2>
                <div className={styles.form_grid}>
                    <div className={styles.column}>
                        <CalendarsSelector
                            value={calendarId}
                            onChange={setCalendarId}
                        />
                        <div className={styles.wrapper}>
                            <Input
                                placeholder=""
                                name="name"
                                id="name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <TypeSelector value={type} onChange={setType} />
                        <div className={styles.wrapper}>
                            <p>Tags:</p>
                            <TagsSelectors onChange={setTags} />
                        </div>
                        <div className={styles.wrapper}>
                            <p>Color:</p>
                            <ColorChosen setColor={setColor} />
                        </div>
                    </div>
                    <div className={styles.column}>
                        {type === "task" && (
                            <TaskForm
                                date={date}
                                setDate={setDate}
                                setDescription={setDescription}
                            />
                        )}
                        {type === "arrangement" && (
                            <ArrangementForm date={date} setDate={setDate} />
                        )}
                        {type === "reminder" && (
                            <ReminderForm date={date} setDate={setDate} />
                        )}
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <button
                        className={styles.send_create}
                        onClick={handleCreate}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCreateForm;
