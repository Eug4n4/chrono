import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PasswordInput from "../../components/inputs/PasswordInput";
import AuthService from "../../api/services/AuthService";

function SetNewPassword() {
  const { token } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({ password: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const payload = jwtDecode(token);
      if (payload.exp - Date.now() < 0) {
        setValidToken(false);
        return;
      }
    } catch (e) {
      setValidToken(false);
    }
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    if (password !== repeatPassword) {
      setSuccess(false);
      setSubmitting(false);
      setErrors({ password: "Please enter the same password twice" });
      return;
    }
    AuthService.confirmResetPassword(token, { password: password })
      .then(() => {
        setErrors({ password: "" });
        setSuccess(true);
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <>
      {validToken ? (
        <form onSubmit={handleSubmit}>
          <h2>Set new password</h2>
          <label htmlFor="password">Enter new password:</label>
          <PasswordInput
            name="password"
            id="password"
            placeholder="Enter new password"
            minLength={8}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="new_password">Repeat password:</label>
          <div>
            <PasswordInput
              name="new_password"
              id="new_password"
              placeholder="Repeat password"
              minLength={8}
              required
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <h1>Wrong Link</h1>
      )}
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>
          Your password has been successfully reset!
        </p>
      )}
    </>
  );
}

export default SetNewPassword;
