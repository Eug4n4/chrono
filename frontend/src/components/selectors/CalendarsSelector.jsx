import { useEffect } from "react";
import Select from "react-select";
import styles from "../event/create.event.module.css";
import { useSelector } from "react-redux";

function CalendarsSelector({ value, onChange }) {
    const { calendars, guestCalendars } = useSelector(
        (state) => state.calendars,
    );

    useEffect(() => {
        if (!value && calendars && calendars.length > 0) {
            onChange(calendars[0]._id);
        }
    }, [calendars, value, onChange]);

    const options = [
        {
            label: "My Calendars",
            options: calendars.map((c) => ({ value: c._id, label: c.name })),
        },
        {
            label: "Shared Calendars",
            options: guestCalendars.map((c) => ({
                value: c._id,
                label: c.name,
            })),
        },
    ];

    const handleChange = (option) => {
        onChange(option.value);
    };

    // Find selected option from groups
    let selectedOption = null;
    for (const group of options) {
        const found = group.options.find((opt) => opt.value === value);
        if (found) {
            selectedOption = found;
            break;
        }
    }

    return (
        <div className={styles.wrapper}>
            <p>Calendar: </p>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                classNamePrefix="react-select"
                placeholder="Select Calendar"
            />
        </div>
    );
}

export default CalendarsSelector;
