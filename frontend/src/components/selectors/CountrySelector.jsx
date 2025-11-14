import { useSelector } from "react-redux";
import Select from "react-select";

const colorStyles = {
    control: (styles, state) => ({
        ...styles,
        background: "rgba(52, 76, 149, 0.4)",
        border: state.isFocused
            ? "2px solid #64ffda"
            : "2px solid rgba(100, 255, 218, 0.2)",
        borderRadius: "8px",
        color: "#ccd6f6",
        minHeight: "44px",
        fontSize: "14px",
        boxShadow: state.isFocused
            ? "0 0 12px rgba(100, 255, 218, 0.2)"
            : "none",
        transition: "all 0.3s ease",
    }),
    menuList: (styles) => ({
        ...styles,
        backgroundColor: "#193457",
        borderRadius: "8px",
        marginTop: "4px",
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "#ccd6f6",
        fontSize: "14px",
    }),
    placeholder: (styles) => ({
        ...styles,
        color: "#8892b0",
        fontSize: "14px",
    }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused
            ? "rgba(100, 255, 218, 0.15)"
            : "#193457",
        color: state.isSelected ? "#64ffda" : "#ccd6f6",
        cursor: "pointer",
        padding: "12px 14px",
        transition: "all 0.2s ease",
    }),
    input: (styles) => ({
        ...styles,
        color: "#ccd6f6",
        fontSize: "14px",
    }),
};

/**
 *
 * @param {Object} props
 * @param {Function} props.onChange
 *
 */
function CountrySelector({ onChange }) {
    const { countries } = useSelector((state) => state.countriesList);
    return (
        <Select
            defaultValue={null}
            onChange={onChange}
            options={countries}
            styles={colorStyles}
            placeholder="Select country..."
        />
    );
}

export default CountrySelector;
