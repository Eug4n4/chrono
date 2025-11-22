import { useState } from "react";
import Modal from "../../common/Modal";
import Invitations from "./Invitations";
import Delete from "./Delete";
import Members from "./Members";
import Details from "./Details";

import s from "./details.modal.module.css";

const availableViews = {
    details: { viewName: "Details", component: Details },
    members: { viewName: "Members", component: Members },
    invitations: { viewName: "Invitations", component: Invitations },
    delete: { viewName: "Delete", component: Delete },
};
/**
 * @param {Object} props
 * @param {{_id: number, name: String, description: String}} props.calendar
 *
 */
function CalendarDetailsModal({ calendar, isOpen, onClose }) {
    const [currentViewName, setCurrentViewName] = useState(
        availableViews.invitations.viewName,
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>{calendar.name}</h2>
            <div className={s.content}>
                <aside className={s.details_sidebar}>
                    {Object.keys(availableViews).map((property) => (
                        <button
                            className={
                                currentViewName ===
                                availableViews[property].viewName
                                    ? s.active
                                    : ""
                            }
                            key={property}
                            onClick={() =>
                                setCurrentViewName(
                                    availableViews[property].viewName,
                                )
                            }
                        >
                            {availableViews[property].viewName}
                        </button>
                    ))}
                </aside>
                <div className={s.details_section}>
                    {Object.keys(availableViews).map((key) => {
                        if (availableViews[key].viewName === currentViewName) {
                            const Component = availableViews[key].component;
                            return <Component key={key} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </Modal>
    );
}

export default CalendarDetailsModal;
