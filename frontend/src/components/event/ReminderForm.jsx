import DateInput from "../inputs/DateInput.jsx";
import styles from "./create.event.module.css";

const ReminderForm = ({ date, setDate }) => {
    const handleStartChange = (newValue) => {
        const [hours, minutes] = newValue.time.split(":").map(Number);
        const newHours = hours - 1;
        let endTime;
        if (newHours > 0) {
            endTime = `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        } else {
            endTime = newValue.time;
        }
        setDate(prev => ({
            ...prev,
            start: newValue,
            reminder: {
                date: newValue.date,
                time: endTime
            }
        }));
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