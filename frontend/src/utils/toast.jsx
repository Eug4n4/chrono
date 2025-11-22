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

export const showWarningToast = (message) => {
    toast.warning(message, toastConfig);
};

export const showActionToast = (
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
) => {
    const handleConfirm = async () => {
        try {
            await onConfirm();
            toast.dismiss();
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        toast.dismiss();
    };

    const ToastContent = () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
                {message}
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <button
                    onClick={handleConfirm}
                    style={{
                        padding: "8px 14px",
                        backgroundColor: "#64ffda",
                        color: "#0e1d33",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                    {confirmText}
                </button>
                <button
                    onClick={handleCancel}
                    style={{
                        padding: "8px 14px",
                        backgroundColor: "rgba(136, 146, 176, 0.3)",
                        color: "#ccd6f6",
                        border: "1px solid rgba(136, 146, 176, 0.5)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                    {cancelText}
                </button>
            </div>
        </div>
    );

    toast(<ToastContent />, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const extractErrorMessage = (error) => {
    console.log("Error object:", error);

    if (error.response?.data) {
        const data = error.response.data;
        console.log("Response data:", data);

        if (typeof data.message === "string") {
            return data.message;
        }

        if (Array.isArray(data)) {
            return data.map((err) => err.msg || err.message).join("; ");
        }
    }

    if (error.message) {
        return error.message;
    }

    return "An error occurred. Please try again.";
};
