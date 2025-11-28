import Selector from "../common/selectors/Selector";
import styles from "../event/create.event.module.css";

function TypeSelector({ value, onChange }) {
    return (
        <div className={styles.wrapper}>
            <Selector value={value} onChange={onChange}>
                <option value="arrangement">arrangement</option>
                <option value="task">task</option>
                <option value="reminder">reminder</option>
            </Selector>
        </div>
    );
}

export default TypeSelector;
