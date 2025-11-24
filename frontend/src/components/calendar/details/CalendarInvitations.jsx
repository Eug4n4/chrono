import InvitationsForm from "../../common/details/InvitationsForm";

function CalendarInvitations({ purpose }) {
    function handleSubmit(formData) {
        console.log(formData);
        console.log(purpose);
    }

    return <InvitationsForm onSubmit={handleSubmit} />;
}

export default CalendarInvitations;
