import CalendarDelete from "../../calendar/details/CalendarDelete";
import CalendarDetails from "../../calendar/details/CalendarDetails";
import CalendarInvitations from "../../calendar/details/CalendarInvitations";
import EventInvitations from "../../event/details/EventInvitations";
import CalendarMembers from "../../calendar/details/CalendarMembers";
import EventDetails from "../../event/details/EventDetails";

const calendarDetailsAvailableViews = {
    details: { viewName: "Details", component: CalendarDetails },
    members: { viewName: "Members", component: CalendarMembers },
    invitations: { viewName: "Invitations", component: CalendarInvitations },
    delete: { viewName: "Delete", component: CalendarDelete },
};

const eventDetailsAvailableViews = {
    details: { viewName: "Details", component: EventDetails },
    members: { viewName: "Members", component: CalendarMembers },
    invitations: { viewName: "Invitations", component: EventInvitations },
    delete: { viewName: "Delete", component: CalendarDelete },
};

export { calendarDetailsAvailableViews, eventDetailsAvailableViews };
