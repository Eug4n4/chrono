import Input from "../inputs/Input.jsx";
import DateInput from "../inputs/DateInput.jsx";
import { useState } from "react";
import TypeSelector from "../selectors/TypeSelector.jsx";
import TagsSelectors from "../selector/TagsSelectors.jsx";

const EventCreateForm = () => {
    const [startDate, setStartDate] = useState({ date: "", time: "" });
    const [endDate, setEndDate] = useState({ date: "", time: "" });
    const [type, setType] = useState("meeting");
    const [tags, setTags] = useState([]);
    return (
        <div>
            <div>
                <Input
                    placeholder=""
                    name="name"
                    id="name"
                    required
                />
                <label htmlFor="name">Name</label>
            </div>
            <TypeSelector
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
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
                <label htmlFor="end">End date</label>
            </div>
            <div>
                Tag:
                <TagsSelectors
                    onChange={setTags}
                />
            </div>
        </div>
    );
};

export default EventCreateForm;