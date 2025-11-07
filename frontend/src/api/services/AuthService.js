import api from "../api";


class AuthService {
    static async login(data) {
        return api.post("auth/login", data)
    }

    static async register(data) {
        return api.post("auth/register", data)
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
}

export default AuthService