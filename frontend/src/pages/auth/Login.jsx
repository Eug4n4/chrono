import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    console.log("Login!");
  }
  return <LoginForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Login;
