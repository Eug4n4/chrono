import Textarea from "./Textarea";
import s from "../../inputs/input.module.css";

function LabeledTextarea({ className, label, htmlFor, ...rest }) {
    return (
        <div className={s.wrapper}>
            <Textarea className={className} {...rest} />
            <label htmlFor={htmlFor}>{label}</label>
        </div>
    );
}

export default LabeledTextarea;
