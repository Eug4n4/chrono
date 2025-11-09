import { useSelector } from "react-redux";
import Select from "react-select";
/**
 *
 * @param {Object} props
 * @param {Function} props.onChange
 *
 */
function CountrySelector({ onChange }) {
    const { countries } = useSelector((state) => state.countriesList);
    return (
        <Select defaultValue={null} onChange={onChange} options={countries} />
    );
}

export default CountrySelector;
