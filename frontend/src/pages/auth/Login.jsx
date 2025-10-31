import AuthService from "../../api/services/AuthService";
import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
    await AuthService.login(Object.fromEntries(formData));
    setSubmitting(false);
    console.log("Login!");
  }
  return <LoginForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Login;
