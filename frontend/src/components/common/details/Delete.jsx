import CalendarService from "../../../api/services/CalendarService";
import { showSuccessToast } from "../../../utils/toast";
import { useDispatch } from "react-redux";
import { fetchCalendars } from "../../../features/state/calendar.slice";
import Button from "../../common/buttons/Button";
import btnStyles from "../../common/buttons/button.module.css";
import EventService from "../../../api/services/EventService";

function Delete({ purpose, isOwner, onClose, type }) {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        let message = "";
        if (type === "calendar") {
            message =
                "Are you sure you want to delete this calendar? This action cannot be undone.";
        } else {
            message =
                "Are you sure you want to delete this event? This action cannot be undone.";
        }
        if (window.confirm(message)) {
            try {
                if (type === "calendar") {
                    await CalendarService.deleteCalendar(purpose._id);
                    showSuccessToast("Calendar deleted successfully");
                    dispatch(fetchCalendars());
                } else {
                    await EventService.deleteEvent(purpose._id);
                    showSuccessToast("Event deleted successfully");
                }
                onClose();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleLeave = async () => {
        let message = "";
        if (type === "calendar") {
            message =
                "Are you sure you want to leave this calendar? You will lose access to all events.";
        } else {
            message = "Are you sure you want to leave this event?";
        }
        if (window.confirm(message)) {
            try {
                if (type === "calendar") {
                    await CalendarService.leaveCalendar(purpose._id);
                    showSuccessToast("Left calendar successfully");
                    dispatch(fetchCalendars());
                } else {
                    await EventService.leave(purpose._id);
                    showSuccessToast("Left event successfully");
                }
                onClose();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const getTitle = () => {
        if (type === "calendar") {
            if (isOwner) {
                return "Delete Calendar";
            }
            return "Leave Calendar";
        } else if (type === "event") {
            if (isOwner) {
                return "Delete event";
            }
            return "Leave event";
        }
    };

    const getWarning = () => {
        if (type === "calendar") {
            if (isOwner) {
                return "Deleting this calendar will remove it for all users. All events and data associated with this calendar will be permanently lost.";
            }
            return "Leaving this calendar will remove it from your list. You will no longer have access to its events.";
        } else if (type === "event") {
            if (isOwner) {
                return "Deleting this event will remove it for all users.";
            }
            return "Leaving this event will remove it from your list.";
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
            <h3>{getTitle()}</h3>
            <p
                style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                }}
            >
                {getWarning()}
            </p>
            <Button
                className={btnStyles.button_danger}
                onClick={isOwner ? handleDelete : handleLeave}
            >
                {getTitle()}
            </Button>
        </div>
    );
}

export default Delete;
