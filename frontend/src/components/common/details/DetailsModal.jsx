import { useState } from "react";
import Modal from "../Modal";
import DetailsModalSidebar from "./DetailsModalSidebar";

import s from "./details.modal.module.css";
/**
 *
 * @param {Object} props
 * @param views // eventDetailsAvailableViews | calendarDetailsAvailableViews
 * @param purpose // event | calendar object
 *
 */
function DetailsModal({ views, purpose, isOpen, onClose }) {
    const [currentViewName, setCurrentViewName] = useState(
        views.invitations.viewName,
    );
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>{purpose.name}</h2>
            <div className={s.content}>
                <DetailsModalSidebar
                    views={views}
                    currentViewName={currentViewName}
                    onViewChange={setCurrentViewName}
                />
                <div className={s.details_section}>
                    {Object.keys(views).map((key) => {
                        if (views[key].viewName === currentViewName) {
                            const Component = views[key].component;
                            return <Component key={key} purpose={purpose} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </Modal>
    );
}

export default DetailsModal;
