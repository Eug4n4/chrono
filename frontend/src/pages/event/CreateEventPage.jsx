import React from "react";
import EventCreateForm from "../../components/event/EventCreateForm.jsx";
import styles from "../../components/event/create.event.module.css";

const CreateEventPage = () => {

    return (
        <div className={styles.createContainer}>
            <EventCreateForm/>
        </div>
    );
};

export default CreateEventPage;