import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCoordDto } from './create-coord.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCoordDto extends PartialType(CreateCoordDto) {
  @ApiProperty({
    type: String,
    description: 'Coordonnees a modifier',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
