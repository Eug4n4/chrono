import Select from "react-select/base";
import { useState } from "react";

function TagsSelectors() {
    const [tags] = useState([
        { value: "home", label: "home" },
        { value: "live", label: "live" }
    ]);
    const [loading] = useState(false);

    const options = tags.map(tag => ({
        value: tag,
        label: tag
    }));
    return (
        <div>
            <Select
                defaultValue={options[0]}
                options={options}
                isLoading={loading}
                placeholder="Select tags..."
                onMenuOpen={() => {}}
                onInputChange={() => {}}
            />
        </div>
    );
}


export default TagsSelectors;