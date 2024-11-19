import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: 'Id de la sous categorie a modifier',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Nom du produit',
    default: 'Article name',
  })
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty({
    type: String,
    description: 'Description du produit',
  })
  @IsString()
  product_description: string;

  @ApiProperty({
    type: Boolean,
    default: true,
    description: "Definit si le produit est d'actualité",
  })
  @IsNotEmpty()
  product_is_new: boolean;
}
