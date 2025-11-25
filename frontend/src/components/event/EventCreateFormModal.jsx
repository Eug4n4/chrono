import Modal from "../common/Modal.jsx";
import EventCreateForm from "./EventCreateForm.jsx";

const EventCreateFormModal = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <EventCreateForm />
        </Modal>
    );
};