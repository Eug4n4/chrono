import { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import AuthService from "../../api/services/AuthService";

function Register() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(formData) {
    setSubmitting(true);
    AuthService.register(Object.fromEntries(formData)).finally(() =>
      setSubmitting(false)
    );
  }
  return <RegisterForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Register;
