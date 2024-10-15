import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoordDto {

    @ApiProperty({
        type: String,
        description: "Longitude de la boutique"
    })
    @IsString()
    @IsNotEmpty()
    longitude: string;

    @ApiProperty({
        type: String,
        description: "Latitude de la boutique"
    })
    @IsString()
    @IsNotEmpty()
    latitude: string;

    @ApiProperty({
        type: String,
        description: "Reference de la boutique",
    })
    @IsString()
    @IsNotEmpty()
    annexe: string;
}
