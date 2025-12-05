import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/calendar/Header";
import Sidebar from "../../components/calendar/Sidebar";
import CalendarView from "../../components/calendar/CalendarView";
import SharedEventModal from "../../components/calendar/SharedEventModal";
import styles from "./CalendarPage.module.css";
import { fetchCalendars } from "../../features/state/calendar.slice";
import InviteConfirmationModal from "../../components/calendar/InviteConfirmationModal";
import CalendarService from "../../api/services/CalendarService";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { fetchTags } from "../../features/state/tag.slice";
import NewCalendarModal from "../../components/calendar/NewCalendarModal";

const CalendarPage = () => {
    const [currentView, setCurrentView] = useState("Monthly");
    const [title, setTitle] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sharedToken, setSharedToken] = useState(null);
    const [inviteToken, setInviteToken] = useState(null);
    const calendarRef = useRef(null);
    const dispatch = useDispatch();

    const [filterTypes, setFilterTypes] = useState([]);
    const [filterTags, setFilterTags] = useState([]);
    const [isNewCalendarModalOpen, setIsNewCalendarModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCalendars());
    }, [dispatch]);

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            setSharedToken(token);
        }
        const iToken = searchParams.get("inviteToken");
        if (iToken) {
            setInviteToken(iToken);
        }
    }, [searchParams]);

    const handleSharedModalClose = () => {
        setSharedToken(null);
        searchParams.delete("token");
        setSearchParams(searchParams);
    };

    const handleInviteRespond = async (action) => {
        try {
            await CalendarService.respondToInvite(inviteToken, action);
            showSuccessToast(`Invitation ${action}ed successfully`);
            setInviteToken(null);
            searchParams.delete("inviteToken");
            setSearchParams(searchParams);
            if (action === "accept") {
                dispatch(fetchCalendars());
            }
        } catch (e) {
            showErrorToast(
                e.response?.data?.message || "Failed to respond to invitation",
            );
        }
    };

    const handleInviteClose = () => {
        setInviteToken(null);
        searchParams.delete("inviteToken");
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
                setTimeout(() => {
                    calendarApi.changeView(targetView);
                }, 0);
            }
        }
    }, [currentView]);

    const handlePrev = () => calendarRef.current?.getApi().prev();
    const handleNext = () => calendarRef.current?.getApi().next();
    const handleToday = () => calendarRef.current?.getApi().today();

    const handleDatesSet = (arg) => {
        setTimeout(() => {
            setTitle(arg.view.title);
            const newView = reverseViewMap[arg.view.type];
            if (newView && newView !== currentView) {
                setCurrentView(newView);
            }
        }, 0);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCreateEvent = () => {
        // Assuming navigation to create event page
        // You might need to import useNavigate if not already available or pass a handler
        // But CalendarPage uses useSearchParams, not useNavigate directly in the provided code.
        // Wait, Header uses useNavigate. I should probably pass a handler that navigates.
        // Let's check if I can use useNavigate here.
        // Yes, I can import it.
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
                isSidebarOpen={isSidebarOpen}
                filterTypes={filterTypes}
                setFilterTypes={setFilterTypes}
                filterTags={filterTags}
                setFilterTags={setFilterTags}
                isNewCalendarModalOpen={isNewCalendarModalOpen}
                setIsNewCalendarModalOpen={setIsNewCalendarModalOpen}
            />
            <div className={styles.mainContent}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    onClose={() => setIsSidebarOpen(false)}
                    onToday={handleToday}
                    setIsNewCalendarModalOpen={setIsNewCalendarModalOpen}
                    filterTypes={filterTypes}
                    setFilterTypes={setFilterTypes}
                    filterTags={filterTags}
                    setFilterTags={setFilterTags}
                />
                <CalendarView
                    ref={calendarRef}
                    onDatesSet={handleDatesSet}
                    filterTypes={filterTypes}
                    filterTags={filterTags}
                />
            </div>
            {sharedToken && (
                <SharedEventModal
                    isOpen={!!sharedToken}
                    onClose={handleSharedModalClose}
                    token={sharedToken}
                />
            )}
            {inviteToken && (
                <InviteConfirmationModal
                    isOpen={!!inviteToken}
                    onClose={handleInviteClose}
                    onRespond={handleInviteRespond}
                />
            )}
            {isNewCalendarModalOpen && (
                <NewCalendarModal
                    isOpen={isNewCalendarModalOpen}
                    onClose={() => setIsNewCalendarModalOpen(false)}
                    onCreated={() => dispatch(fetchCalendars())}
                />
            )}
        </div>
    );
};

export default CalendarPage;
