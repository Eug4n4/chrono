import { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import LabeledInput from "../inputs/LabeledInput";
import CountrySelector from "../selectors/CountrySelector";
import { getCountryData } from "countries-list";
import { Camera } from "lucide-react";
import Button from "../common/buttons/Button";
import AuthService from "../../api/services/AuthService";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/state/auth.slice";

import b from "../common/buttons/button.module.css";
import s from "./settings.module.css";

function SettingsModal({ user, isOpen, onClose }) {
    const dispatch = useDispatch();
    const [login, setLogin] = useState(user.login);
    const [country, setCountry] = useState({ value: "", label: "" });
    const [isFormDisabled, setIsFormDisabled] = useState(true);
    const fileInput = useRef();
    const avatar = useRef();

    const getUserCountry = () => getCountryData(user.countryCode);

    useEffect(() => {
        const country = getUserCountry();
        setCountry({ value: country.iso2, label: country.name });
    }, [user, getCountryData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.updateUser({
            login,
            countryCode: country.value,
            avatar: fileInput.current.files[0],
        })
            .then((response) => {
                dispatch(updateUser(response.data));
                showSuccessToast("Updated successfully!");
            })
            .catch((response) => {
                showErrorToast(
                    `Error while updating your profile!: ${response?.response.data?.message}`,
                );
            });
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        avatar.current.src = URL.createObjectURL(file);
    };

    const handleCameraClick = () => fileInput.current.click();

    const handleCancelClick = () => {
        setIsFormDisabled(true);
        setLogin(user.login);
        const country = getUserCountry();
        setCountry({ value: country.iso2, label: country.name });
        fileInput.current.value = "";
        avatar.current.src = `${import.meta.env.VITE_API_URL}/${user.avatar}`;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <h3>Settings</h3>
                <div className={s.preview_wrapper}>
                    <input
                        onChange={handleChange}
                        ref={fileInput}
                        disabled={isFormDisabled}
                        type="file"
                        name="avatar"
                        id="user_avatar"
                        accept="image/*"
                    />
                    <div className={s.preview}>
                        <img
                            ref={avatar}
                            src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
                            alt="avatar"
                        />
                        <Button
                            type="button"
                            disabled={isFormDisabled}
                            className={b.button_camera}
                            onClick={handleCameraClick}
                        >
                            <Camera width={32} height={32} />
                        </Button>
                    </div>
                </div>
                <LabeledInput
                    id="user_login"
                    htmlFor="user_login"
                    label="Login"
                    placeholder=""
                    disabled={isFormDisabled}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <CountrySelector
                    onChange={(country) => {
                        setCountry(country);
                    }}
                    startingValue={country}
                    disabled={isFormDisabled}
                />
                <div className={s.buttons}>
                    <Button
                        type="button"
                        hidden={isFormDisabled === false}
                        onClick={() => setIsFormDisabled(false)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        hidden={isFormDisabled === true}
                        className={b.button_danger}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" hidden={isFormDisabled === true}>
                        Update
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default SettingsModal;
