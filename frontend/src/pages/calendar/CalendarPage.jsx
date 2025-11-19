import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/calendar/Header";
import Sidebar from "../../components/calendar/Sidebar";
import CalendarView from "../../components/calendar/CalendarView";
import styles from "./CalendarPage.module.css";
import { fetchCalendars } from "../../features/state/calendar.slice";

const CalendarPage = () => {
    const [currentView, setCurrentView] = useState("Monthly");
    const [title, setTitle] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const calendarRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCalendars());
    }, [dispatch]);

    const viewMap = {
        Daily: "timeGridDay",
        Weekly: "timeGridWeek",
        Monthly: "dayGridMonth",
        Yearly: "multiMonthYear",
    };

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(viewMap[currentView]);
        }
    }, [currentView]);

    const handlePrev = () => calendarRef.current?.getApi().prev();
    const handleNext = () => calendarRef.current?.getApi().next();

    const handleDatesSet = (arg) => {
        setTitle(arg.view.title);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.calendarPage}>
            <Header
                currentView={currentView}
                setCurrentView={setCurrentView}
                onPrev={handlePrev}
                onNext={handleNext}
                title={title}
                onToggleSidebar={toggleSidebar}
            />
            <div className={styles.mainContent}>
                <Sidebar isOpen={isSidebarOpen} />
                <CalendarView ref={calendarRef} onDatesSet={handleDatesSet} />
            </div>
        </div>
    );
};

export default CalendarPage;
