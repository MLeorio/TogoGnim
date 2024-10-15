import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator"

export class LoginDto {
    @ApiProperty({
        type: String,
        description: "Identifiant",
        default: "Leorio",
    })
    @IsString()
    @IsNotEmpty()
    username: string;


    @ApiProperty({
        type: String,
        description: "Mot de passe",
        default: "********",
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}