import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../inputs/PasswordInput";
import Input from "../inputs/Input";
import CountrySelector from "../selectors/CountrySelector";
import r from "./register.form.module.css";

function RegisterForm({ onSubmit, submitting }) {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const initialErrorsState = {
        password: "",
        login: "",
        email: "",
        countryCode: "",
    };
    const [errors, setErrors] = useState(initialErrorsState);

    function handleSubmit(e) {
        e.preventDefault();
        const errors = {};
        const isEmail = /^[\w.]+@(?:\w{2,}\.)+\w{2,}$/.test(email);
        const isLogin = /^\w+$/.test(login);
        if (!isLogin) {
            errors.login = "Login can't contain whitespaces";
        }
        if (!isEmail) {
            errors.email = "Invalid email";
        }
        if (password !== repeatPassword) {
            errors.password = "Passwords must match";
        } else if (password.length < 8) {
            errors.password = "Password's length must be at least 8";
        }
        if (selectedCountryCode.length === 0) {
            errors.countryCode = "Select country you are from";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        } else {
            setErrors(initialErrorsState);
        }
        const formData = new FormData(e.target);
        formData.append("countryCode", selectedCountryCode);
        onSubmit(formData);
    }

    return (
        <div className={r.register_container}>
            <div className={r.register_card}>
                <form id={r.register_form} onSubmit={handleSubmit}>
                    <div className={r.wrapper}>
                        <h2>Create Account</h2>
                    </div>
                    <div className={r.wrapper}>
                        <Input
                            type="text"
                            name="login"
                            id="login"
                            placeholder=""
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                        <label htmlFor="login">Login</label>
                        {errors.login && <p>{errors.login}</p>}
                    </div>

                    <div className={r.wrapper}>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder=""
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>

                        {errors.email && <p>{errors.email}</p>}
                    </div>

                    <div className={r.wrapper}>
                        <PasswordInput
                            name="password"
                            id={r.password}
                            placeholder=""
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor={r.password}>Password</label>

                        {errors.password && <p>{errors.password}</p>}
                    </div>

                    <div className={r.wrapper}>
                        <PasswordInput
                            name="repeat_password"
                            id={r.repeat_password}
                            placeholder=""
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                        />
                        <label htmlFor={r.repeat_password}>
                            Repeat password
                        </label>

                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className={r.wrapper}>
                        <div>
                            <CountrySelector
                                onChange={(country) =>
                                    setSelectedCountryCode(country.value)
                                }
                                classNamePrefix={r.react_select}
                            />
                            {errors.countryCode && <p>{errors.countryCode}</p>}
                        </div>
                    </div>

                    <div className={r.wrapper}>
                        <button
                            type="submit"
                            className={r.submit_register}
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Register now"}
                        </button>
                    </div>
                    <div className={r.wrapper}>
                        <div className={r.to_login}>
                            <p>
                                Already have an account?
                                <br />
                                <Link to={"/login"}>Sign In</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
