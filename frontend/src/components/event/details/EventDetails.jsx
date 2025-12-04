import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/buttons/Button";
import LabeledInput from "../../inputs/LabeledInput";
import TypeSelector from "../../selectors/TypeSelector";
import TaskForm from "../TaskForm";
import ReminderForm from "../ReminderForm";
import ArrangementForm from "../ArrangementForm";
import ColorChosen from "../ColorChosen";
import TagsSelectors from "../../selectors/TagsSelectors";
import { updateEvent } from "../../../features/state/event.slice";
import { showSuccessToast } from "../../../utils/toast";
import { Check, X } from "lucide-react";

import styles from "../create.event.module.css";
import s from "./event.details.module.css";

function EventDetails({ purpose }) {
    const dispatch = useDispatch();
    const { calendars, guestCalendars } = useSelector(
        (state) => state.calendars,
    );
    const [name, setName] = useState(purpose.name);
    const [isCompleted, setIsCompleted] = useState(purpose.isCompleted);
    const type = purpose.type;
    const [tags, setTags] = useState(() => {
        return purpose.tags.map((tag) => {
            return { label: tag.name, value: tag._id };
        });
    });
    const [color, setColor] = useState(purpose.color);
    const [date, setDate] = useState({
        start: { date: "", time: "" },
        end: { date: "", time: "" },
        reminder: { date: "", time: "" },
    });
    const [description, setDescription] = useState(purpose.description);
    const [calendar, setCalendar] = useState("");
    const [calendarId, setCalendarId] = useState(purpose.calendarId);

    useEffect(() => {
        if (calendarId) {
            const found =
                calendars.find((c) => c._id === calendarId) ||
                guestCalendars.find((c) => c._id === calendarId);
            if (found) {
                setCalendar(found.name);
            }
        }
    }, [calendarId, calendars, guestCalendars]);

    const getDateTimeParts = (datetime) => {
        const date = datetime.toISOString().split("T")[0];
        const time = datetime.toTimeString().split(" ")[0];
        return { date: date, time: time };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, type, tags, color, description, isCompleted };
        formData.start = new Date(`${date.start.date}T${date.start.time}`);
        if (date.end.date) {
            formData.end = new Date(`${date.end.date}T${date.end.time}`);
        } else if (date.reminder.date) {
            formData.remindAfter = new Date(
                `${date.reminder.date}T${date.reminder.time}`,
            );
        }

        try {
            await dispatch(
                updateEvent({
                    calendarId: calendarId,
                    eventId: purpose._id,
                    eventData: formData,
                }),
            ).unwrap();
            showSuccessToast("Updated successfully!");
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    };
    useEffect(() => {
        if (Object.hasOwn(purpose, "start")) {
            setDate((prev) => {
                return {
                    ...prev,
                    start: getDateTimeParts(new Date(purpose.start)),
                };
            });
        }
        if (Object.hasOwn(purpose, "end")) {
            setDate((prev) => {
                return {
                    ...prev,
                    end: getDateTimeParts(new Date(purpose.end)),
                };
            });
        }
        if (Object.hasOwn(purpose, "remindAfter")) {
            setDate((prev) => {
                return {
                    ...prev,
                    reminder: getDateTimeParts(new Date(purpose.remindAfter)),
                };
            });
        }
    }, [purpose]);
    return (
        <form onSubmit={handleSubmit} className={s.event_details}>
            <h3>Details</h3>
            <LabeledInput
                id="event_name"
                htmlFor="event_name"
                label="Name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className={s.event_info}>
                <p>Type:</p>
                <p>{purpose.type}</p>
                <p>Calendar:</p>
                <p>{calendar}</p>
                {type === "task" && (
                    <Button
                        type="button"
                        onClick={() => setIsCompleted(!isCompleted)}
                    >
                        {isCompleted ? <X /> : <Check />}
                        {isCompleted ? "Undone" : "Mark as done"}
                    </Button>
                )}
            </div>
            {type === "task" && (
                <div className={s.date_selector_wrapper}>
                    <TaskForm
                        date={date}
                        setDate={setDate}
                        setDescription={setDescription}
                        defaultDescription={description}
                    />
                </div>
            )}
            {type === "arrangement" && (
                <div className={s.date_selector_wrapper}>
                    <ArrangementForm date={date} setDate={setDate} />
                </div>
            )}
            {type === "reminder" && (
                <div className={s.date_selector_wrapper}>
                    <ReminderForm date={date} setDate={setDate} />
                </div>
            )}
            <div className={styles.wrapper}>
                <p>Tags:</p>
                <TagsSelectors onChange={setTags} defaultTags={tags} />
            </div>
            <div className={styles.wrapper}>
                <p>Color:</p>
                <ColorChosen setColor={setColor} defaultColor={color} />
            </div>

            <Button type="submit">Update</Button>
        </form>
    );
}

export default EventDetails;
