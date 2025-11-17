import Input from "../inputs/Input.jsx";
import DateInput from "../inputs/DateInput.jsx";
import { useState } from "react";
import TypeSelector from "../selectors/TypeSelector.jsx";
import TagsSelectors from "../selector/TagsSelectors.jsx";

const EventCreateForm = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState({ date: "", time: "" });
    const [endDate, setEndDate] = useState({ date: "", time: "" });
    const [type, setType] = useState("meeting");
    const [tags, setTags] = useState([]);
    const handleCreate = () => {
        console.log("handleCreate");
        console.log("Name", name);
        console.log("start date: ", startDate);
        console.log("end date: ", endDate);
        console.log("type: ", type);
        console.log("tags: ", tags);
    };
    return (
        <div>
            <div>
                <Input
                    placeholder=""
                    name="name"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
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
                Tags:
                <TagsSelectors
                    onChange={setTags}
                />
            </div>
            <div>
                <button onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default EventCreateForm;