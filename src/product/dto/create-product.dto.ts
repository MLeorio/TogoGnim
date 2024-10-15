import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateProductDto {
    @ApiProperty({
        type: String,
        description: "Nom du produit",
        default: "Article name",
    })
    @IsString()
    @IsNotEmpty()
    product_name: string;

    @ApiProperty({
        type: String,
        description: "Description du produit"
    })
    @IsString()
    product_description: string


    @ApiProperty({
        type: Boolean,
        default: true,
        description: "Definit si le produit est d'actualité"
    })
    @IsNotEmpty()
    product_is_new: boolean

    // les cles etrangere

    @ApiProperty({
        type: String,
        description: "reference de la sous categorie"
    })
    @IsNotEmpty()
    @IsString()
    sub_category: string

    @ApiProperty({
        type: String,
        description: "reference de la boutique"
    })
    @IsNotEmpty()
    @IsString()
    store: string

}
