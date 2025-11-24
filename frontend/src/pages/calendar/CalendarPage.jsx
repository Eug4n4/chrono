import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/calendar/Header";
import Sidebar from "../../components/calendar/Sidebar";
import CalendarView from "../../components/calendar/CalendarView";
import SharedEventModal from "../../components/calendar/SharedEventModal";
import styles from "./CalendarPage.module.css";
import { fetchCalendars } from "../../features/state/calendar.slice";

const CalendarPage = () => {
    const [currentView, setCurrentView] = useState("Monthly");
    const [title, setTitle] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sharedToken, setSharedToken] = useState(null);
    const calendarRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCalendars());
    }, [dispatch]);

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            setSharedToken(token);
        }
    }, [searchParams]);

    const handleSharedModalClose = () => {
        setSharedToken(null);
        searchParams.delete("token");
        setSearchParams(searchParams);
    };

    const viewMap = {
        Daily: "timeGridDay",
        Weekly: "timeGridWeek",
        Monthly: "dayGridMonth",
        Yearly: "multiMonthYear",
    };

    const reverseViewMap = {
        timeGridDay: "Daily",
        timeGridWeek: "Weekly",
        dayGridMonth: "Monthly",
        multiMonthYear: "Yearly",
    };

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            const currentApiView = calendarApi.view.type;
            const targetView = viewMap[currentView];
            if (currentApiView !== targetView) {
                calendarApi.changeView(targetView);
            }
        }
    }, [currentView]);

    const handlePrev = () => calendarRef.current?.getApi().prev();
    const handleNext = () => calendarRef.current?.getApi().next();
    const handleToday = () => calendarRef.current?.getApi().today();

    const handleDatesSet = (arg) => {
        setTitle(arg.view.title);
        const newView = reverseViewMap[arg.view.type];
        if (newView && newView !== currentView) {
            setCurrentView(newView);
        }
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
                onToday={handleToday}
                title={title}
                onToggleSidebar={toggleSidebar}
            />
            <div className={styles.mainContent}>
                <Sidebar isOpen={isSidebarOpen} />
                <CalendarView ref={calendarRef} onDatesSet={handleDatesSet} />
            </div>
            {sharedToken && (
                <SharedEventModal
                    isOpen={!!sharedToken}
                    onClose={handleSharedModalClose}
                    token={sharedToken}
                />
            )}
        </div>
    );
};

export default CalendarPage;
