import InvitationsForm from "../../common/details/InvitationsForm";
import { useState } from "react";

function CalendarInvitations({ purpose }) {
    const [error, setError] = useState({ invitation: "" });

    function handleSubmit(formData) {
        console.log(formData);
        console.log(purpose);
    }

    return <InvitationsForm onSubmit={handleSubmit} invitationError={error} />;
}

export default CalendarInvitations;
