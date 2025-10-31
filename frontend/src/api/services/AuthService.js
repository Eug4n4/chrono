import api from "../api";


class AuthService {
    static async login(data) {
        return api.post("auth/login", data)
    }

    static async register(data) {
        return api.post("auth/register", data)
    }
}

export default AuthService