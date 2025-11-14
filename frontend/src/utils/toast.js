import { toast } from "react-toastify";

const toastConfig = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const showSuccessToast = (message) => {
    toast.success(message, toastConfig);
};

export const showErrorToast = (message) => {
    toast.error(message, toastConfig);
};

export const extractErrorMessage = (error) => {
    if (error.response?.data) {
        const data = error.response.data;

        if (typeof data.message === "string") {
            return data.message;
        }

        if (Array.isArray(data)) {
            return data.map((err) => err.msg || err.message).join(", ");
        }
    }

    if (error.message) {
        return error.message;
    }

    return "An error occurred. Please try again.";
};
