import React from "react";
import EventCreateForm from "../../components/event/EventCreateForm.jsx";
import styles from "../../components/event/create.event.module.css";
import Header from "../../components/common/Header.jsx";

const CreateEventPage = () => {

    return (
        <div>
            <Header />
            <div className={styles.createContainer}>
                <EventCreateForm />
            </div>
        </div>

    );
};

export default CreateEventPage;