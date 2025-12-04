import React from "react";
import Modal from "../common/Modal";
import styles from "./InviteConfirmationModal.module.css";
import btnStyles from "../common/buttons/button.module.css";

const InviteConfirmationModal = ({ isOpen, onClose, onRespond }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Calendar Invitation</h2>
            <p>You have been invited to join a calendar.</p>
            <div className={styles.actions}>
                <button
                    className={btnStyles.cancel}
                    onClick={() => onRespond("reject")}
                >
                    Decline
                </button>
                <button
                    className={btnStyles.accept}
                    onClick={() => onRespond("accept")}
                >
                    Accept
                </button>
            </div>
        </Modal>
    );
};

export default InviteConfirmationModal;
