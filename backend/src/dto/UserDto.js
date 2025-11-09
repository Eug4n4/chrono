import User from "../models/User.js";

class UserDto {
    id;
    login;
    email;
    avatar;
    /**
     * @param {User} user
     */
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.email = user.email;
        this.avatar = user.avatar;
    }
}

export default UserDto;
