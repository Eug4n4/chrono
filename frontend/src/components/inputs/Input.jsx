function Input({ onChange, ...rest }) {
    return <input onChange={onChange} autoComplete="off" {...rest} />;
}

export default Input;
