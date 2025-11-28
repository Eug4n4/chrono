import i from "../../inputs/input.module.css";

function Textarea({ className, ...rest }) {
    return (
        <textarea
            className={
                className == undefined
                    ? `${i.input}`
                    : `${i.input} ${className}`
            }
            {...rest}
        />
    );
}

export default Textarea;
