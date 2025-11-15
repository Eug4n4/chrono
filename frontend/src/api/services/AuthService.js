import api from "../api";

class AuthService {
    static async login(data) {
        return api.post("auth/login", data);
    }

    static async logout() {
        return api.post("auth/logout");
    }

    static async register(data) {
        return api.post("auth/register", data);
    }

    static async sendResetPassword(data) {
        return api.post("auth/password-reset", data);
    }

    static async confirmResetPassword(token, newPassword) {
        return api.post(`auth/password-reset/${token}`, newPassword);
    }

    static async verifyEmail(token) {
        return api.get(`auth/verify/${token}`);
    }

    static async resendVerificationEmail(email) {
        return api.post("auth/resend-verification", { email });
    }
}

export default AuthService;
