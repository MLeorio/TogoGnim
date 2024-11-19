import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Libellé de la catégorie',
    default: 'Alimentation générale',
  })
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({
    type: String,
    description: 'Description de la catégorie',
    default: "Bon l'alimenttion quoi",
  })
  @IsString()
  @IsNotEmpty()
  category_description: string;
}
