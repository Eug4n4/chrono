import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'


class EmailManager {
    /**
     * @type {nodemailer.Transporter}
     */
    #transporter;
    /**
     * @type {EmailManager}
     */
    static #instance;

    static getInstance() {
        if (EmailManager.#instance == undefined) {
            EmailManager.#instance = new EmailManager();
            EmailManager.#instance.#transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            })
        }
        return EmailManager.#instance;
    }

    sendPasswordResetMail(email) {
        const expiresMinutes = 30;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: `${expiresMinutes}m` });
        const link = `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/password-reset/${token}`;
        this.#transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password reset",
            html: `<p>Follow this link to reset your password. Link expires in ${expiresMinutes} minutes</p>\n\
        <p><a href="${link}">link</a></p>`
        })
    }
}

export default EmailManager;