import s from "./details.modal.module.css";

function DetailsModalSidebar({ views, currentViewName, onViewChange }) {
    return (
        <aside className={s.details_sidebar}>
            {Object.keys(views).map((property) => (
                <button
                    className={
                        currentViewName === views[property].viewName
                            ? s.active
                            : ""
                    }
                    key={property}
                    onClick={() => onViewChange(views[property].viewName)}
                >
                    {views[property].viewName}
                </button>
            ))}
        </aside>
    );
}

export default DetailsModalSidebar;
