import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import styles from "./CalendarView.module.css";

const CalendarView = React.forwardRef(({ onDatesSet }, ref) => {
    const containerRef = useRef(null);

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
                events={[]}
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
