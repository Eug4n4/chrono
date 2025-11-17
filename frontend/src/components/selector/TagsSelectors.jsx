import React, { useState, useEffect } from "react";
import Select from "react-select";

const options = [
    { value: "home", label: "home" },
    { value: "work", label: "work" },
    { value: "holiday", label: "holiday" },
];

function TagsSelectors({ onChange }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const defaultValues = [];
        setSelectedOptions(defaultValues);
        onChange && onChange(defaultValues);
    }, [onChange]);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
        onChange && onChange(selected);
    };

    return (
        <Select
            options={options}
            isMulti
            value={selectedOptions}
            onChange={handleChange}
        />
    );
}

export default TagsSelectors;
