import Input from "../inputs/Input.jsx";
import { useState } from "react";
import TypeSelector from "../selectors/TypeSelector.jsx";
import TagsSelectors from "../selectors/TagsSelectors.jsx";
import TaskForm from "./TaskForm.jsx";
import ArrangementForm from "./ArrangementForm.jsx";
import ReminderForm from "./ReminderForm.jsx";
import ColorChosen from "./ColorChosen.jsx";
import styles from "./create.event.module.css";

const EventCreateForm = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState({
        start: { date: "", time: "" },
        end: { date: "", time: "" },
        reminder: { date: "", time: "" },
    });
    const [type, setType] = useState("task");
    const [tags, setTags] = useState([]);
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const handleCreate = () => {
        console.log("handleCreate");
        console.log("Name", name);
        console.log("start date: ", date.start);
        console.log("end date: ", date.end);
        console.log("type: ", type);
        console.log("tags: ", tags);
        console.log("description: ", description);
        console.log("color: ", color);
    };
    return (
        <div>
            <div className={styles.create_container}>
                <div className={styles.wrapper}>
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
                    <ReminderForm date={date} setDate={setDate} />
                )}
                <div className={styles.wrapper}>
                    Tags:
                    <TagsSelectors
                        onChange={setTags}
                    />
                </div>
                <div className={styles.wrapper}>
                    Color:
                    <ColorChosen setColor={setColor} />
                </div>

                <div className={styles.wrapper}>
                    <button className={styles.send_create} onClick={handleCreate}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default EventCreateForm;