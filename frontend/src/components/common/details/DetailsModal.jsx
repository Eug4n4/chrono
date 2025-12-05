import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import DetailsModalSidebar from "./DetailsModalSidebar";
import CalendarService from "../../../api/services/CalendarService";
import EventService from "../../../api/services/EventService";

import s from "./details.modal.module.css";
/**
 *
 * @param {Object} props
 * @param views // eventDetailsAvailableViews | calendarDetailsAvailableViews
 * @param purpose // event | calendar object
 * @param type // "calendar" | "event"
 */
function DetailsModal({ views, purpose, isOpen, onClose, type }) {
    const { user } = useSelector((state) => state.auth);
    const [currentViewName, setCurrentViewName] = useState(
        views.invitations.viewName,
    );
    const [guests, setGuests] = useState([]);

    const fetchGuests = () => {
        if (type === "calendar") {
            CalendarService.getGuests(purpose._id)
                .then((response) => {
                    setGuests(response.data.guests);
                })
                .catch((error) => {
                    console.error("Failed to fetch guests", error);
                });
        } else if (type === "event") {
            EventService.getGuests(purpose._id)
                .then((response) => {
                    setGuests(response.data.guests);
                })
                .catch(console.error);
        }
    };

    const isOwner = () => {
        if (!user) {
            return false;
        }
        let owner;
        if (Object.hasOwn(purpose, "isOwner")) {
            owner = purpose.isOwner;
        } else if (Object.hasOwn(purpose, "owner")) {
            owner = purpose.owner === user.id;
        }
        return owner;
    };

    useEffect(() => {
        if (isOpen && purpose._id) {
            fetchGuests();
        }
    }, [isOpen, purpose._id]);

    const availableViews = useMemo(() => {
        if (purpose.isDefault) {
            const newViews = { ...views };
            delete newViews.delete;
            return newViews;
        }
        return views;
    }, [views, purpose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className={s.title}>{purpose.name}</h2>
            <div className={s.content}>
                <DetailsModalSidebar
                    views={availableViews}
                    currentViewName={currentViewName}
                    onViewChange={setCurrentViewName}
                    isOwner={isOwner()}
                />
                <div className={s.details_section}>
                    {Object.keys(availableViews).map((key) => {
                        if (availableViews[key].viewName === currentViewName) {
                            const Component = availableViews[key].component;
                            return (
                                <Component
                                    key={key}
                                    purpose={purpose}
                                    guests={guests}
                                    onUpdate={fetchGuests}
                                    isOwner={isOwner()}
                                    onClose={onClose}
                                    type={type}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </Modal>
    );
}

export default DetailsModal;
