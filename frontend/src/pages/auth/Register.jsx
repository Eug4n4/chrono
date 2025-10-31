import { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import AuthService from "../../api/services/AuthService";

function Register() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
    await AuthService.register(Object.fromEntries(formData));
    setSubmitting(false);
    console.log("Register!");
  }
  return <RegisterForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Register;
