import DateInput from "../inputs/DateInput.jsx";
import styles from "./create.event.module.css";

const ReminderForm = ({ date, setDate }) => {
    const handleStartChange = (newValue) => {
        setDate(prev => ({ ...prev, start: newValue }));
    };

    const handleEndChange = (newValue) => {
        setDate(prev => ({ ...prev, reminder: newValue }));
    };

    return (
        <div>
            <div className={styles.wrapper}>
                <DateInput
                    dateValue={date.start.date}
                    timeValue={date.start.time}
                    onChange={handleStartChange}
                    id="start"
                />
                <label htmlFor="start">Start date</label>
            </div>

            <div className={styles.wrapper}>
                <DateInput
                    dateValue={date.reminder.date}
                    timeValue={date.reminder.time}
                    onChange={handleEndChange}
                    id="reminder"
                />
                <label htmlFor="reminder">Reminder date</label>
            </div>
        </div>
    );
};

export default ReminderForm;