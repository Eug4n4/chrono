import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Filter, Check } from "lucide-react";
import styles from "./FilterDropdown.module.css";

const FilterDropdown = ({
    selectedTypes,
    setSelectedTypes,
    selectedTags,
    setSelectedTags,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { tags } = useSelector((state) => state.tags);

    const eventTypes = [
        { label: "Task", value: "task" },
        { label: "Arrangement", value: "arrangement" },
        { label: "Reminder", value: "reminder" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleType = (typeValue) => {
        if (selectedTypes.includes(typeValue)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== typeValue));
        } else {
            setSelectedTypes([...selectedTypes, typeValue]);
        }
    };

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter((t) => t !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    const clearAll = () => {
        setSelectedTypes([]);
        setSelectedTags([]);
    };

    const activeCount = selectedTypes.length + selectedTags.length;

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button
                className={`${styles.filterButton} ${isOpen ? styles.active : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Filter size={16} />
                <span className={styles.filterText}>Filter</span>
                {activeCount > 0 && (
                    <span className={styles.badge}>{activeCount}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.header}>
                        <h3>Filter Items</h3>
                        <button className={styles.clearAll} onClick={clearAll}>
                            Clear all
                        </button>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>TYPE</div>
                        <div className={styles.optionList}>
                            {eventTypes.map((type) => (
                                <div
                                    key={type.value}
                                    className={`${styles.optionItem} ${
                                        !selectedTypes.includes(type.value)
                                            ? styles.unchecked
                                            : ""
                                    }`}
                                    onClick={() => toggleType(type.value)}
                                >
                                    <div className={styles.optionLabel}>
                                        {type.label}
                                    </div>
                                    {selectedTypes.includes(type.value) && (
                                        <Check size={16} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>TAGS</div>
                        <div
                            className={`${styles.optionList} ${styles.tagsList}`}
                        >
                            {tags.map((tag) => (
                                <div
                                    key={tag._id}
                                    className={`${styles.optionItem} ${
                                        !selectedTags.includes(tag._id)
                                            ? styles.unchecked
                                            : ""
                                    }`}
                                    onClick={() => toggleTag(tag._id)}
                                >
                                    <div className={styles.optionLabel}>
                                        {tag.name}
                                    </div>
                                    {selectedTags.includes(tag._id) && (
                                        <Check size={16} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
