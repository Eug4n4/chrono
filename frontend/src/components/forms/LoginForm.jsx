import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../inputs/PasswordInput";
import Input from "../inputs/Input";

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
    <form method="get" id="login_form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <div>
        <Input
          type="text"
          placeholder="Login or email"
          name="login"
          id="login"
          required
          onChange={(e) => setLogin(e.target.value)}
        />
        {errors.login && <p>{errors.login}</p>}
      </div>
      <div>
        <PasswordInput
          placeholder="Password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <button type="submit" id="submit_login" disabled={submitting}>
        {submitting ? "Submitting..." : "Sign In"}
      </button>
      <div id="to_register">
        <p>
          New here?
          <br />
          <Link to={"/register"}>Sign Up</Link>
        </p>
        <Link to={"/password-reset"}>Forgot password?</Link>
      </div>
    </form>
  );
}

export default LoginForm;
