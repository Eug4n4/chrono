import DateInput from "../inputs/DateInput.jsx";
import styles from "./create.event.module.css";

const TaskForm = ({ date, setDate, setDescription }) => {
    const handleStartChange = (newValue) => {
        setDate(prev => ({ ...prev, start: newValue }));
    };

    const handleEndChange = (newValue) => {
        setDate(prev => ({ ...prev, end: newValue }));
    };
    return (
        <div>
            <div className={styles.wrapper}>
                <textarea
                    placeholder=""
                    name="description"
                    id="description"
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