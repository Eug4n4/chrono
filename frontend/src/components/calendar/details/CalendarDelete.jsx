import CalendarService from "../../../api/services/CalendarService";
import { showSuccessToast } from "../../../utils/toast";
import { useDispatch } from "react-redux";
import { fetchCalendars } from "../../../features/state/calendar.slice";
import Button from "../../common/buttons/Button";
import btnStyles from "../../common/buttons/button.module.css";

function CalendarDelete({ purpose, isOwner, onClose }) {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete this calendar? This action cannot be undone.",
            )
        ) {
            try {
                await CalendarService.deleteCalendar(purpose._id);
                showSuccessToast("Calendar deleted successfully");
                dispatch(fetchCalendars());
                onClose();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleLeave = async () => {
        if (
            window.confirm(
                "Are you sure you want to leave this calendar? You will lose access to all events.",
            )
        ) {
            try {
                await CalendarService.leaveCalendar(purpose._id);
                showSuccessToast("Left calendar successfully");
                dispatch(fetchCalendars());
                onClose();
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <h3>{isOwner ? "Delete Calendar" : "Leave Calendar"}</h3>
            <p
                style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                }}
            >
                {isOwner
                    ? "Deleting this calendar will remove it for all users. All events and data associated with this calendar will be permanently lost."
                    : "Leaving this calendar will remove it from your list. You will no longer have access to its events."}
            </p>
            <Button
                className={btnStyles.button_danger}
                onClick={isOwner ? handleDelete : handleLeave}
            >
                {isOwner ? "Delete Calendar" : "Leave Calendar"}
            </Button>
        </div>
    );
}

export default CalendarDelete;
