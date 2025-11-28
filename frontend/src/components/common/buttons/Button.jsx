function Button({ className, disabled, children, ...rest }) {
    return (
        <button className={className} disabled={disabled} {...rest}>
            {children}
        </button>
    );
}

export default Button;
