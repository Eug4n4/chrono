import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import CreateEventService from "../../api/services/TagService.js";

function TagsSelectors({ onChange, defaultTags }) {
    const [selectedOptions, setSelectedOptions] = useState(
        Array.isArray(defaultTags) ? defaultTags : [],
    );
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await CreateEventService.getAllTags();
            const backendTags = res.data.tags;

            const formatted = backendTags.map((tag) => ({
                label: tag.name,
                value: tag._id,
            }));

            setOptions(formatted);
            // setSelectedOptions([]); у тебе й так початковий стан це пустий масив
            // onChange && onChange([]);
        })();
    }, [onChange]);

    const handleChange = (newValue) => {
        if (newValue.length <= 3) {
            setSelectedOptions(newValue);
            onChange && onChange(newValue);
        }
    };

    const handleCreate = (inputValue) => {
        if (selectedOptions.length >= 3) return;
        const newOption = {
            value: inputValue.toLowerCase(),
            label: inputValue,
        };
        setOptions((prev) => [...prev, newOption]);
        const newSelected = [...selectedOptions, newOption];
        setSelectedOptions(newSelected);
        onChange && onChange(newSelected);
    };

    return (
        <CreatableSelect
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            onCreateOption={handleCreate}
            options={options}
            placeholder="Insert a tags"
            classNamePrefix="react-select"
        />
    );
}

export default TagsSelectors;
