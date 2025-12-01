import { useState } from "react";
import { useDispatch } from "react-redux";
import LabeledInput from "../../inputs/LabeledInput";
import LabeledTextarea from "../../common/textarea/LabeledTextarea";
import Button from "../../common/buttons/Button";
import { updateCalendar } from "../../../features/state/calendar.slice";
import { showSuccessToast } from "../../../utils/toast";

import s from "./calendar.details.module.css";
import b from "../../common/buttons/button.module.css";

function CalendarDetails({ purpose }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(purpose.name);
    const [description, setDescription] = useState(purpose.description);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(
            updateCalendar({
                id: purpose._id,
                data: {
                    name: name,
                    description: description,
                },
            }),
        )
            .unwrap()
            .then(() => showSuccessToast("Updated successfully!"))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <form className={s.calendar_details} onSubmit={handleSubmit}>
            <h3>Details</h3>
            <LabeledInput
                id="calendar_name"
                htmlFor="calendar_name"
                label="Name"
                placeholder=""
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
            />
            <LabeledTextarea
                id="calendar_desc"
                htmlFor="calendar_desc"
                label="Description"
                placeholder=""
                className={s.calendar_desc}
                rows={5}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                type="submit"
                className={b.button_submit}
                disabled={isSubmitting}
            >
                Update
            </Button>
        </form>
    );
}

export default CalendarDetails;
