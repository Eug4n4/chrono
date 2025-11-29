import styles from "./button.module.css";

function Button({ disabled, children, ...rest }) {
    return (
        <button className={styles.button_submit} disabled={disabled} {...rest}>
            {children}
        </button>
    );
}

export default Button;
