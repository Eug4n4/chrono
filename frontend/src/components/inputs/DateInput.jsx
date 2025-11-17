function DateInput({ onChange, dateValue, timeValue, className, placeholder }) {
    const handleDateChange = (e) => {
        onChange?.({ date: e.target.value, time: timeValue });
    };

    const handleTimeChange = (e) => {
        onChange?.({ date: dateValue, time: e.target.value });
    };

    return (
        <div className={className}>
            <input
                type="date"
                value={dateValue}
                onChange={handleDateChange}
                autoComplete="off"
                placeholder={placeholder}
            />
            <input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
                autoComplete="off"
            />
        </div>
    );
}

export default DateInput;
