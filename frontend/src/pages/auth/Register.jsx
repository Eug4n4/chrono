import { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import AuthService from "../../api/services/AuthService";

function Register() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    AuthService.register(Object.fromEntries(formData)).finally(() =>
      setSubmitting(false)
    );
    console.log("Register!");
  }
  return <RegisterForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Register;
