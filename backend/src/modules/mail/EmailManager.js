import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

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
                    pass: process.env.EMAIL_PASS,
                },
            });
        }
        return EmailManager.#instance;
    }

    #sendMail(to, subject, html) {
        this.#transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            html: html,
        });
    }

    sendPasswordResetMail(email) {
        const expiresMinutes = 30;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: `${expiresMinutes}m`,
        });
        const link = `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/password-reset/${token}`;
        this.#sendMail(
            email,
            "Password reset",
            `<p>Follow this link to reset your password. Link expires in ${expiresMinutes} minutes</p>\n\
        <p><a href="${link}">link</a></p>`,
        );
    }

    sendVerificationMail(email) {
        const expiresMinutes = 1;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: `${expiresMinutes}m`,
        });
        const link = `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/verify-email/${token}`;
        this.#sendMail(
            email,
            "Email verification",
            `<p>Please verify your email. Follow this <a href="${link}">link</a></p>`,
        );
    }

    sendEventInvitation(link, email) {
        this.#sendMail(
            email,
            "Event invitation",
            `<h2>You have been invited to participate in an event!</h2>\
        <p>Follow this <a href="${link}">link</a> to accept this invite</p>`,
        );
    }

    sendCalendarInvitation(email, token, calendarName) {
        const link = `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/calendar?inviteToken=${token}`;
        this.#sendMail(
            email,
            "Calendar Invitation",
            `<h2>You have been invited to join the calendar "${calendarName}"!</h2>\
        <p>Follow this <a href="${link}">link</a> to accept or decline this invitation.</p>`,
        );
    }

    sendNotification(to, subject, html) {
        this.#sendMail(to, subject, html);
    }
}

export default EmailManager;
