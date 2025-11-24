import InvitationsForm from "../../common/details/InvitationsForm";

function EventInvitations({ purpose }) {
    function handleSubmit(formData) {
        console.log(formData);
        console.log(purpose);
    }
    return <InvitationsForm onSubmit={handleSubmit} />;
}

export default EventInvitations;
