import i from "../../inputs/input.module.css";

function Selector({ className, onChange, children, ...rest }) {
    return (
        <select
            className={className == undefined ? `${i.input}` : className}
            onChange={onChange}
            {...rest}
        >
            {children}
        </select>
    );
}

export default Selector;
