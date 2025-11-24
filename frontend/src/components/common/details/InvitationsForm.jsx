import { useState } from "react";
import Input from "../../inputs/Input";

import l from "../../forms/login.form.module.css";
import s from "./details.modal.module.css";

function InvitationsForm({ onSubmit }) {
    const [email, setEmail] = useState("");
    const initialErrors = { email: "" };
    const [errors, setErrors] = useState(initialErrors);

    function handleSubmit(e) {
        e.preventDefault();
        const errors = {};
        const isEmail = /^[\w.]+@(?:\w{2,}\.)+\w{2,}$/.test(email);
        if (!isEmail) {
            errors.email = "Invalid email";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        setErrors(initialErrors);
        onSubmit(Object.fromEntries(new FormData(e.target)));
    }

    return (
        <form className={s.invite_form} onSubmit={handleSubmit}>
            <p>Invitations</p>
            <div className={l.wrapper}>
                <Input
                    type="email"
                    placeholder=""
                    name="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                {errors.email && <p>{errors.email}</p>}
            </div>
            <button className={l.submit_login}>Invite</button>
        </form>
    );
}

export default InvitationsForm;
