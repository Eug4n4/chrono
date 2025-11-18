import DateInput from "../inputs/DateInput.jsx";

const ReminderForm = ({ date, setDate }) => {
    const handleStartChange = (newValue) => {
        setDate(prev => ({ ...prev, start: newValue }));
    };

    const handleEndChange = (newValue) => {
        setDate(prev => ({ ...prev, reminder: newValue }));
    };

    return (
        <div>
            <div>
                <DateInput
                    dateValue={date.start.date}
                    timeValue={date.start.time}
                    onChange={handleStartChange}
                    id="start"
                />
                <label htmlFor="start">Start date</label>
            </div>

            <div>
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