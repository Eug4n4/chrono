import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import styles from "./CalendarView.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventsForCalendars } from "../../features/state/event.slice";

const CalendarView = React.forwardRef(({ onDatesSet }, ref) => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { activeCalendars, calendars, guestCalendars } = useSelector(
        (state) => state.calendars,
    );
    const { eventsByCalendar } = useSelector((state) => state.events);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(() => {
            if (ref.current?.getApi()) {
                ref.current.getApi().updateSize();
            }
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);

    useEffect(() => {
        if (activeCalendars.length > 0) {
            const allCalendarIds = [
                ...calendars.map((c) => c._id),
                ...guestCalendars.map((c) => c._id),
            ];

            const validCalendarIds = activeCalendars.filter(
                (id) =>
                    allCalendarIds.includes(id) && id && typeof id === "string",
            );

            if (validCalendarIds.length > 0) {
                dispatch(fetchEventsForCalendars(validCalendarIds));
            }
        }
    }, [activeCalendars, dispatch, calendars, guestCalendars]);

    const combinedEvents = activeCalendars.flatMap(
        (calendarId) => eventsByCalendar[calendarId] || [],
    );

    return (
        <main className={styles.calendarView} ref={containerRef}>
            <FullCalendar
                ref={ref}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    multiMonthPlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={false}
                height="100%"
                events={combinedEvents}
                datesSet={onDatesSet}
                views={{
                    multiMonthYear: {
                        type: "multiMonth",
                        duration: { years: 1 },
                    },
                }}
            />
        </main>
    );
});

export default CalendarView;
