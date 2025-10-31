import { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";

function Register() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    console.log("Register!");
  }
  return <RegisterForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Register;
