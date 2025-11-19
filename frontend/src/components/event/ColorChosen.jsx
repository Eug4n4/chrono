import React, { useState } from "react";

const ColorChosen = ({setColor}) => {
    const colors = ["#6043ee", "#7949d0", "#01abdb"];
    const [selectedColor, setSelectedColor] = useState(null);

    const handleSelect = (color) => {
        setSelectedColor(color);
        setColor(color);
    };

    return (
        <div>
            <div style={{ display: "flex", gap: "10px" }}>
                {colors.map((color) => (
                    <div
                        key={color}
                        onClick={() => handleSelect(color)}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: color,
                            border: selectedColor === color ? "3px solid black" : "2px solid #ccc",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorChosen;