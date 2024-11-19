import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnexeDto {
  @ApiProperty({
    type: String,
    description: "Nom de l'annexe de la boutique",
    default: 'Annexe name',
  })
  @IsString()
  @IsNotEmpty()
  annexe_name: string;

  @ApiProperty({
    type: String,
    description: "Numero de telephone de l'annexe",
  })
  @IsNotEmpty()
  @IsString()
  annexe_tel: string;

  @ApiProperty({
    type: String,
    description: "Adresse de l'annexe",
  })
  @IsString()
  @IsNotEmpty()
  annexe_adresse: string;

  @ApiProperty({
    type: String,
    description: "Url image de l'annexe",
  })
  @IsString()
  @IsNotEmpty()
  annexe_image: string;

  @ApiProperty({
    type: String,
    description: 'reference de la boutique',
  })
  @IsNotEmpty()
  @IsString()
  store: string;
}
