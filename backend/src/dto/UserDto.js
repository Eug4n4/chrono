import User from "../models/User.js";

class UserDto {
    id
    login
    email
    /**
     * @param {User} user
     */
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.email = user.email;
    }
}

export default UserDto;