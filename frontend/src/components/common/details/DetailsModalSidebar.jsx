import s from "./details.modal.module.css";

function DetailsModalSidebar({
    views,
    currentViewName,
    onViewChange,
    isOwner,
}) {
    return (
        <aside className={s.details_sidebar}>
            {Object.keys(views).map((property) => {
                const view = views[property];
                if (view.viewName === "Delete" && !isOwner) {
                    return (
                        <button
                            className={
                                currentViewName === "Leave" ? s.active : ""
                            }
                            key="Leave"
                            onClick={() => onViewChange("Leave")}
                        >
                            Leave
                        </button>
                    );
                }
                return (
                    <button
                        className={
                            currentViewName === view.viewName ? s.active : ""
                        }
                        key={property}
                        onClick={() => onViewChange(view.viewName)}
                    >
                        {view.viewName}
                    </button>
                );
            })}
        </aside>
    );
}

export default DetailsModalSidebar;
