import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import styles from "./CalendarView.module.css";

const CalendarView = React.forwardRef(({ onDatesSet }, ref) => {
    return (
        <main className={styles.calendarView}>
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
