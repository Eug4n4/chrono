import Input from "./Input";
import s from "./input.module.css";
/**
 *
 * @param {Object} props
 * @param {Function} props.onChange
 * @param {String} props.className
 * @param {String} props.htmlFor label attribute
 * @param {String} props.label content of a label
 *
 */
function LabeledInput({ onChange, className, label, htmlFor, ...rest }) {
    return (
        <div className={s.wrapper}>
            <Input className={className} onChange={onChange} {...rest} />
            <label htmlFor={htmlFor}>{label}</label>
        </div>
    );
}

export default LabeledInput;
