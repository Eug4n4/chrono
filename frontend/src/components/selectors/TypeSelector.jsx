import Select from "react-select";
import { Calendar, CheckSquare, Clock } from "lucide-react";
import styles from "../event/create.event.module.css";

const options = [
    { value: "arrangement", label: "Arrangement", icon: Calendar },
    { value: "task", label: "Task", icon: CheckSquare },
    { value: "reminder", label: "Reminder", icon: Clock },
];

const formatOptionLabel = ({ label, icon: Icon }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Icon size={16} />
        <span>{label}</span>
    </div>
);

function TypeSelector({ value, onChange }) {
    const selectedOption = options.find((opt) => opt.value === value);

    const handleChange = (option) => {
        onChange(option.value);
    };

    return (
        <div className={styles.wrapper}>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                formatOptionLabel={formatOptionLabel}
                classNamePrefix="react-select"
                isSearchable={false}
            />
        </div>
    );
}

export default TypeSelector;
