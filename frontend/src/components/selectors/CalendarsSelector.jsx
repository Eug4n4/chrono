import Selector from "../common/selectors/Selector";
import styles from "../event/create.event.module.css";
import { useSelector } from "react-redux";

function CalendarsSelector({ value, onChange }) {
    const { calendars, guestCalendars } =
        useSelector((state) => state.calendars);
    onChange(calendars[0]._id);
    return (
        <div className={styles.wrapper}>
            <p>Calendar: </p>
            <Selector value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="" disabled>My Calendars</option>
                {calendars.map((calendar) => (
                    <option key={calendar._id} value={calendar._id}>
                        {calendar.name}
                    </option>
                ))}
                <option value="" disabled>Shared Calendars</option>
                {guestCalendars.map((calendar) => (
                    <option key={calendar._id} value={calendar._id}>
                        {calendar.name}
                    </option>
                ))}
            </Selector>
        </div>
    );
}

export default CalendarsSelector;