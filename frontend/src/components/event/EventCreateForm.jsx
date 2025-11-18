import Input from "../inputs/Input.jsx";
import { useState } from "react";
import TypeSelector from "../selectors/TypeSelector.jsx";
import TagsSelectors from "../selectors/TagsSelectors.jsx";
import TaskForm from "./TaskForm.jsx";
import ArrangementForm from "./ArrangementForm.jsx";
import ReminderForm from "./ReminderForm.jsx";

const EventCreateForm = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState({
        start: { date: "", time: "" },
        end: { date: "", time: "" },
        reminder: { date: "", time: "" },
    });
    const [type, setType] = useState("meeting");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const handleCreate = () => {
        console.log("handleCreate");
        console.log("Name", name);
        console.log("start date: ", date.start);
        console.log("end date: ", date.end);
        console.log("type: ", type);
        console.log("tags: ", tags);
        console.log("description: ", description);
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
            {type === "task" && (
                <TaskForm date={date} setDate={setDate} />)}
            {type === "arrangement" && (
                <ArrangementForm date={date} setDate={setDate} setDescription={setDescription} />
            )}
            {type === "reminder" && (
                <ReminderForm date={date} setDate={setDate}/>
            )}
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