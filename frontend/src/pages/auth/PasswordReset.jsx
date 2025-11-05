import { useState } from "react";
import Input from "../../components/inputs/Input";
import AuthService from "../../api/services/AuthService";

function PasswordReset() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const errors = {};

    if (!/^[\w.]+@(?:\w{2,}\.)+\w{2,}$/.test(email)) {
      errors.email = "Invalid email";
    }
    if (Object.keys(errors).length > 0) {
      setSubmitting(false);
      setSuccess(false);
      setErrors(errors);
      return;
    }

    AuthService.sendResetPassword({ email: email })
      .then(() => setSuccess(true))
      .finally(() => setSubmitting(false));
  }

  return (
    <form id="remind_form" onSubmit={handleSubmit}>
      <h3>Password Reminder</h3>
      <div>
        <Input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Send recovery email"}
      </button>
      <div>{success && <p>Email was successfully sent!</p>}</div>
    </form>
  );
}

export default PasswordReset;
