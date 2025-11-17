function TypeSelector({ value, onChange }) {
    return (
        <div>
            <select value={value} onChange={onChange}>
                <option value="meeting">meeting</option>
                <option value="task">task</option>
                <option value="reminder">reminder</option>
            </select>
        </div>
    );
}

export default TypeSelector;