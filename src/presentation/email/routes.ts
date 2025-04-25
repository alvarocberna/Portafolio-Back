import { Router } from "express";
import { EmailService } from "./email.service";

export class EmailRoutes {

    static get routes(): Router {

        const router = Router();
        const emailService = new EmailService();

        router.post('/', emailService.sendEmail);


        return router;

    }

}