import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsEmail, IsNotEmpty} from 'class-validator';

export class ResetPasswordConfirmationDto {
    // @ApiProperty({
    //     type: String,
    //     description: "Email de l'utilisateur",
    //     default: "leo@ex.com",
    // })
    // @IsEmail()
    // @IsNotEmpty()
    // readonly email : string;

    @ApiProperty({
        type: String,
        description: "Mot de passe",
        default: "********",
    })
    @IsString()
    @IsNotEmpty()
    readonly newPassword : string;


    @ApiProperty({
        type: String,
        description: "Code de confirmation",
        default: "000000",
    })
    @IsString()
    @IsNotEmpty()
    readonly token : string
}
