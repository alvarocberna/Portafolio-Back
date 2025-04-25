import nodemailer from 'nodemailer';
import { envs } from '../../config/envs';
import { Request, Response } from 'express';

export interface EmailOptions {
    to: string;
    subject: string;
    htmlBody: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(req: Request, res: Response) {

        const { to, subject, htmlBody } = req.body;

        try {
            this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody
            })
            res.json('email enviado');
            return;

        } catch (err) {
            console.log(err);
            res.json(err);
            return;
        }


    }


}