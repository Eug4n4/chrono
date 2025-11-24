import { useState } from "react";
import EventService from "../../../api/services/EventService";
import InvitationsForm from "../../common/details/InvitationsForm";
import { showSuccessToast } from "../../../utils/toast";
function EventInvitations({ purpose }) {
    const initialErrors = { invitation: "" };
    const [error, setError] = useState(initialErrors);
    function handleSubmit(formData) {
        EventService.sendInvite(formData.email, purpose._id)
            .then(() => {
                setError(initialErrors);
                showSuccessToast(`Email was sent to ${formData.email}`);
            })
            .catch((reason) => {
                setError({ invitation: `${reason.response.data?.message}` });
            });
    }
    return <InvitationsForm onSubmit={handleSubmit} invitationError={error} />;
}

export default EventInvitations;
