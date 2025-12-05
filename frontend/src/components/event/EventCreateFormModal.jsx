import Modal from "../common/Modal.jsx";
import { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/state/event.slice.js";
import Input from "../inputs/Input.jsx";

const EventCreateFormModal =
    ({
         isOpen,
         onClose,
         defaultType = "task",
         defaultDate = null,
     }) => {
        const dispatch = useDispatch();
        const [step, setStep] = useState(1);
        const [calendarId, setCalendarId] = useState("");
        const [name, setName] = useState("");
        const [date, setDate] = useState({
            start: { date: defaultDate.start.date || "", time: defaultDate.start.time || "" },
            end: { date: "", time: "" },
            reminder: { date: "", time: "" },
        });
        const [type, setType] = useState(defaultType);
        const [tags, setTags] = useState([]);
        const [color, setColor] = useState("");
        const [description, setDescription] = useState("");
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

        const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
        const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

        useEffect(() => {
            if (!date.start.time) return;

            const [hours, minutes] = date.start.time.split(":").map(Number);
            const newHoursEnd = hours + 1;
            const newHoursRemaining = hours - 1;

            let endTime, reminderTime;

            if (newHoursEnd < 24) {
                endTime = `${String(newHoursEnd).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
            } else {
                endTime = date.start.time;
            }
            if (newHoursRemaining > 0) {
                reminderTime = `${String(newHoursRemaining).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
            } else {
                reminderTime = date.start.time;
            }
            setDate(prev => ({
                ...prev,
                end: {
                    date: prev.start.date,
                    time: endTime,
                },
                reminder: {
                    date: prev.start.date,
                    time: reminderTime,
                },
            }));
        }, [date.start.time, date.start.date]);


        const handleCreate = async () => {
            setLoading(true);
            try {
                if (!calendarId) return showWarningToast("Calendar not chosen!");
                if (!name.trim()) return showWarningToast("Input name!");
                if (!color) return showWarningToast("Input color!");
                if (!date.start.date || !date.start.time) return showWarningToast("Input start date!");

                const startDate = new Date(`${date.start.date}T${date.start.time}`);
                let eventData = { name, type, color, tags, start: startDate };

                if (type === "task") {
                    if (!description) return showWarningToast("Input description!");
                    if (!date.end.date || !date.end.time) return showWarningToast("Input end date!");
                    const endDate = new Date(`${date.end.date}T${date.end.time}`);
                    if (startDate >= endDate) return showWarningToast("Start date cannot be later than end date!");
                    eventData.end = endDate;
                    eventData.description = description;
                } else if (type === "reminder") {
                    const reminderDate = new Date(`${date.reminder.date}T${date.reminder.time}`);
                    if (startDate <= reminderDate) return showWarningToast("Reminder cannot be later than start date!");
                    eventData.remindAfter = reminderDate;
                } else {
                    if (!date.end.date || !date.end.time) return showWarningToast("Input end date!");
                    const endDate = new Date(`${date.end.date}T${date.end.time}`);
                    if (startDate >= endDate) return showWarningToast("Start date cannot be later than end date!");
                    eventData.end = endDate;
                }
                await dispatch(createEvent({ calendarId, eventData })).unwrap();
                showSuccessToast("Event created successfully");
                onClose();
                navigate("/calendar");
            } catch (error) {
                showErrorToast(error || "Failed to save event");
            } finally {
                setLoading(false);
            }
        };

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <h2>Create Event</h2>

                {step === 1 && (
                    <div className={styles.step}>
                        <CalendarsSelector value={calendarId} onChange={setCalendarId} />
                        <div className={styles.wrapper}>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <TypeSelector value={type} onChange={setType} />
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.step}>
                        {type === "task" && <TaskForm date={date} setDate={setDate} setDescription={setDescription} />}
                        {type === "arrangement" && <ArrangementForm date={date} setDate={setDate} />}
                        {type === "reminder" && <ReminderForm date={date} setDate={setDate} />}
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.step}>
                        <div className={styles.wrapper}>
                            <p>Tags:</p>
                            <TagsSelectors onChange={setTags} />
                        </div>
                        <div className={styles.wrapper}>
                            <p>Color:</p>
                            <ColorChosen setColor={setColor} />
                        </div>
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    {step > 1 && <button className={styles.send_create} onClick={prevStep}>Back</button>}
                    {step < 3 && <button className={styles.send_create} onClick={nextStep}>Next</button>}
                    {step === 3 && (
                        <button className={styles.send_create} onClick={handleCreate} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    )}
                </div>
            </Modal>
        );
    };

export default EventCreateFormModal;