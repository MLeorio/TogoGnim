import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Libellé de la sous catégorie',
    default: 'Alimentation générale',
  })
  @IsString()
  @IsNotEmpty()
  sub_category_name: string;

  @ApiProperty({
    type: String,
    description: 'Description de la sous catégorie',
    default: "Bon, l'alimenttion quoi",
  })
  @IsString()
  @IsNotEmpty()
  sub_category_description: string;

  @ApiProperty({
    type: String,
    description: 'La catégorie',
    default: 'La categorie principale',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
