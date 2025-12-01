import { useEffect, useState } from "react";
import Button from "../../common/buttons/Button";
import LabeledInput from "../../inputs/LabeledInput";
import TypeSelector from "../../selectors/TypeSelector";
import TaskForm from "../TaskForm";
import ReminderForm from "../ReminderForm";
import ArrangementForm from "../ArrangementForm";
import ColorChosen from "../ColorChosen";
import CalendarService from "../../../api/services/CalendarService";
import TagsSelectors from "../../selectors/TagsSelectors";

import styles from "../create.event.module.css";
import s from "./event.details.module.css";

function EventDetails({ purpose }) {
    const [name, setName] = useState(purpose.name);
    const [type, setType] = useState(purpose.type);
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

    const getDateTimeParts = (datetime) => {
        const date = datetime.toISOString().split("T")[0];
        const time = datetime.toLocaleTimeString();
        return { date: date, time: time };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        CalendarService.getCalendarByEventId(purpose._id)
            .then((response) => setCalendar(response.data.name))
            .catch(console.error);
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
            <TypeSelector
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <LabeledInput
                id="event_calendar"
                htmlFor="event_calendar"
                label="Calendar"
                disabled={true}
                defaultValue={calendar}
            />
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
