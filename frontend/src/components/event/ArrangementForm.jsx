import DateInput from "../inputs/DateInput.jsx";
import styles from "./create.event.module.css";

const ArrangementForm = ({ date, setDate }) => {
    const handleStartChange = (newValue) => {
        setDate(prev => ({ ...prev, start: newValue }));
    };

    const handleEndChange = (newValue) => {
        setDate(prev => ({ ...prev, end: newValue }));
    };

    return (
        <div>
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
                <p>End date</p>
                <DateInput
                    dateValue={date.end.date}
                    timeValue={date.end.time}
                    onChange={handleEndChange}
                    id="end"
                />
            </div>
        </div>
    );
};


export default ArrangementForm;