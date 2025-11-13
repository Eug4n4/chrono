import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../inputs/PasswordInput";
import Input from "../inputs/Input";
import l from "./login.form.module.css";

function LoginForm({ onSubmit, submitting }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ login: "", password: "" });

    function handleSubmit(e) {
        e.preventDefault();
        const errors = {};
        const isEmail = /^[\w.]+@(?:\w{2,}\.)+\w{2,}$/.test(login);
        const isLogin = /^\w+$/.test(login);
        if (!isEmail && !isLogin) {
            errors.login = "Invalid login or email";
        }
        if (password.length < 8) {
            errors.password = "Password's length must be at least 8";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        onSubmit(e);
    }

    return (
        <div className={l.login_container}>
            <div className={l.login_card}>
                <form className={l.login_form} method="get" id="login_form" onSubmit={handleSubmit}>
                    <div className={l.wrapper}>
                        <h2>Sign In</h2>
                    </div>
                    <div className={l.wrapper}>
                        <Input
                            type="text"
                            placeholder=""
                            name="login"
                            id="login"
                            required
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <label htmlFor="login">Login or email</label>
                        {errors.login && <p>{errors.login}</p>}
                    </div>
                    <div style={{ gap: "15px" }} className={l.wrapper}>
                        <PasswordInput
                            placeholder=""
                            name="password"
                            id={l.password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor={l.password}>Password</label>
                        {errors.password && <p>{errors.password}</p>}
                        <Link to={"/password-reset"}>Forgot password?</Link>
                    </div>

                    <button type="submit" id="submit_login" disabled={submitting} className={l.submit_login}>
                        {submitting ? "Submitting..." : "Sign In"}
                    </button>
                    <div id={l.to_register}>
                        <p>
                            New here?
                            <br />
                            <Link to={"/register"}>Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
