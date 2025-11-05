import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../inputs/PasswordInput";
import Input from "../inputs/Input";

function RegisterForm({ onSubmit, submitting }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", login: "", email: "" });

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

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSubmit(e);
  }

  return (
    <form id="register_form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <Input
          type="text"
          name="login"
          id="login"
          placeholder="Login"
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        {errors.login && <p>{errors.login}</p>}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <PasswordInput
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <PasswordInput
          name="repeat_password"
          id="repeat_password"
          placeholder="Repeat password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <button type="submit" id="submit_register" disabled={submitting}>
        {submitting ? "Submitting..." : "Register now"}
      </button>

      <div id="to_login">
        <p>
          Already have an account?
          <br />
          <Link to={"/login"}>Sign In</Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
