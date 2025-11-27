import InvitationsForm from "../../common/details/InvitationsForm";
import { useState } from "react";
import CalendarService from "../../../api/services/CalendarService";
import { showSuccessToast } from "../../../utils/toast";

function CalendarInvitations({ purpose }) {
    const [error, setError] = useState({ invitation: "" });

    async function handleSubmit(formData) {
        try {
            await CalendarService.inviteUser(purpose._id, formData.email);
            showSuccessToast("Invitation sent successfully");
            setError({ invitation: "" });
        } catch (e) {
            setError({
                invitation:
                    e.response?.data?.message || "Failed to invite user",
            });
        }
    }

    return <InvitationsForm onSubmit={handleSubmit} invitationError={error} />;
}

export default CalendarInvitations;
