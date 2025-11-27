import Selector from "../common/selectors/Selector";
import styles from "../event/create.event.module.css";
import { useSelector } from "react-redux";

function CalendarsSelector({ value, onChange }) {
    const { calendars } = useSelector((state) => state.calendars);
    return (
        <div className={styles.wrapper}>
            <p>Calendar: </p>
            <Selector value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="" disabled>Select a calendar</option>
                {calendars.map((calendar) => (
                    <option key={calendar._id} value={calendar._id}>
                        {calendar.name}
                    </option>
                ))}
            </Selector>
        </div>
    );
}

export default CalendarsSelector;