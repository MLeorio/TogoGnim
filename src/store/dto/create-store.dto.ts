import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    type: String,
    description: 'Nom de la boutique',
    default: 'Lomé Shop',
  })
  @IsString()
  @IsNotEmpty()
  store_name: string;

  @ApiProperty({
    type: String,
    description: 'Logo de la boutique',
    default: 'Image...',
  })
  @IsString()
  store_logo: string;

  @ApiProperty({
    type: String,
    description: 'Numéro de la boutique',
    default: '+228 00 00 00 00',
  })
  @IsString()
  @IsNotEmpty()
  store_tel: string;

  @ApiProperty({
    type: String,
    description: 'Email de la boutique',
    default: 'shop@lome.tg',
  })
  @IsString()
  @IsNotEmpty()
  store_email: string;

  @ApiProperty({
    type: String,
    description: 'Site web de la boutique',
    default: 'lome-shop.com',
  })
  @IsString()
  store_website: string;

  @ApiProperty({
    type: Boolean,
    description: 'E-com de la boutique',
    default: false,
  })
  @IsString()
  store_is_Ecom: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Nom de la boutique',
    default: true,
  })
  @IsString()
  @IsNotEmpty()
  store_is_certified: boolean;

  @ApiProperty({
    type: String,
    description: 'Catégorie de la boutique',
    default: 'Id de la catégorie',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
