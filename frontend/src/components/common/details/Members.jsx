import { useMemo } from "react";
import CalendarService from "../../../api/services/CalendarService";
import EventService from "../../../api/services/EventService";
import GuestList from "../../calendar/details/GuestList";
import { showSuccessToast } from "../../../utils/toast";

function Members({ guests, purpose, onUpdate, isOwner, type }) {
    const members = useMemo(
        () => guests?.filter((guest) => guest.isInviteAccepted) || [],
        [guests],
    );

    const handleRemove = async (guest) => {
        try {
            if (type === "calendar") {
                await CalendarService.removeGuest(purpose._id, guest.user._id);
            } else {
                await EventService.removeGuest(purpose._id, guest.user._id);
            }
            showSuccessToast("Member removed");
            if (onUpdate) onUpdate();
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            <h3>Members</h3>
            <GuestList
                guests={members}
                onRemove={isOwner ? handleRemove : null}
            />
        </div>
    );
}

export default Members;
