import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

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
        if (selected.length > 3) return;

        setSelectedOptions(selected);
        onChange && onChange(selected);
    };

    const handleCreateTag = (inputValue) => {
        const newOption = { label: inputValue, value: inputValue };

        if (selectedOptions.length >= 3) return;

        const updated = [...selectedOptions, newOption];
        setSelectedOptions(updated);
        onChange && onChange(updated);
    };


    return (
        <CreatableSelect
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            onCreateOption={handleCreateTag}
            options={options}
            placeholder="Insert a tags"
        />
    );
}

export default TagsSelectors;
