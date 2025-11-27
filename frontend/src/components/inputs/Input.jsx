import s from "./input.module.css";
function Input({ onChange, className, ...rest }) {
    return (
        <input
            onChange={onChange}
            className={className == undefined ? `${s.input}` : className}
            autoComplete="off"
            {...rest}
        />
    );
}

export default Input;
