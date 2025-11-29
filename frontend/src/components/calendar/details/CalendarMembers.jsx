import GuestList from "./GuestList";
import CalendarService from "../../../api/services/CalendarService";
import { showSuccessToast } from "../../../utils/toast";

function CalendarMembers({ guests, purpose, onUpdate, isOwner }) {
    const members = guests?.filter((guest) => guest.isInviteAccepted) || [];

    const handleRemove = async (guest) => {
        try {
            await CalendarService.removeGuest(purpose._id, guest.user._id);
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

export default CalendarMembers;
