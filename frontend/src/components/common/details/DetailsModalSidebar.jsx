import s from "./details.modal.module.css";

function DetailsModalSidebar({
    views,
    currentViewName,
    onViewChange,
    isOwner,
}) {
    const getButtonTitle = (view) => {
        if (view.viewName !== "Delete") {
            return view.viewName;
        }
        return isOwner ? view.viewName : "Leave";
    };

    return (
        <aside className={s.details_sidebar}>
            {Object.keys(views).map((property) => {
                const view = views[property];
                return (
                    <button
                        className={
                            currentViewName === view.viewName ? s.active : ""
                        }
                        key={property}
                        onClick={() => onViewChange(view.viewName)}
                    >
                        {getButtonTitle(view)}
                    </button>
                );
            })}
        </aside>
    );
}

export default DetailsModalSidebar;
