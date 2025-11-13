import nodemailer from 'nodemailer';
import { envs } from '../../config/envs';
import { Request, Response } from 'express';

export interface EmailOptions {
    to: string;
    subject: string;
    htmlBody: string;
}

export class EmailService {

    // private transporter = nodemailer.createTransport({
    // service: envs.MAILER_SERVICE,
    // auth: {
    //     user: envs.MAILER_EMAIL,
    //     pass: envs.MAILER_SECRET_KEY
    // }
    // })

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com',
            // port: 465,
            // secure: true,
            service: envs.MAILER_SERVICE,
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET_KEY,
            },
            debug: true,
        });

        // Asegúrate de enlazar el contexto correctamente si pasas el método como callback
        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail(req: Request, res: Response) {

        const { to, subject, htmlBody } = req.body;


        try {
            const info = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to: to,
                subject: subject,
                html: htmlBody
            })
            res.json('email enviado: ' + info);
            return;

        } catch (err) {
            console.log(err);
            res.json('erro al enviar email' + err);
            return;
        }

    }


}