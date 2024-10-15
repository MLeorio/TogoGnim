import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({
        type: String,
        description: "Email de l'utilisateur",
        default: "leo@ex.com",
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email : string
}