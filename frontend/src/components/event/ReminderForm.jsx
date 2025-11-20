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
                <p>Start date</p>
                <DateInput
                    dateValue={date.start.date}
                    timeValue={date.start.time}
                    onChange={handleStartChange}
                    id="start"
                />
            </div>

            <div className={styles.wrapper}>
                <p>Reminder date</p>
                <DateInput
                    dateValue={date.reminder.date}
                    timeValue={date.reminder.time}
                    onChange={handleEndChange}
                    id="reminder"
                />
            </div>
        </div>
    );
};

export default ReminderForm;