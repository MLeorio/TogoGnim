import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    constructor(
        private readonly configService: ConfigService
    ) { }
    private async transporter() {
        const transporter = nodemailer.createTransport({
            host: '127.0.0.1',
            port: 1025,
            ignoreTLS: true,
            secure: false,
        });
        return transporter;
    }
    async sendSignupConfirmation(userEmail: string, url: string) {
        (await this.transporter()).sendMail({
            from: this.configService.get('APP_MAIL'),
            to: userEmail,
            subject: 'Inscription Réussie',
            html: `
                <h3>Confirmation d'inscription</h3></br>
                <p>Bienvenue sur notre plateforme...</p>
                <p>Voici le lien pour <a href="${url}">activer votre compte</a></p>
            `
        });
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        (await this.transporter()).sendMail({
            from: this.configService.get('APP_MAIL'),
            to: userEmail,
            subject: 'Réinitialisation de mot de passe ',
            html: `
                <h3>Reinitialiser le mot de passe</h3>
                <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
                <p>Voici le lien pour réinitialiser votre mot de passe : <a href="${url}">${url}</a></p>
                <p>Code de vérification : ${code}</p>
                <p>Ce code expire dans 15 minutes<p>
            `,
        });
    }

    async sendResetPasswordConfirm(email: string) {
        (await this.transporter()).sendMail({
            from: this.configService.get('APP_MAIL'),
            to: email,
            subject: 'Confirmation de réinitialisation de votre mot de passe',
            html: `
                <h3>Votre mot de passe a été bien réinitialisé</h3>
                <p>Vous avez éffectué une réinitialisation de votre mot de passe.</p>
                <p>Veuillez vous connectez pour accéder à votre compte</p>
                <p>Merci pour votre fidélité !</p>
            `,
        });
    }
}
