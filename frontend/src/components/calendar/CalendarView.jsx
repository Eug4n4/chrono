import React, { useEffect, useRef } from "react";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import styles from "./CalendarView.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventsForCalendars } from "../../features/state/event.slice";
import { fetchHolidays } from "../../api/services/HolidayService";

const CalendarView = React.forwardRef(({ onDatesSet }, ref) => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { activeCalendars, calendars, guestCalendars, showHolidays } =
        useSelector((state) => state.calendars);
    const { eventsByCalendar } = useSelector((state) => state.events);
    const { user } = useSelector((state) => state.auth);
    const [holidayEvents, setHolidayEvents] = useState([]);
    const fetchedYears = useRef(new Set());

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

    const fetchHolidaysForYears = async (years) => {
        if (!user?.countryCode) return;

        const newYears = years.filter((y) => !fetchedYears.current.has(y));
        if (newYears.length === 0) return;

        newYears.forEach((y) => fetchedYears.current.add(y));

        const newEvents = [];
        for (const year of newYears) {
            try {
                const holidays = await fetchHolidays(user.countryCode, year);
                const events = (holidays?.holidays || []).map((h) => ({
                    title: h.name,
                    start: new Date(h.date).toISOString().split("T")[0],
                    allDay: true,
                    color: "#ff9800",
                    extendedProps: { isHoliday: true },
                }));
                newEvents.push(...events);
            } catch (e) {
                console.error(`Failed to fetch holidays for ${year}`, e);
                fetchedYears.current.delete(year);
            }
        }

        if (newEvents.length > 0) {
            setHolidayEvents((prev) => {
                const existingSignatures = new Set(
                    prev.map((e) => `${e.start}-${e.title}`),
                );
                const uniqueNewEvents = newEvents.filter(
                    (e) => !existingSignatures.has(`${e.start}-${e.title}`),
                );
                return [...prev, ...uniqueNewEvents];
            });
        }
    };

    const handleDatesSet = (arg) => {
        if (onDatesSet) onDatesSet(arg);

        if (showHolidays) {
            const startYear = arg.start.getFullYear();
            const endYear = new Date(arg.end.getTime() - 1).getFullYear();
            const years = [];
            for (let y = startYear; y <= endYear; y++) {
                years.push(y);
            }
            fetchHolidaysForYears(years);
        }
    };

    useEffect(() => {
        if (!showHolidays) {
            setHolidayEvents([]);
            fetchedYears.current.clear();
        } else if (ref.current) {
            const api = ref.current.getApi();
            const startYear = api.view.currentStart.getFullYear();
            const endYear = api.view.currentEnd.getFullYear();
            const years = [];
            for (let y = startYear; y <= endYear; y++) {
                years.push(y);
            }
            fetchHolidaysForYears(years);
        }
    }, [showHolidays, user]);

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
    const allEvents = [...combinedEvents, ...holidayEvents];

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
                events={allEvents}
                datesSet={handleDatesSet}
                views={{
                    multiMonthYear: {
                        type: "multiMonth",
                        duration: { years: 1 },
                    },
                }}
                eventContent={(arg) => {
                    if (arg.event.extendedProps.isHoliday) {
                        return (
                            <div
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontSize: "0.85em",
                                }}
                                title={arg.event.title}
                            >
                                {arg.event.title}
                            </div>
                        );
                    }
                    return arg.event.title;
                }}
            />
        </main>
    );
});

CalendarView.displayName = "CalendarView";

export default CalendarView;
