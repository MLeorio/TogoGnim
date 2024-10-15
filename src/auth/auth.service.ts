import { ConflictException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as crypto from 'crypto';
import { ResetPasswordConfirmationDto } from './dto/reset-password-confirm.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private readonly mailer: MailerService,
    ) { }

    // async register(userDto: any): Promise<User> {
    //     const hashedPassword = await bcrypt.hash(userDto.password, 10);
    //     const user = new this.userModel({
    //         ...userDto,
    //         password: hashedPassword,
    //     });
    //     return user.save();
    // }

    async signup(signupDto: Partial<RegisterDto>) {
        const { password, password2, email, ...userdto } = signupDto;
        // ** Verifier si l'utilisateur existe déjà
        const userExist = await this.userModel.findOne({ email: email });
        if (userExist) throw new ConflictException("L'utilisateur existe déjà");

        // ** Comparer les mots de passes
        if (password != password2) throw new ConflictException("Les mots de passe ne sont pas conformes ! ");

        // ** Hasher le mot de passe
        const hash = await bcrypt.hash(password, 10);
        // ** Créer l'utilisateur
        const user = new this.userModel(userdto);
        user.password = hash;
        user.email = email;
        user.save();

        const url = "http://localhost:3000/user/activation/" + user.id;

        // ** Envoyer un mail de confirmation
        await this.mailer.sendSignupConfirmation(email, url);

        // ** Retourner une réponse de succès
        return user;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ username: username, active: true });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {

        // console.log("Id de l'utilisateur", user._id.toString());

        const payload = { username: user.username, sub: user._id.toString() };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const { email } = resetPasswordDto;
        // ** Verifier si l'utilisateur existe
        const user = await this.userModel.findOne({ email: email, active: true });
        if (!user) throw new NotFoundException('Ustilisateur non trouvé');

        // ** Générer un token de réinitialisation
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date();
        expires.setHours(expires.getHours() + 1); // Le token expire dans 1 heure

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        user.save()

        const url = 'http://localhost:3000/auth/reset-password-confirmation';
        await this.mailer.sendResetPassword(email, url, token);
        return {
            message: "L'email de reinitialisation du mot de passe a été bien envoyé !",
        };
    }

    async resetPasswordConfirm(token: string, newPassword: string) {
        const user = await this.userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        }).exec();

        if (!user) throw new NotFoundException('Le lien de reinitialisation a expiré');

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        await this.mailer.sendResetPasswordConfirm(user.email);
    }
}
