import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './create-sub-category.dto';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {
  @ApiProperty({
    type: String,
    description: 'Identifiant de la sous catégorie',
    default: '66d9f62175d374da55frsfsv',
  })
  @IsString()
  id: string;
}
