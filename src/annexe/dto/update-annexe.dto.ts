import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnnexeDto {
  @ApiProperty({
    type: String,
    description: "Id de l'annexe a modifier",
  })
  @IsNotEmpty()
  id: string;

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
}
