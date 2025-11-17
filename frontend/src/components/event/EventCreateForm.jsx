import Input from "../inputs/Input.jsx";
import DateInput from "../inputs/DateInput.jsx";
import { useState } from "react";
import TypeSelector from "../selectors/TypeSelector.jsx";

const EventCreateForm = () => {
    const [startDate, setStartDate] = useState({ date: "", time: "" });
    const [endDate, setEndDate] = useState({ date: "", time: "" });
    return (
        <div>
            <div>
                <Input
                    placeholder=""
                    name="name"
                    id="name"
                    required
                />
                <label htmlFor="name">Password</label>
            </div>
            <div>
                <TypeSelector />
            </div>
            <div>
                <DateInput
                    dateValue={startDate.date}
                    timeValue={startDate.time}
                    onChange={setStartDate}
                    id="start"
                />
                <label htmlFor="start">Start date</label>
            </div>
            <div>
                <DateInput
                    dateValue={endDate.date}
                    timeValue={endDate.time}
                    onChange={setEndDate}
                    id="end"
                />
                <label htmlFor="end">Start date</label>
            </div>
            <div>
                Tags:
            </div>
        </div>
    );
};

export default EventCreateForm;