import Textarea from "../common/textarea/Textarea.jsx";
import DateInput from "../inputs/DateInput.jsx";
import styles from "./create.event.module.css";

const TaskForm = ({ date, setDate, setDescription, defaultDescription }) => {
    const handleStartChange = (newValue) => {
        const [hours, minutes] = newValue.time.split(":").map(Number);
        const newHours = hours + 1;
        let endTime;
        if (newHours < 24) {
            endTime = `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        } else {
            endTime = newValue.time;
        }
        setDate(prev => ({
            ...prev,
            start: newValue,
            end: {
                date: newValue.date,
                time: endTime
            }
        }));
    };

    const handleEndChange = (newValue) => {
        setDate(prev => ({ ...prev, end: newValue }));
    };
    return (
        <div>
            <div className={styles.wrapper}>
                <Textarea
                    placeholder=""
                    name="description"
                    id="description"
                    defaultValue={defaultDescription}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <label htmlFor="description">Description</label>
            </div>
            <div className={styles.wrapper}>
                <p>Start date:</p>
                <DateInput
                    dateValue={date.start.date}
                    timeValue={date.start.time}
                    onChange={handleStartChange}
                    id="start"
                />
            </div>

            <div className={styles.wrapper}>
                <p>End date:</p>
                <DateInput
                    dateValue={date.end.date}
                    timeValue={date.end.time}
                    onChange={handleEndChange}
                    className={styles.wrapper}
                    id="end"
                />
            </div>
        </div>
    );
};

export default TaskForm;