import { useSelector } from "react-redux";
import Select from "react-select";

const colorStyles = {
    control: (styles) => ({
        ...styles,
        background: "#344c95",
        border: "2px solid #0e1d33",
    }),
    menuList: (styles) => ({
        ...styles,
        backgroundColor: "#344c95",
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "#ccd6f6",
    }),
    placeholder: (styles) => ({
        ...styles,
        color: "#ccd6f6",
    }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused ? "#236fd1" : "#344c95",
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
