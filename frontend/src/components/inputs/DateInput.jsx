import styles from "../event/create.event.module.css";
import Input from "./Input";

function DateInput({ onChange, dateValue, timeValue, placeholder }) {
    const handleDateChange = (e) => {
        onChange?.({ date: e.target.value, time: timeValue });
    };

    const handleTimeChange = (e) => {
        onChange?.({ date: dateValue, time: e.target.value });
    };

    const handleInputClick = (e) => {
        try {
            if (e.target.showPicker) {
                e.target.showPicker();
            }
        } catch (error) {}
    };

    return (
        <div className={styles.wrapper}>
            <Input
                type="date"
                value={dateValue}
                onChange={handleDateChange}
                placeholder={placeholder}
                onClick={handleInputClick}
            />
            <Input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
                onClick={handleInputClick}
            />
        </div>
    );
}

export default DateInput;
