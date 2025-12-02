import React, { useEffect, useState } from "react";

const ColorChosen = ({ setColor, defaultColor }) => {
    const colors = [
        "#6043ee",
        "#7949d0",
        "#01abdb",
        "#d95361",
        "#d99b4a",
        "#4fae86",
        "#4f96d9",
        "#9a7ad9",
        "#d979a8",
    ];
    useEffect(() => {
        setColor(defaultColor ? defaultColor : colors[0]);
    }, [colors]);
    const [selectedColor, setSelectedColor] = useState(
        defaultColor ? defaultColor : colors[0],
    );

    const handleSelect = (color) => {
        setSelectedColor(color);
        setColor(color);
    };

    return (
        <div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {colors.map((color) => (
                    <div
                        key={color}
                        onClick={() => handleSelect(color)}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: color,
                            border:
                                selectedColor === color
                                    ? "3px solid black"
                                    : "2px solid #ccc",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorChosen;
