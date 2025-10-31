import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../inputs/PasswordInput";

function LoginForm({ onSubmit, submitting }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form method="get" id="login_form" onSubmit={onSubmit}>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Login or email"
        name="login"
        id="login"
        required
      />
      <PasswordInput
        placeholder="Password"
        name="password"
        id="password"
        required
      />
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
