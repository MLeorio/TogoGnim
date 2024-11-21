import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { log } from 'console';

@Controller('mailer')
export class MailerController {
    constructor(
        private readonly mailService: MailerService
    ) { }

    @Post('send')
    async sendMail(@Body() dto) {
        await this.mailService.sendSignupConfirmation(dto.mail, dto.url);
        return { message: "Email envoye avec succes !" };
    }
}
