import { useMemo, useState } from "react";
import InvitationsForm from "./InvitationsForm";
import GuestList from "../../calendar/details/GuestList";
import CalendarService from "../../../api/services/CalendarService";
import EventService from "../../../api/services/EventService";
import { showSuccessToast } from "../../../utils/toast";

function Invitations({ purpose, guests, onUpdate, isOwner, type }) {
    const initialErrors = { invitation: "" };
    const [error, setError] = useState(initialErrors);
    const pendingInvites = useMemo(
        () => guests?.filter((guest) => !guest.isInviteAccepted) || [],
        [guests],
    );
    if (!isOwner) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>You do not have permission to invite users.</p>
            </div>
        );
    }

    async function handleSubmit(formData) {
        try {
            if (type === "calendar") {
                await CalendarService.inviteUser(purpose._id, formData.email);
            } else {
                await EventService.sendInvite(purpose._id, formData.email);
            }
            showSuccessToast("Invitation sent successfully");
            setError(initialErrors);
            if (onUpdate) {
                onUpdate();
            }
        } catch (e) {
            setError({
                invitation:
                    e.response?.data?.message || "Failed to invite user",
            });
        }
    }

    const handleRemove = async (guest) => {
        try {
            if (type === "calendar") {
                await CalendarService.removeGuest(purpose._id, guest.user._id);
            } else {
                await EventService.removeGuest(purpose._id, guest.user._id);
            }
            showSuccessToast("Invitation cancelled");
            if (onUpdate) onUpdate();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <InvitationsForm onSubmit={handleSubmit} invitationError={error} />
            <div style={{ marginTop: "20px" }}>
                <p>Pending Invitations</p>
                <GuestList guests={pendingInvites} onRemove={handleRemove} />
            </div>
        </>
    );
}

export default Invitations;
