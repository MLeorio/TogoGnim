import { CreateCategoryDto } from './create-category.dto';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    type: String,
    description: 'Identifiant de la catégorie',
    default: '66d9f62175d374da55frsfsv',
  })
  @IsString()
  id: string;
}
