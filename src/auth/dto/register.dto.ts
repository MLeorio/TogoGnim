import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: "Nom d'utilisateur",
    default: 'keitaro',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: "Nom de l'utilisateur",
    default: 'ABALO',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    type: String,
    description: "Prénom de l'utilisateur",
    default: 'Afi',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    type: String,
    description: "Email de l'utilisateur",
    default: 'leo@ex.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Mot de passe',
    default: '********',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Confirmation du mot de passe',
    default: '********',
  })
  @IsString()
  @IsNotEmpty()
  password2: string;
}
