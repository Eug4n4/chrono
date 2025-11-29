import { useState, useEffect } from "react";
import Modal from "../Modal";
import DetailsModalSidebar from "./DetailsModalSidebar";
import CalendarService from "../../../api/services/CalendarService";

import s from "./details.modal.module.css";
/**
 *
 * @param {Object} props
 * @param views // eventDetailsAvailableViews | calendarDetailsAvailableViews
 * @param purpose // event | calendar object
 * @param type // "calendar" | "event"
 */
function DetailsModal({ views, purpose, isOpen, onClose, type }) {
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
            // TODO: Implement getGuests for EventService
        }
    };

    useEffect(() => {
        if (isOpen && purpose._id) {
            fetchGuests();
        }
    }, [isOpen, purpose._id]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>{purpose.name}</h2>
            <div className={s.content}>
                <DetailsModalSidebar
                    views={views}
                    currentViewName={currentViewName}
                    onViewChange={setCurrentViewName}
                    isOwner={purpose.isOwner}
                />
                <div className={s.details_section}>
                    {Object.keys(views).map((key) => {
                        if (
                            views[key].viewName === "Delete" &&
                            !purpose.isOwner &&
                            currentViewName === "Leave"
                        ) {
                            const Component = views[key].component;
                            return (
                                <Component
                                    key={key}
                                    purpose={purpose}
                                    guests={guests}
                                    onUpdate={fetchGuests}
                                    isOwner={purpose.isOwner}
                                    onClose={onClose}
                                />
                            );
                        }

                        if (views[key].viewName === currentViewName) {
                            const Component = views[key].component;
                            return (
                                <Component
                                    key={key}
                                    purpose={purpose}
                                    guests={guests}
                                    onUpdate={fetchGuests}
                                    isOwner={purpose.isOwner}
                                    onClose={onClose}
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
