import User from "../models/User.js";

class UserDto {
    id;
    login;
    email;
    avatar;
    countryCode;
    /**
     * @param {User} user
     */
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.email = user.email;
        this.avatar = user.avatar;
        this.countryCode = user.countryCode;
    }
}

export default UserDto;
