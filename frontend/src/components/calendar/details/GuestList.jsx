import React from "react";
import GuestPreview from "./GuestPreview";
import s from "./guest.list.module.css";

function GuestList({ guests, onRemove }) {
    if (!guests || guests.length === 0) {
        return <div className={s.empty}>No users found</div>;
    }

    return (
        <div className={s.guest_list}>
            {guests.map((guest) => (
                <GuestPreview
                    key={guest._id}
                    guest={guest}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default GuestList;
