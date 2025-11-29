import InvitationsForm from "../../common/details/InvitationsForm";
import { useState } from "react";
import CalendarService from "../../../api/services/CalendarService";
import { showSuccessToast } from "../../../utils/toast";
import GuestList from "./GuestList";

function CalendarInvitations({ purpose, guests, onUpdate, isOwner }) {
    const [error, setError] = useState({ invitation: "" });

    if (!isOwner) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>You do not have permission to invite users.</p>
            </div>
        );
    }

    async function handleSubmit(formData) {
        try {
            await CalendarService.inviteUser(purpose._id, formData.email);
            showSuccessToast("Invitation sent successfully");
            setError({ invitation: "" });
            if (onUpdate) onUpdate();
        } catch (e) {
            setError({
                invitation:
                    e.response?.data?.message || "Failed to invite user",
            });
        }
    }

    const handleRemove = async (guest) => {
        try {
            await CalendarService.removeGuest(purpose._id, guest.user._id);
            showSuccessToast("Invitation cancelled");
            if (onUpdate) onUpdate();
        } catch (e) {
            console.error(e);
        }
    };

    const pendingInvites =
        guests?.filter((guest) => !guest.isInviteAccepted) || [];

    return (
        <div>
            <InvitationsForm onSubmit={handleSubmit} invitationError={error} />
            <div style={{ marginTop: "20px" }}>
                <p>Pending Invitations</p>
                <GuestList guests={pendingInvites} onRemove={handleRemove} />
            </div>
        </div>
    );
}

export default CalendarInvitations;
