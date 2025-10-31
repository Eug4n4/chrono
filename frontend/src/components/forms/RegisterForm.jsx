import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../inputs/PasswordInput";
import Input from "../inputs/Input";

function RegisterForm({ onSubmit, submitting }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handlePasswordChange(e) {}

  function handleEmailChange(e) {}

  function handleLoginChange(e) {}

  return (
    <form id="register_form" onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      <Input
        type="text"
        name="login"
        id="login"
        placeholder="Login"
        onChange={handleLoginChange}
        required
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleEmailChange}
        required
      />
      <PasswordInput
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        required
      />

      <PasswordInput
        type="password"
        name="repeat_password"
        id="repeat_password"
        placeholder="Repeat password"
        onChange={handlePasswordChange}
        required
      />
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
