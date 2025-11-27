import React from "react";
import Modal from "../common/Modal";
import styles from "./InviteConfirmationModal.module.css";

const InviteConfirmationModal = ({ isOpen, onClose, onRespond }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Calendar Invitation</h2>
            <p>You have been invited to join a calendar.</p>
            <div className={styles.actions}>
                <button
                    className={styles.acceptBtn}
                    onClick={() => onRespond("accept")}
                >
                    Accept
                </button>
                <button
                    className={styles.rejectBtn}
                    onClick={() => onRespond("reject")}
                >
                    Decline
                </button>
            </div>
        </Modal>
    );
};

export default InviteConfirmationModal;
