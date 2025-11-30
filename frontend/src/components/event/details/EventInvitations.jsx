import { useMemo, useState } from "react";
import EventService from "../../../api/services/EventService";
import InvitationsForm from "../../common/details/InvitationsForm";
import { showSuccessToast } from "../../../utils/toast";
import GuestList from "../../calendar/details/GuestList";

function EventInvitations({ purpose, guests, onUpdate, isOwner }) {
    const invites = useMemo(
        () => guests.filter((guest) => !guest.isInviteAccepted),
        [guests],
    );
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

    const handleRemove = async (guest) => {
        console.log("remove");
    };

    return (
        <>
            <InvitationsForm onSubmit={handleSubmit} invitationError={error} />
            <GuestList guests={invites} onRemove={handleRemove} />
        </>
    );
}

export default EventInvitations;
