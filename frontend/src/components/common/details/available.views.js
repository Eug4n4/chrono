import CalendarDetails from "../../calendar/details/CalendarDetails";
import EventDetails from "../../event/details/EventDetails";
import Members from "./Members";
import Invitations from "./Invitations";
import Delete from "./Delete";

const calendarDetailsAvailableViews = {
    details: { viewName: "Details", component: CalendarDetails },
    members: { viewName: "Members", component: Members },
    invitations: { viewName: "Invitations", component: Invitations },
    delete: { viewName: "Delete", component: Delete },
};

const eventDetailsAvailableViews = {
    details: { viewName: "Details", component: EventDetails },
    members: { viewName: "Members", component: Members },
    invitations: { viewName: "Invitations", component: Invitations },
    delete: { viewName: "Delete", component: Delete },
};

export { calendarDetailsAvailableViews, eventDetailsAvailableViews };
