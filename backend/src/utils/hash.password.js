import bcrypt from "bcrypt";

async function hashPassword(plainText) {
    return bcrypt.hash(plainText, 10);
}

export default hashPassword;
