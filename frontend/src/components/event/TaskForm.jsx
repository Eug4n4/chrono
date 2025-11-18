import Input from "../inputs/Input.jsx";
import DateInput from "../inputs/DateInput.jsx";

const TaskForm = ({ date, setDate, setDescription }) => {
    const handleStartChange = (newValue) => {
        setDate(prev => ({ ...prev, start: newValue }));
    };

    const handleEndChange = (newValue) => {
        setDate(prev => ({ ...prev, end: newValue }));
    };
    return (
        <div>
            <div>
                <Input
                    placeholder=""
                    name="description"
                    id="description"
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <label htmlFor="description">Description</label>
            </div>
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
                    dateValue={date.end.date}
                    timeValue={date.end.time}
                    onChange={handleEndChange}
                    id="end"
                />
                <label htmlFor="end">End date</label>
            </div>
        </div>
    );
};

export default TaskForm;